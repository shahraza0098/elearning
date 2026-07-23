import prisma from "@/lib/prisma";

export async function getTopCourses() {
  const courses = await prisma.course.findMany({
    where: {
      deletedAt: null,
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      price: true,
      isPopular: true,
      isTrending: true,
      _count: {
        select: {
          reviews: true,
          certificates: true,
          sections: true,
        },
      },
    },
  });

  return courses
    .map((course) => {
      const completions = course._count.certificates;
      const reviews = course._count.reviews;
      const score =
        completions * 4 +
        reviews * 2 +
        (course.isPopular ? 6 : 0) +
        (course.isTrending ? 4 : 0);

      return {
        id: course.id,
        title: course.title,
        price: Number(course.price),
        completions,
        reviews,
        sections: course._count.sections,
        score,
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 5);
}
