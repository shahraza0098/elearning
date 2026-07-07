import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/require-student";
import { getPublicStreamUrl, getSignedStreamUrl } from "@/lib/bunny";

function flattenLessons(sections) {
  return sections.flatMap((section) =>
    section.lessons.map((lesson) => ({
      ...lesson,
      sectionId: section.id,
      sectionTitle: section.title,
    }))
  );
}

export async function GET(request, { params }) {
  const authResult = await requireStudent(request);

  if (authResult.error) {
    return authResult.error;
  }
  const {lessonId} = await params;

  const { user } = authResult;

  try {
    const lesson = await prisma.lesson.findFirst({
      where: {
        id: lessonId,

        section: {
          course: {
            deletedAt: null,
            isPublished: true,
          },
        },
      },

      include: {
        section: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                slug: true,
                thumbnailUrl: true,
                level: true,
              },
            },
          },
        },
      },
    });

    if (!lesson) {
      return NextResponse.json(
        {
          message: "Lesson not found.",
        },
        {
          status: 404,
        }
      );
    }

    /**
     * Load entire course
     * Required for Previous / Next Lesson navigation
     */
    const course = await prisma.course.findUnique({
      where: {
        id: lesson.section.course.id,
      },

      include: {
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
                duration: true,
              },
            },
          },
        },
      },
    });

    const orderedLessons = flattenLessons(course.sections);

    const currentIndex = orderedLessons.findIndex(
      (item) => item.id === lesson.id
    );

    const previousLesson =
      currentIndex > 0
        ? orderedLessons[currentIndex - 1]
        : null;

    const nextLesson =
      currentIndex < orderedLessons.length - 1
        ? orderedLessons[currentIndex + 1]
        : null;

    const progress =
      await prisma.lessonProgress.findUnique({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId: lesson.id,
          },
        },
      });

    // const streamUrl = getSignedStreamUrl(
    //   lesson.videoId
    // );
    const streamUrl =getPublicStreamUrl(lesson.videoId);
        return NextResponse.json(
      {
        message: "Lesson fetched successfully",
        data: {
          id: lesson.id,
          title: lesson.title,
          slug: lesson.slug,
          description: lesson.description,
          duration: lesson.duration,
          thumbnailUrl: lesson.thumbnailUrl,

          streamUrl,

          watchedSeconds: progress?.watchedSeconds ?? 0,
          completed: progress?.completed ?? false,

          course: {
            id: lesson.section.course.id,
            title: lesson.section.course.title,
            slug: lesson.section.course.slug,
            thumbnailUrl: lesson.section.course.thumbnailUrl,
            level: lesson.section.course.level,
          },

          section: {
            id: lesson.section.id,
            title: lesson.section.title,
          },

          previousLesson: previousLesson
            ? {
                id: previousLesson.id,
                title: previousLesson.title,
                slug: previousLesson.slug,
                duration: previousLesson.duration,
                sectionId: previousLesson.sectionId,
                sectionTitle: previousLesson.sectionTitle,
              }
            : null,

          nextLesson: nextLesson
            ? {
                id: nextLesson.id,
                title: nextLesson.title,
                slug: nextLesson.slug,
                duration: nextLesson.duration,
                sectionId: nextLesson.sectionId,
                sectionTitle: nextLesson.sectionTitle,
              }
            : null,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Lesson API Error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch lesson.",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
} 