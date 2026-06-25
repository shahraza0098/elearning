"use client";

import { useDeferredValue, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, Layers3, Plus, Search, Sparkles, TriangleAlert } from "lucide-react";
import StatCard from "@/components/StatCard";
import CourseCard from "./CourseCard";
import CourseModal from "./CourseModal";

import { sortCourses, initialFormState, buildFormState, normalizePayload, createSlug } from "@/lib/course-helpers";

export default function CoursesAdminClient({ initialCategories, initialCourses }) {
  const router = useRouter();
  const [courses, setCourses] = useState(sortCourses(initialCourses));
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [publishFilter, setPublishFilter] = useState("all");
  const [feedback, setFeedback] = useState(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredSearch = useDeferredValue(search);

  const filteredCourses = useMemo(() => {
    const searchValue = deferredSearch.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory = categoryFilter === "all" ? true : course.categoryId === categoryFilter;
      const matchesPublish = publishFilter === "all" ? true : publishFilter === "published" ? course.isPublished : !course.isPublished;
      const matchesSearch = searchValue.length === 0 ? true : [course.title, course.slug, course.category?.name, course.description, course.level]
        .filter(Boolean)
        .some((val) => val.toLowerCase().includes(searchValue));

      return matchesCategory && matchesPublish && matchesSearch;
    });
  }, [categoryFilter, courses, deferredSearch, publishFilter]);

  const publishedCount = courses.filter((c) => c.isPublished).length;
  const draftCount = courses.length - publishedCount;
  const totalSections = courses.reduce((total, course) => total + (course._count?.sections ?? course.sections?.length ?? 0), 0);

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedCourse(null);
    setFormState(initialFormState);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setModalMode("edit");
    setSelectedCourse(course);
    setFormState(buildFormState(course));
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (isPending) return;
    setIsModalOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;
    setFormState((current) => ({
      ...current,
      title,
      slug: modalMode === "create" || current.slug === "" || current.slug === createSlug(current.title) ? createSlug(title) : current.slug,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setFeedback(null);

    startTransition(async () => {
      try {
        const payload = normalizePayload(formState);
        const url = modalMode === "create" ? "/api/admin/course" : `/api/admin/course/${selectedCourse.id}`;
        const response = await fetch(url, {
          method: modalMode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const responsePayload = await response.json().catch(() => null);
        if (!response.ok) throw new Error(responsePayload?.errors?.join(", ") || responsePayload?.message || "Unable to save course.");

        const savedCourse = responsePayload?.data;
        setCourses((current) => modalMode === "create" ? sortCourses([savedCourse, ...current]) : sortCourses(current.map((c) => (c.id === savedCourse.id ? savedCourse : c))));
        setFeedback({ type: "success", message: `Course ${modalMode === "create" ? "created" : "updated"} successfully.` });
        setIsModalOpen(false);
        router.refresh();
      } catch (error) {
        setFormError(error.message || "Something went wrong while saving the course.");
      }
    });
  };

  const handleDelete = async (course) => {
    if (!window.confirm(`Delete "${course.title}"? This will hide the course from the dashboard.`)) return;
    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/course/${course.id}`, { method: "DELETE" });
        if (!response.ok) throw new Error((await response.json().catch(() => null))?.message || "Unable to delete course.");
        
        setCourses((current) => current.filter((item) => item.id !== course.id));
        setFeedback({ type: "success", message: "Course deleted successfully." });
        router.refresh();
      } catch (error) {
        setFeedback({ type: "error", message: error.message || "Something went wrong while deleting the course." });
      }
    });
  };

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <section className="overflow-hidden rounded-[32px] bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_28%),linear-gradient(135deg,_#0f172a,_#1e293b_55%,_#334155)] p-8 text-white shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-slate-100">
                <Sparkles className="h-4 w-4" /> Course operations
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Courses</h1>
              <p className="mt-3 text-sm leading-6 text-slate-200 sm:text-base">
                Manage course inventory, publishing, pricing, and catalog quality from one workflow.
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" /> New Course
            </button>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={BookOpen} label="Total Courses" value={courses.length} tint="bg-sky-100 text-sky-700" />
          <StatCard icon={Eye} label="Published" value={publishedCount} tint="bg-emerald-100 text-emerald-700" />
          <StatCard icon={EyeOff} label="Drafts" value={draftCount} tint="bg-amber-100 text-amber-700" />
          <StatCard icon={Layers3} label="Total Sections" value={totalSections} tint="bg-violet-100 text-violet-700" />
        </section>

        {/* Filters */}
        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, slug, level, category..."
                className="w-full rounded-2xl border border-slate-300 px-11 py-3 outline-none transition focus:border-slate-950"
              />
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
            >
              <option value="all">All categories</option>
              {initialCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select
              value={publishFilter}
              onChange={(e) => setPublishFilter(e.target.value)}
              className="rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-slate-950"
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {feedback && (
            <div className={`mt-4 rounded-2xl px-4 py-3 text-sm border ${feedback.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
              {feedback.message}
            </div>
          )}
        </section>

        {/* Course List */}
        {filteredCourses.length === 0 ? (
          <section className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
            <TriangleAlert className="mx-auto h-12 w-12 text-slate-400" />
            <h2 className="mt-5 text-xl font-semibold text-slate-900">No courses matched</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Adjust the filters or create a new course to start building your catalog.
            </p>
            <button onClick={openCreateModal} className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800">
              <Plus className="h-4 w-4" /> Create Course
            </button>
          </section>
        ) : (
          <section className="grid gap-6 xl:grid-cols-2">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} onEdit={openEditModal} onDelete={handleDelete} isPending={isPending} />
            ))}
          </section>
        )}
      </div>

      {isModalOpen && (
        <CourseModal
          categories={initialCategories}
          course={selectedCourse}
          errorMessage={formError}
          formState={formState}
          isPending={isPending}
          mode={modalMode}
          onChange={handleFieldChange}
          onClose={closeModal}
          onSubmit={handleSubmit}
          onTitleChange={handleTitleChange}
        />
      )}
    </>
  );
}