// 'use client'

// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import {
//   BookOpen,
//   ChevronDown,
//   ChevronRight,
//   Clock3,
//   Layers3,
// } from 'lucide-react'

// import { Badge } from '@/components/ui/badge'
// import useCourseSections from '@/hooks/useCourseSections'

// import CreateSectionDialog from './CreateSectionDialog'
// import CreateLessonDialog from './CreateLessonDialog'

// function formatDuration(seconds) {
//   if (!Number.isFinite(seconds) || seconds < 0) {
//     return '0s'
//   }

//   const hours = Math.floor(seconds / 3600)
//   const minutes = Math.floor((seconds % 3600) / 60)
//   const remainingSeconds = seconds % 60

//   if (hours > 0) {
//     return `${hours}h ${minutes}m`
//   }

//   if (minutes > 0) {
//     return `${minutes}m ${remainingSeconds}s`
//   }

//   return `${remainingSeconds}s`
// }

// export default function SectionsPageClient({ course, initialSections }) {
//   const router = useRouter()
//   const {
//     sections,
//     expandedSectionIds,
//     sectionDetails,
//     loadingSectionIds,
//     errorMessage,
//     totalLessons,
//     toggleSection,
//     handleSectionCreated,
//     handleLessonCreated,
//   } = useCourseSections({ course, initialSections, router })

//   return (
//     <div className="mx-auto max-w-6xl space-y-8 p-6">
//       <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//         <div className="space-y-3">
//           <Link
//             href="/admin/dashboard/courses"
//             className="inline-flex text-sm text-muted-foreground transition hover:text-foreground"
//           >
//             Back to courses
//           </Link>
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight text-foreground">
//               {course.title}
//             </h1>
//             <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
//               Build the learning flow for this course by organizing sections and
//               lessons.
//             </p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <Badge variant="outline">{course.category?.name ?? 'No category'}</Badge>
//             <Badge variant={course.isPublished ? 'default' : 'secondary'}>
//               {course.isPublished ? 'Published' : 'Draft'}
//             </Badge>
//           </div>
//         </div>

//         <CreateSectionDialog
//           courseId={course.id}
//           defaultPosition={sections.length}
//           onCreated={handleSectionCreated}
//         />
//       </div>

//       <div className="grid gap-4 md:grid-cols-3">
//         <div className="rounded-xl border bg-background p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="rounded-lg bg-sky-100 p-3 text-sky-700">
//               <BookOpen className="h-5 w-5" />
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Course level</p>
//               <p className="font-semibold text-foreground">{course.level}</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl border bg-background p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="rounded-lg bg-violet-100 p-3 text-violet-700">
//               <Layers3 className="h-5 w-5" />
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Total sections</p>
//               <p className="font-semibold text-foreground">{sections.length}</p>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl border bg-background p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700">
//               <Clock3 className="h-5 w-5" />
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Total lessons</p>
//               <p className="font-semibold text-foreground">{totalLessons}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {errorMessage ? (
//         <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {errorMessage}
//         </div>
//       ) : null}

