import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/require-student";

export async function GET(request) {
  const authResult = await requireStudent(request);

  if (authResult.error) {
    return authResult.error;
  }

  const { user } = authResult;

  try {
    /**
     * Fetch all published courses
     */
    const courses = await prisma.course.findMany({
      where: {
        deletedAt: null,
        isPublished: true,
      },

      orderBy: [
        {
          position: "asc",
        },
        {
          createdAt: "desc",
        },
      ],

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
                duration: true,
              },
            },
          },
        },
      },
    });

    /**
     * All lesson ids
     */
    const lessonIds = courses.flatMap((course) =>
      course.sections.flatMap((section) =>
        section.lessons.map((lesson) => lesson.id)
      )
    );

    /**
     * Student progress
     */
    const progressEntries =
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

              completed: true,

              watchedSeconds: true,

              updatedAt: true,
            },
          })
        : [];

    /**
     * Progress Map
     */
    const progressMap = new Map();

    progressEntries.forEach((progress) => {
      progressMap.set(progress.lessonId, progress);
    });

    /**
     * Format Courses
     */
    const formattedCourses = courses.map((course) => {
      const lessons = course.sections.flatMap(
        (section) => section.lessons
      );

      const totalLessons = lessons.length;

      const completedLessons = lessons.filter((lesson) => {
        const progress = progressMap.get(lesson.id);

        return progress?.completed;
      }).length;

      const progress =
        totalLessons === 0
          ? 0
          : Math.round(
              (completedLessons / totalLessons) * 100
            );

      /**
       * Last watched lesson
       */
      const lastLessonProgress = progressEntries
        .filter((item) =>
          lessons.some(
            (lesson) => lesson.id === item.lessonId
          )
        )
        .sort(
          (a, b) =>
            b.updatedAt.getTime() -
            a.updatedAt.getTime()
        )[0];

      return {
        id: course.id,

        title: course.title,

        slug: course.slug,

        description: course.description,

        thumbnailUrl: course.thumbnailUrl,

        level: course.level,

        price: Number(course.price),

        totalDuration: course.totalDuration,

        category: course.category,

        sectionCount: course.sections.length,

        totalLessons,

        completedLessons,

        progress,

        completed: progress === 100,

        certificateAvailable:
          progress === 100,

        lastLessonId:
          lastLessonProgress?.lessonId ?? null,
      };
    });

    /**
     * Split courses
     */
    const ongoing =
      formattedCourses.filter(
        (course) =>
          course.progress > 0 &&
          course.progress < 100
      );

    const completed =
      formattedCourses.filter(
        (course) => course.progress === 100
      );

    return NextResponse.json(
      {
        message:
          "My courses fetched successfully",

        data: {
          stats: {
            total:
              formattedCourses.length,

            ongoing:
              ongoing.length,

            completed:
              completed.length,
          },

          all: formattedCourses,

          ongoing,

          completed,
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
        message:
          "Failed to fetch my courses.",

        error:
          process.env.NODE_ENV ===
          "development"
            ? error.message
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}