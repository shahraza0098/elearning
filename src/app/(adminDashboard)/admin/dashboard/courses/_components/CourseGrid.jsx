// 'use client'

// import CourseCard from './CourseCard'
// import CourseSkeleton from './CourseSkeleton'

// import { BookOpen } from 'lucide-react'

// export default function CourseGrid({
//   courses = [],
//   loading = false,

//   onView,
//   onEdit,
//   onDelete,
// }) {
//   // Loading State
//   if (loading) {
//     return (
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {Array.from({ length: 8 }).map((_, index) => (
//           <CourseSkeleton key={index} />
//         ))}
//       </div>
//     )
//   }

//   // Empty State
//   if (!courses.length) {
//     return (
//       <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed">
//         <BookOpen className="mb-4 h-16 w-16 text-muted-foreground" />

//         <h2 className="text-xl font-semibold">
//           No Courses Found
//         </h2>

//         <p className="mt-2 text-sm text-muted-foreground">
//           Create your first course to get started.
//         </p>
//       </div>
//     )
//   }

//   // Course Grid
//   return (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {courses.map((course) => (
//         <CourseCard
//           key={course.id}
//           course={course}
//           onView={onView}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   )
// }



//gemini UI


'use client'

import CourseCard from './CourseCard'
import CourseSkeleton from './CourseSkeleton'

import { BookOpen } from 'lucide-react'

export default function CourseGrid({
  courses = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) {
  // Loading State
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <CourseSkeleton key={index} />
        ))}
      </div>
    )
  }

  // Empty State
  if (!courses.length) {
    return (
      <div className="text-center py-24 bg-white/40 backdrop-blur-xl rounded-[2rem] border-2 border-dashed border-slate-300/60 shadow-sm">
        <div className="bg-white/80 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-white">
          <BookOpen size={40} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">
          No Courses Found
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          Create your first course to get started.
        </p>
      </div>
    )
  }

  // Course Grid
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}