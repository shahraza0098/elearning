import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/require-student";

export async function GET(request, { params }) {
  const authResult = await requireStudent(request);

  if (authResult.error) return authResult.error;

  const { user } = authResult;

  try {
    const course = await prisma.course.findFirst({
      where: {
        id: params.id,
        deletedAt: null,
        isPublished: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            bannerUrl: true,
          },
        },

        sections: {
          orderBy: {
            position: "asc",
          },

          include: {
            lessons: {
              orderBy: {
                position: "asc",
              },

              select: {
                id: true,
                title: true,
                slug: true,
                description: true,
                duration: true,
                thumbnailUrl: true,
                isPreview: true,
                position: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(
        {
          message: "Course not found",
        },
        {
          status: 404,
        }
      );
    }

    const lessonIds = course.sections.flatMap((section) =>
      section.lessons.map((lesson) => lesson.id)
    );

    const progress =
      lessonIds.length > 0
        ? await prisma.lessonProgress.findMany({
            where: {
              userId: user.id,
              lessonId: {
                in: lessonIds,
              },
            },
            select: {
              lessonId: true,
              watchedSeconds: true,
              completed: true,
            },
          })
        : [];

    const progressMap = new Map();

    progress.forEach((item) => {
      progressMap.set(item.lessonId, item);
    });

    let totalLessons = 0;
    let completedLessons = 0;
    let totalDuration = 0;

    const sections = course.sections.map((section) => {
      const lessons = section.lessons.map((lesson) => {
        totalLessons++;
        totalDuration += lesson.duration;

        const lessonProgress = progressMap.get(lesson.id);

        if (lessonProgress?.completed) {
          completedLessons++;
        }

        return {
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          description: lesson.description,
          duration: lesson.duration,
          thumbnailUrl: lesson.thumbnailUrl,
          isPreview: lesson.isPreview,
          position: lesson.position,

          completed: lessonProgress?.completed ?? false,

          watchedSeconds:
            lessonProgress?.watchedSeconds ?? 0,

          locked: false,
        };
      });

      return {
        id: section.id,
        title: section.title,
        position: section.position,
        lessonCount: lessons.length,
        lessons,
      };
    });

    const progressPercentage =
      totalLessons === 0
        ? 0
        : Math.round(
            (completedLessons / totalLessons) * 100
          );

    return NextResponse.json(
      {
        message: "Course fetched successfully",

        data: {
          id: course.id,
          title: course.title,
          slug: course.slug,
          description: course.description,
          thumbnailUrl: course.thumbnailUrl,

          level: course.level,

          price: Number(course.price),

          totalDuration,

          progress: progressPercentage,

          totalLessons,

          completedLessons,

          sectionCount: sections.length,

          category: course.category,

          sections,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch course",
      },
      {
        status: 500,
      }
    );
  }
}