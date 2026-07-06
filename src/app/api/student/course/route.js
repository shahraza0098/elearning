import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/require-student";

function parseBooleanParam(value) {
  if (value === null) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export async function GET(request) {
  const authResult = await requireStudent(request);
  if (authResult.error) return authResult.error;

  const { user } = authResult;

  try {
    const { searchParams } = new URL(request.url);

    const categoryId = searchParams.get("categoryId")?.trim() || undefined;
    const search = searchParams.get("search")?.trim() || undefined;
    const featured = parseBooleanParam(searchParams.get("featured"));
    const popular = parseBooleanParam(searchParams.get("popular"));
    const trending = parseBooleanParam(searchParams.get("trending"));
    const limit = Number(searchParams.get("limit")) || undefined;

    const where = {
      deletedAt: null,
      isPublished: true,
    };

    if (categoryId) where.categoryId = categoryId;

    if (typeof featured === "boolean") where.isFeatured = featured;
    if (typeof popular === "boolean") where.isPopular = popular;
    if (typeof trending === "boolean") where.isTrending = trending;

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: [
        {
          position: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      take: limit,
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

    const lessonIds = courses.flatMap((course) =>
      course.sections.flatMap((section) =>
        section.lessons.map((lesson) => lesson.id)
      )
    );

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
            },
          })
        : [];

    const progressMap = new Map();

    progressEntries.forEach((progress) => {
      progressMap.set(progress.lessonId, progress.completed);
    });

    const formattedCourses = courses.map((course) => {
      const lessons = course.sections.flatMap((section) => section.lessons);

      const totalLessons = lessons.length;

      const completedLessons = lessons.filter((lesson) =>
        progressMap.has(lesson.id)
      ).length;

      const progress =
        totalLessons === 0
          ? 0
          : Math.round((completedLessons / totalLessons) * 100);

      return {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        thumbnailUrl: course.thumbnailUrl,
        price: Number(course.price),
        level: course.level,
        totalDuration: course.totalDuration,
        isFeatured: course.isFeatured,
        isPopular: course.isPopular,
        isTrending: course.isTrending,
        createdAt: course.createdAt,

        category: course.category,

        sectionCount: course.sections.length,
        totalLessons,
        completedLessons,
        progress,
      };
    });

    return NextResponse.json(
      {
        message: "Courses fetched successfully",
        data: formattedCourses,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch courses",
      },
      {
        status: 500,
      }
    );
  }
}