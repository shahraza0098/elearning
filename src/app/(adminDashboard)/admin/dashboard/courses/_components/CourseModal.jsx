"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { COURSE_LEVELS, formatLevel } from "@/lib/course-helpers";

export default function CourseModal({
  categories,
  course,
  errorMessage,
  formState,
  isPending,
  mode,
  onChange,
  onClose,
  onSubmit,
  onTitleChange,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              {mode === "create" ? "Create Course" : `Edit ${course?.title ?? "Course"}`}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Configure pricing, publishing, structure, and presentation details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="max-h-[calc(92vh-88px)] overflow-y-auto">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Form Left Column */}
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Course Title</label>
                <input
                  required
                  type="text"
                  value={formState.title}
                  onChange={onTitleChange}
                  placeholder="Advanced JavaScript Masterclass"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Slug</label>
                <input
                  required
                  type="text"
                  value={formState.slug}
                  onChange={(e) => onChange("slug", e.target.value)}
                  placeholder="advanced-javascript-masterclass"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  required
                  rows={7}
                  value={formState.description}
                  onChange={(e) => onChange("description", e.target.value)}
                  placeholder="Explain the transformation this course delivers..."
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Thumbnail URL</label>
                <input
                  required
                  type="url"
                  value={formState.thumbnailUrl}
                  onChange={(e) => onChange("thumbnailUrl", e.target.value)}
                  placeholder="https://images.example.com/course-cover.jpg"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                />
              </div>
            </div>

            {/* Form Right Column */}
            <div className="space-y-5">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-semibold text-slate-700">Thumbnail Preview</p>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-slate-200">
                  {formState.thumbnailUrl ? (
                    <Image
                      src={formState.thumbnailUrl}
                      alt="Course thumbnail preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">
                      Add a thumbnail URL to preview the cover
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
                  <select
                    required
                    value={formState.categoryId}
                    onChange={(e) => onChange("categoryId", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Level</label>
                  <select
                    value={formState.level}
                    onChange={(e) => onChange("level", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
                  >
                    {COURSE_LEVELS.map((level) => (
                      <option key={level} value={level}>{formatLevel(level)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Price</label>
                  <input
                    required
                    min="0"
                    step="0.01"
                    type="number"
                    value={formState.price}
                    onChange={(e) => onChange("price", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Position</label>
                  <input
                    required
                    min="0"
                    step="1"
                    type="number"
                    value={formState.position}
                    onChange={(e) => onChange("position", e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Total Duration (s)</label>
                <input
                  min="0"
                  step="1"
                  type="number"
                  value={formState.totalDuration}
                  onChange={(e) => onChange("totalDuration", e.target.value)}
                  placeholder="5400"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-950"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Leave blank if the duration will be calculated later from lessons.
                </p>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                <input
                  type="checkbox"
                  checked={formState.isPublished}
                  onChange={(e) => onChange("isPublished", e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <div>
                  <p className="font-semibold text-slate-900">Publish this course</p>
                  <p className="text-sm text-slate-500">
                    Published courses are ready for students to discover and enroll in.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="mx-6 mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-slate-950 px-5 py-2.5 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending
                ? mode === "create" ? "Creating..." : "Saving..."
                : mode === "create" ? "Create Course" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}