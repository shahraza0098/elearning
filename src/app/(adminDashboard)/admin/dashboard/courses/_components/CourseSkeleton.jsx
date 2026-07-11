// 'use client'

// import { Card, CardContent } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'

// export default function CourseSkeleton() {
//   return (
//     <Card className="overflow-hidden">
//       {/* Thumbnail */}
//       <Skeleton className="h-48 w-full" />

//       <CardContent className="space-y-4 p-5">
//         {/* Category */}
//         <Skeleton className="h-5 w-24" />

//         {/* Title */}
//         <div className="space-y-2">
//           <Skeleton className="h-6 w-4/5" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-3/4" />
//         </div>

//         {/* Price */}
//         <Skeleton className="h-8 w-20" />

//         {/* Stats */}
//         <div className="grid grid-cols-3 gap-3">
//           <div className="space-y-2 text-center">
//             <Skeleton className="mx-auto h-5 w-5 rounded-full" />
//             <Skeleton className="mx-auto h-4 w-8" />
//             <Skeleton className="mx-auto h-3 w-12" />
//           </div>

//           <div className="space-y-2 text-center">
//             <Skeleton className="mx-auto h-5 w-5 rounded-full" />
//             <Skeleton className="mx-auto h-4 w-8" />
//             <Skeleton className="mx-auto h-3 w-12" />
//           </div>

//           <div className="space-y-2 text-center">
//             <Skeleton className="mx-auto h-5 w-5 rounded-full" />
//             <Skeleton className="mx-auto h-4 w-8" />
//             <Skeleton className="mx-auto h-3 w-12" />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex gap-2 pt-2">
//           <Skeleton className="h-9 flex-1" />
//           <Skeleton className="h-9 flex-1" />
//           <Skeleton className="h-9 flex-1" />
//         </div>
//       </CardContent>
//     </Card>
//   )
// }








//gemini UI

'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CourseSkeleton() {
  return (
    <Card className="bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col">
      {/* Thumbnail */}
      <Skeleton className="h-48 w-full rounded-none bg-slate-200/50" />

      <CardContent className="p-6 flex-1 flex flex-col relative bg-gradient-to-b from-white/20 to-transparent">
        {/* Category */}
        <div className="mb-4">
          <Skeleton className="h-7 w-24 rounded-xl bg-slate-200/60" />
        </div>

        {/* Title & Description */}
        <div className="space-y-3 mb-6">
          <Skeleton className="h-6 w-4/5 rounded-lg bg-slate-200/60" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-lg bg-slate-200/50" />
            <Skeleton className="h-4 w-3/4 rounded-lg bg-slate-200/50" />
          </div>
        </div>

        {/* Price */}
        <div className="mb-5">
          <Skeleton className="h-8 w-24 rounded-lg bg-slate-200/60" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white/30 border border-white/40 rounded-xl p-2.5 flex flex-col items-center">
            <Skeleton className="h-4 w-4 rounded-full bg-slate-200/80 mb-2" />
            <Skeleton className="h-4 w-6 rounded bg-slate-200/80 mb-1.5" />
            <Skeleton className="h-2.5 w-12 rounded bg-slate-200/60" />
          </div>
          <div className="bg-white/30 border border-white/40 rounded-xl p-2.5 flex flex-col items-center">
            <Skeleton className="h-4 w-4 rounded-full bg-slate-200/80 mb-2" />
            <Skeleton className="h-4 w-6 rounded bg-slate-200/80 mb-1.5" />
            <Skeleton className="h-2.5 w-12 rounded bg-slate-200/60" />
          </div>
          <div className="bg-white/30 border border-white/40 rounded-xl p-2.5 flex flex-col items-center">
            <Skeleton className="h-4 w-4 rounded-full bg-slate-200/80 mb-2" />
            <Skeleton className="h-4 w-6 rounded bg-slate-200/80 mb-1.5" />
            <Skeleton className="h-2.5 w-12 rounded bg-slate-200/60" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-200/30 mt-auto">
          <Skeleton className="h-10 flex-1 rounded-xl bg-slate-200/50" />
          <Skeleton className="h-10 flex-1 rounded-xl bg-slate-200/50" />
          <Skeleton className="h-10 flex-1 rounded-xl bg-slate-200/50" />
        </div>
      </CardContent>
    </Card>
  )
}