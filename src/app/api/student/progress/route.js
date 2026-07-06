import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/require-student";

const COMPLETION_PERCENTAGE = 90;

export async function POST(request) {
  const authResult = await requireStudent(request);

  if (authResult.error) {
    return authResult.error;
  }

  const { user } = authResult;

  try {
    const body = await request.json();

    const lessonId = body.lessonId?.trim();

    const watchedSeconds = Number(body.watchedSeconds);

    if (!lessonId) {
      return NextResponse.json(
        {
          message: "lessonId is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      Number.isNaN(watchedSeconds) ||
      watchedSeconds < 0
    ) {
      return NextResponse.json(
        {
          message: "Invalid watchedSeconds.",
        },
        {
          status: 400,
        }
      );
    }

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },

      select: {
        id: true,
        duration: true,
        section: {
          select: {
            courseId: true,
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

    const safeSeconds = Math.min(
      watchedSeconds,
      lesson.duration
    );

    const completed =
      safeSeconds >=
      Math.floor(
        (lesson.duration * COMPLETION_PERCENTAGE) / 100
      );

    const progress =
      await prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: user.id,
            lessonId,
          },
        },

        create: {
          userId: user.id,
          lessonId,

          watchedSeconds: safeSeconds,

          completed,
        },

        update: {
          watchedSeconds: safeSeconds,

          completed,
        },
      });

    /**
     * Course Progress
     */

    const lessons =
      await prisma.lesson.findMany({
        where: {
          section: {
            courseId:
              lesson.section.courseId,
          },
        },

        select: {
          id: true,
        },
      });

    const lessonIds = lessons.map(
      (item) => item.id
    );

    const completedLessons =
      await prisma.lessonProgress.count({
        where: {
          userId: user.id,

          completed: true,

          lessonId: {
            in: lessonIds,
          },
        },
      });

    const totalLessons =
      lessonIds.length;

    const progressPercentage =
      totalLessons === 0
        ? 0
        : Math.round(
            (completedLessons /
              totalLessons) *
              100
          );

    return NextResponse.json(
      {
        message:
          "Progress updated successfully.",

        data: {
          lessonId,

          watchedSeconds:
            progress.watchedSeconds,

          completed:
            progress.completed,

          courseProgress:
            progressPercentage,

          completedLessons,

          totalLessons,
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
          "Failed to update lesson progress.",

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