//       {sections.length === 0 ? (
//         <div className="rounded-2xl border border-dashed bg-muted/20 px-6 py-16 text-center">
//           <Layers3 className="mx-auto h-12 w-12 text-muted-foreground" />
//           <h2 className="mt-4 text-xl font-semibold text-foreground">
//             No sections yet
//           </h2>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Start by adding the first section for this course.
//           </p>
//           <div className="mt-6 flex justify-center">
//             <CreateSectionDialog
//               courseId={course.id}
//               defaultPosition={0}
//               onCreated={handleSectionCreated}
//             />
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {sections.map((section) => {
//             const isExpanded = expandedSectionIds.includes(section.id)
//             const isLoading = loadingSectionIds.includes(section.id)
//             const details = sectionDetails[section.id]
//             const lessons = details?.lessons ?? []

//             return (
//               <div
//                 key={section.id}
//                 className="overflow-hidden rounded-2xl border bg-background shadow-sm"
//               >
//                 <button
//                   type="button"
//                   onClick={() => toggleSection(section.id)}
//                   className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-muted/30"
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="mt-1 text-muted-foreground">
//                       {isExpanded ? (
//                         <ChevronDown className="h-4 w-4" />
//                       ) : (
//                         <ChevronRight className="h-4 w-4" />
//                       )}
//                     </div>
//                     <div>
//                       <p className="text-sm text-muted-foreground">
//                         Section {section.position}
//                       </p>
//                       <h2 className="text-lg font-semibold text-foreground">
//                         {section.title}
//                       </h2>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Badge variant="outline">
//                       {section._count?.lessons ?? 0} lessons
//                     </Badge>
//                   </div>
//                 </button>

//                 {isExpanded ? (
//                   <div className="border-t bg-muted/20 px-5 py-5">
//                     <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                       <p className="text-sm text-muted-foreground">
//                         {isLoading
//                           ? 'Loading lessons...'
//                           : lessons.length > 0
//                             ? 'Manage the lessons inside this section.'
//                             : 'No lessons added to this section yet.'}
//                       </p>

//                       <CreateLessonDialog
//                         sectionId={section.id}
//                         defaultPosition={lessons.length}
//                         onCreated={(lesson) =>
//                           handleLessonCreated(section.id, lesson)
//                         }
//                       />
//                     </div>

//                     {isLoading ? (
//                       <div className="rounded-xl border bg-background px-4 py-6 text-sm text-muted-foreground">
//                         Loading lessons...
//                       </div>
//                     ) : lessons.length === 0 ? (
//                       <div className="rounded-xl border border-dashed bg-background px-4 py-8 text-center text-sm text-muted-foreground">
//                         This section does not have any lessons yet.
//                       </div>
//                     ) : (
//                       <div className="space-y-3">
//                         {lessons.map((lesson) => (
//                           <div
//                             key={lesson.id}
//                             className="rounded-xl border bg-background px-4 py-4"
//                           >
//                             <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
//                               <div className="space-y-1">
//                                 <p className="text-sm text-muted-foreground">
//                                   Lesson {lesson.position}
//                                 </p>
//                                 <h3 className="font-semibold text-foreground">
//                                   {lesson.title}
//                                 </h3>
//                                 <p className="text-sm text-muted-foreground">
//                                   /{lesson.slug}
//                                 </p>
//                               </div>

//                               <div className="flex flex-wrap gap-2">
//                                 <Badge variant="outline">
//                                   {formatDuration(lesson.duration)}
//                                 </Badge>
//                                 {lesson.isPreview ? (
//                                   <Badge>Preview</Badge>
//                                 ) : null}
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : null}
//               </div>
//             )
//           })}
//         </div>
//       )}
//     </div>
//   )
// }





//gemini UI

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock3,
  Layers3,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import useCourseSections from '@/hooks/useCourseSections'

import CreateSectionDialog from './CreateSectionDialog'
import CreateLessonDialog from './CreateLessonDialog'

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0s'
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }

  return `${remainingSeconds}s`
}

