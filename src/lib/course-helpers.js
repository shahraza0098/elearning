export const COURSE_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

export const initialFormState = {
  title: "",
  slug: "",
  description: "",
  categoryId: "",
  thumbnailUrl: "",
  price: "0.00",
  position: "0",
  totalDuration: "",
  level: "BEGINNER",
  isPublished: false,
};

export function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(value) {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function formatDuration(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return "Not set";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h`;
  return `${minutes}m`;
}

export function formatLevel(level) {
  return level.charAt(0) + level.slice(1).toLowerCase();
}

export function formatDate(value) {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function sortCourses(items) {
  return [...items].sort((first, second) => {
    if (first.position !== second.position) {
      return first.position - second.position;
    }
    return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
  });
}

export function buildFormState(course) {
  if (!course) return initialFormState;

  return {
    title: course.title ?? "",
    slug: course.slug ?? "",
    description: course.description ?? "",
    categoryId: course.categoryId ?? "",
    thumbnailUrl: course.thumbnailUrl ?? "",
    price: String(course.price ?? "0.00"),
    position: String(course.position ?? 0),
    totalDuration:
      course.totalDuration === null || course.totalDuration === undefined
        ? ""
        : String(course.totalDuration),
    level: course.level ?? "BEGINNER",
    isPublished: Boolean(course.isPublished),
  };
}

export function normalizePayload(formState) {
  return {
    title: formState.title.trim(),
    slug: createSlug(formState.slug),
    description: formState.description.trim(),
    categoryId: formState.categoryId,
    thumbnailUrl: formState.thumbnailUrl.trim(),
    price: formState.price,
    position: Number(formState.position),
    totalDuration: formState.totalDuration === "" ? null : Number(formState.totalDuration),
    level: formState.level,
    isPublished: formState.isPublished,
  };
}