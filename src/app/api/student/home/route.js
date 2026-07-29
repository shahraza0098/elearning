import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/require-student";

/**
 * Calculate progress for a list of courses.
 */
async function attachCourseProgress(courses, userId) {
  const lessonIds = courses.flatMap((course) =>
    course.sections.flatMap((section) =>
      section.lessons.map((lesson) => lesson.id)
    )
  );

  const progressEntries =
    lessonIds.length > 0
      ? await prisma.lessonProgress.findMany({
          where: {
            userId,
            lessonId: {
              in: lessonIds,
            },
          },
          select: {
            lessonId: true,
            completed: true,
          },
        })
      : [];

  const progressMap = new Map();

  progressEntries.forEach((item) => {
    progressMap.set(item.lessonId, item.completed);
  });

  return courses.map((course) => {
    const lessons = course.sections.flatMap(
      (section) => section.lessons
    );

    const totalLessons = lessons.length;

    const completedLessons = lessons.filter((lesson) =>
      progressMap.has(lesson.id)
    ).length;

    const progress =
      totalLessons === 0
        ? 0
        : Math.round(
            (completedLessons / totalLessons) * 100
          );

    return {
      id: course.id,
      title: course.title,
      slug: course.slug,
      thumbnailUrl: course.thumbnailUrl,
      description: course.description,
      level: course.level,
      price: Number(course.price),

      totalDuration: course.totalDuration,

      isFeatured: course.isFeatured,
      isPopular: course.isPopular,
      isTrending: course.isTrending,

      category: course.category,

      sectionCount: course.sections.length,

      totalLessons,

      completedLessons,

      progress,
    };
  });
}

/**
 * Fetch course collection.
 */
async function getCourseCollection(where, userId, take = 6) {
  const courses = await prisma.course.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
      ...where,
    },

    orderBy: [
      {
        position: "asc",
      },
      {
        createdAt: "desc",
      },
    ],

    ...(take ? { take } : {}),

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
        select: {
          lessons: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  return attachCourseProgress(courses, userId);
}

export async function GET(request) {
  const authResult = await requireStudent(request);

  if (authResult.error) {
    return authResult.error;
  }

  const { user } = authResult;

  try {
        const [
      featuredCourses,
      popularCourses,
      trendingCourses,
      allCourses,
      categories,
      recentProgress,
    ] = await Promise.all([
      getCourseCollection({isFeatured: true,}, user.id ),

      getCourseCollection({isPopular: true,}, user.id),

      getCourseCollection( {isTrending: true,},user.id),

      getCourseCollection({}, user.id, null),

      prisma.category.findMany({
        orderBy: {
          name: "asc",
        },

        select: {
          id: true,
          name: true,
          slug: true,
          bannerUrl: true,
        },
      }),

      prisma.lessonProgress.findFirst({
        where: {
          userId: user.id,
        },

        orderBy: {
          updatedAt: "desc",
        },

        include: {
          lesson: {
            include: {
              section: {
                include: {
                  course: {
                    select: {
                      id: true,
                      title: true,
                      slug: true,
                      thumbnailUrl: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
    ]);

    let continueLearning = null;

    if (recentProgress?.lesson) {
      continueLearning = {
        lessonId: recentProgress.lesson.id,

        lessonTitle: recentProgress.lesson.title,

        lessonSlug: recentProgress.lesson.slug,

        watchedSeconds:
          recentProgress.watchedSeconds,

        completed:
          recentProgress.completed,

        duration:
          recentProgress.lesson.duration,

        progress:
          recentProgress.lesson.duration === 0
            ? 0
            : Math.round(
                (recentProgress.watchedSeconds /
                  recentProgress.lesson.duration) *
                  100
              ),

        thumbnailUrl:
          recentProgress.lesson.thumbnailUrl,

        course: {
          id: recentProgress.lesson.section.course.id,

          title:
            recentProgress.lesson.section.course.title,

          slug:
            recentProgress.lesson.section.course.slug,

          thumbnailUrl:
            recentProgress.lesson.section.course
              .thumbnailUrl,
        },

        section: {
          id: recentProgress.lesson.section.id,

          title:
            recentProgress.lesson.section.title,
        },
      };
    }

    return NextResponse.json(
      {
        message:
          "Student home fetched successfully",

        data: {
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            image: user.image,
          },

          continueLearning,

          categories,

          featuredCourses,

          popularCourses,

          trendingCourses,

          allCourses,
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
          "Failed to fetch home data.",

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