export default function SectionsPageClient({ course, initialSections }) {
  const router = useRouter()
  const {
    sections,
    expandedSectionIds,
    sectionDetails,
    loadingSectionIds,
    errorMessage,
    totalLessons,
    toggleSection,
    handleSectionCreated,
    handleLessonCreated,
  } = useCourseSections({ course, initialSections, router })

  return (
    <div className="min-h-screen relative bg-slate-50 p-6 md:p-8 z-0">
      
      {/* Decorative Fixed Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-blue-400/20 mix-blend-multiply blur-[100px] opacity-70" />
        <div className="absolute top-[20%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-purple-400/20 mix-blend-multiply blur-[100px] opacity-70" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] rounded-full bg-indigo-400/20 mix-blend-multiply blur-[100px] opacity-70" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header Section */}
        <div className="relative z-[100] flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between bg-white/40 backdrop-blur-md rounded-[2rem] p-6 sm:p-8 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)]">
          <div className="space-y-4">
            <Link
              href="/admin/dashboard/courses"
              className="inline-flex text-sm font-semibold text-indigo-500 hover:text-indigo-700 transition-colors bg-white/60 px-3 py-1.5 rounded-lg border border-white/80 shadow-sm backdrop-blur-sm"
            >
              ← Back to courses
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                {course.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm font-medium text-slate-500 leading-relaxed">
                Build the learning flow for this course by organizing sections and lessons.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge className="bg-white/80 text-slate-700 border-white/50 shadow-sm backdrop-blur-md px-3 py-1 rounded-lg">
                {course.category?.name ?? 'No category'}
              </Badge>
              <Badge 
                className={`shadow-sm backdrop-blur-md px-3 py-1 rounded-lg ${
                  course.isPublished 
                    ? 'bg-emerald-100/90 text-emerald-700 border-emerald-200' 
                    : 'bg-slate-200/80 text-slate-600 border-slate-300'
                }`}
              >
                {course.isPublished ? 'Published' : 'Draft'}
              </Badge>
            </div>
          </div>

          <div className="shrink-0 pt-2 lg:pt-0">
            <CreateSectionDialog
              courseId={course.id}
              defaultPosition={sections.length}
              onCreated={handleSectionCreated}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-50">
          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-white/50 text-sky-600 rounded-2xl shadow-sm">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Course level</p>
              <p className="text-2xl font-bold text-slate-800 capitalize tracking-tight">{course.level.toLowerCase()}</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-white/50 text-violet-600 rounded-2xl shadow-sm">
              <Layers3 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Total sections</p>
              <p className="text-2xl font-bold text-slate-800 tracking-tight">{sections.length}</p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white/50 text-emerald-600 rounded-2xl shadow-sm">
              <Clock3 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Total lessons</p>
              <p className="text-2xl font-bold text-slate-800 tracking-tight">{totalLessons}</p>
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-rose-200/50 bg-rose-50/80 backdrop-blur-sm p-4 text-sm font-medium text-rose-800 shadow-sm">
            {errorMessage}
          </div>
        ) : null}

        {/* Empty State */}
        {sections.length === 0 ? (
          <div className="text-center py-24 bg-white/40 backdrop-blur-xl rounded-[2rem] border-2 border-dashed border-slate-300/60 shadow-sm relative z-50">
            <div className="bg-white/80 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-white">
              <Layers3 size={40} className="text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              No sections yet
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Start by adding the first section for this course.
            </p>
            <div className="mt-8 flex justify-center">
              <CreateSectionDialog
                courseId={course.id}
                defaultPosition={0}
                onCreated={handleSectionCreated}
              />
            </div>
          </div>
        ) : (
          /* Sections List (Accordion) */
          <div className="space-y-5 relative z-50">
            {sections.map((section) => {
              const isExpanded = expandedSectionIds.includes(section.id)
              const isLoading = loadingSectionIds.includes(section.id)
              const details = sectionDetails[section.id]
              const lessons = details?.lessons ?? []

              return (
                <div
                  key={section.id}
                  className="bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-white/40 focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl border border-white/60 shadow-sm transition-colors ${isExpanded ? 'bg-indigo-100 text-indigo-600' : 'bg-white/80 text-slate-400'}`}>
                        {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-indigo-500/80 mb-0.5">
                          Section {section.position}
                        </p>
                        <h2 className="text-lg font-bold text-slate-800">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/80 border-white/60 text-slate-600 px-3 py-1 rounded-lg shadow-sm font-semibold">
                        {section._count?.lessons ?? 0} lessons
                      </Badge>
                    </div>
                  </button>

                  {/* Expanded Content Area */}
                  {isExpanded && (
                    <div className="border-t border-white/40 bg-white/30 p-6 md:p-8 animate-in slide-in-from-top-2 duration-300">
                      
                      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <p className="text-sm font-semibold text-slate-600">
                          {isLoading
                            ? 'Loading lessons...'
                            : lessons.length > 0
                              ? 'Manage the lessons inside this section.'
                              : 'No lessons added to this section yet.'}
                        </p>

                        <CreateLessonDialog
                          sectionId={section.id}
                          defaultPosition={lessons.length}
                          onCreated={(lesson) =>
                            handleLessonCreated(section.id, lesson)
                          }
                        />
                      </div>

                      {/* Lessons List Area */}
                      {isLoading ? (
                        <div className="rounded-2xl border border-white/60 bg-white/50 backdrop-blur-md p-8 text-center text-sm font-semibold text-slate-500 shadow-sm animate-pulse">
                          Loading lessons...
                        </div>
                      ) : lessons.length === 0 ? (
                        <div className="rounded-2xl border-2 border-dashed border-white/80 bg-white/40 backdrop-blur-md p-10 text-center shadow-sm">
                          <p className="text-sm font-semibold text-slate-500">
                            This section does not have any lessons yet.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl p-5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
                            >
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="space-y-1.5">
                                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Lesson {lesson.position}
                                  </p>
                                  <h3 className="font-bold text-slate-800 text-lg">
                                    {lesson.title}
                                  </h3>
                                  <p className="text-sm font-medium text-slate-500 truncate max-w-sm">
                                    /{lesson.slug}
                                  </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                  <Badge className="bg-slate-100/80 text-slate-600 border border-white/60 shadow-sm px-3 py-1 rounded-lg font-semibold">
                                    {formatDuration(lesson.duration)}
                                  </Badge>
                                  {lesson.isPreview && (
                                    <Badge className="bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm px-3 py-1 rounded-lg font-bold tracking-wide">
                                      Preview
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}