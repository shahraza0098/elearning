// 'use client'

// import Image from 'next/image'
// import {
//   Eye,
//   Pencil,
//   Trash2,
//   BookOpen,
//   Star,
//   Users,
// } from 'lucide-react'

// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'

// export default function CourseCard({
//   course,
//   onView,
//   onEdit,
//   onDelete,
// }) {
//   const handleCardClick = () => {
//     onView?.(course)
//   }

//   const stopPropagation = (event, callback) => {
//     event.stopPropagation()
//     callback?.(course)
//   }

//   return (
//     <Card
//       className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
//       onClick={handleCardClick}
//       role="button"
//       tabIndex={0}
//       onKeyDown={(event) => {
//         if (event.key === 'Enter' || event.key === ' ') {
//           event.preventDefault()
//           handleCardClick()
//         }
//       }}
//     >
//       {/* Thumbnail */}

//       <div className="relative h-48 w-full bg-muted">
//         {course.thumbnailUrl ? (
//           <Image
//             src={course.thumbnailUrl}
//             alt={course.title}
//             unoptimized
//             fill
//             className="object-cover"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center">
//             <BookOpen className="h-14 w-14 text-muted-foreground" />
//           </div>
//         )}

//         <Badge
//           className="absolute right-3 top-3"
//           variant={course.isPublished ? 'default' : 'secondary'}
//         >
//           {course.isPublished ? 'Published' : 'Draft'}
//         </Badge>
//       </div>

//       <CardContent className="space-y-4 p-5">
//         {/* Category */}

//         <Badge variant="outline">
//           {course.category?.name ?? 'Uncategorized'}
//         </Badge>

//         {/* Title */}

//         <div>
//           <h2 className="line-clamp-1 text-lg font-semibold">
//             {course.title}
//           </h2>

//           <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
//             {course.description}
//           </p>
//         </div>

//         {/* Price */}

//         <div className="text-2xl font-bold">
//           ₹{course.price}
//         </div>

//         {/* Stats */}

//         <div className="grid grid-cols-3 gap-3 text-center text-sm">
//           <div>
//             <BookOpen className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
//             <p>{course.sections?.length ?? 0}</p>
//             <p className="text-xs text-muted-foreground">
//               Sections
//             </p>
//           </div>

//           <div>
//             <Users className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
//             <p>{course.studentCount ?? 0}</p>
//             <p className="text-xs text-muted-foreground">
//               Students
//             </p>
//           </div>

//           <div>
//             <Star className="mx-auto mb-1 h-5 w-5 text-yellow-500" />
//             <p>{course.averageRating ?? 0}</p>
//             <p className="text-xs text-muted-foreground">
//               Rating
//             </p>
//           </div>
//         </div>

//         {/* Footer */}

//         <div className="flex justify-between gap-2 pt-2">
//           <Button
//             size="icon"
//             variant="outline"
//             onClick={(event) => stopPropagation(event, onView)}
//           >
//             <Eye className="h-4 w-4" />
//           </Button>

//           <Button
//             size="icon"
//             variant="secondary"
//             onClick={(event) => stopPropagation(event, onEdit)}
//           >
//             <Pencil className="h-4 w-4" />
//           </Button>

//           <Button
//             size="icon"
//             variant="destructive"
//             onClick={(event) => stopPropagation(event, onDelete)}
//           >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



//gemini Ui

'use client'

import Image from 'next/image'
import {
  Eye,
  Pencil,
  Trash2,
  BookOpen,
  Star,
  Users,
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

export default function CourseCard({
  course,
  onView,
  onEdit,
  onDelete,
}) {
  const handleCardClick = () => {
    onView?.(course)
  }

  const stopPropagation = (event, callback) => {
    event.stopPropagation()
    callback?.(course)
  }

  return (
    <Card
      className="group cursor-pointer bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col outline-none focus-visible:ring-4 focus-visible:ring-indigo-500/20"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleCardClick()
        }
      }}
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full bg-slate-200/50 overflow-hidden shrink-0">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            unoptimized
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-indigo-50/50">
            <BookOpen className="h-12 w-12 text-indigo-300/50" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        <div
          className={`absolute right-4 top-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border ${
            course.isPublished
              ? 'bg-emerald-100/90 border-emerald-200 text-emerald-700'
              : 'bg-white/80 border-white/50 text-slate-600'
          }`}
        >
          {course.isPublished ? 'Published' : 'Draft'}
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col relative bg-gradient-to-b from-white/40 to-transparent">
        {/* Category */}
        <div className="mb-4">
          <span className="bg-slate-100/80 border border-white/60 text-slate-600 text-xs px-3 py-1.5 rounded-xl font-semibold shadow-sm inline-block">
            {course.category?.name ?? 'Uncategorized'}
          </span>
        </div>

        {/* Title & Description */}
        <div className="flex-1">
          <h2 className="line-clamp-1 text-xl font-bold text-slate-800 transition-colors group-hover:text-indigo-600">
            {course.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm font-medium text-slate-500 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Price */}
        <div className="mt-5 mb-4">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
            ₹{course.price}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white/50 border border-white/60 rounded-xl p-2.5 text-center shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            <BookOpen className="mx-auto mb-1.5 h-4 w-4 text-indigo-500" />
            <p className="text-sm font-bold text-slate-800">{course.sections?.length ?? 0}</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Sections
            </p>
          </div>

          <div className="bg-white/50 border border-white/60 rounded-xl p-2.5 text-center shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            <Users className="mx-auto mb-1.5 h-4 w-4 text-blue-500" />
            <p className="text-sm font-bold text-slate-800">{course.studentCount ?? 0}</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Students
            </p>
          </div>

          <div className="bg-white/50 border border-white/60 rounded-xl p-2.5 text-center shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
            <Star className="mx-auto mb-1.5 h-4 w-4 text-amber-500" />
            <p className="text-sm font-bold text-slate-800">{course.averageRating ?? 0}</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Rating
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between gap-3 pt-4 border-t border-slate-200/50 mt-auto">
          <button
            onClick={(event) => stopPropagation(event, onView)}
            className="flex-1 flex items-center justify-center p-2.5 text-slate-500 bg-white/40 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl border border-white/60 transition-all duration-200 shadow-sm"
            title="View Course"
          >
            <Eye className="h-4 w-4" />
          </button>

          <button
            onClick={(event) => stopPropagation(event, onEdit)}
            className="flex-1 flex items-center justify-center p-2.5 text-slate-500 bg-white/40 hover:bg-blue-50 hover:text-blue-600 rounded-xl border border-white/60 transition-all duration-200 shadow-sm"
            title="Edit Course"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            onClick={(event) => stopPropagation(event, onDelete)}
            className="flex-1 flex items-center justify-center p-2.5 text-slate-500 bg-white/40 hover:bg-rose-50 hover:text-rose-600 rounded-xl border border-white/60 transition-all duration-200 shadow-sm"
            title="Delete Course"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}