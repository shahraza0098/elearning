"use client";

import Image from "next/image";
import { Eye, EyeOff, Clock3, Pencil, Trash2 } from "lucide-react";
import { formatPrice, formatLevel, formatDuration, formatDate } from "@/lib/course-helpers";

export default function CourseCard({ course, onEdit, onDelete, isPending }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="grid md:grid-cols-[240px_1fr]">
        <div className="relative min-h-[220px] bg-slate-100">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {course.isPublished ? (
              <><Eye className="h-3.5 w-3.5" /> Published</>
            ) : (
              <><EyeOff className="h-3.5 w-3.5" /> Draft</>
            )}
          </div>
        </div>

        <div className="flex flex-col p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                {course.category?.name ?? "Uncategorized"}
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">{course.title}</h2>
              <p className="mt-1 text-sm text-slate-500">/{course.slug}</p>
            </div>
            <div className="rounded-full bg-slate-950 px-3 py-1.5 text-sm font-semibold text-white">
              {formatPrice(course.price)}
            </div>
          </div>

          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
            {course.description}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Level</p>
              <p className="mt-1 font-semibold text-slate-900">{formatLevel(course.level)}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Sections</p>
              <p className="mt-1 font-semibold text-slate-900">
                {course._count?.sections ?? course.sections?.length ?? 0}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Duration</p>
              <p className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                <Clock3 className="h-4 w-4 text-slate-400" />
                {formatDuration(course.totalDuration)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Last Updated</p>
              <p className="mt-1 font-semibold text-slate-900">{formatDate(course.updatedAt)}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <div className="text-sm text-slate-500">
              Position <span className="font-semibold text-slate-900">{course.position}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onEdit(course)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(course)}
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}