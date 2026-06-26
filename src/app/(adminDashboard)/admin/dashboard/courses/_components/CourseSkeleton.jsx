'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CourseSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Thumbnail */}
      <Skeleton className="h-48 w-full" />

      <CardContent className="space-y-4 p-5">
        {/* Category */}
        <Skeleton className="h-5 w-24" />

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Price */}
        <Skeleton className="h-8 w-20" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-5 w-5 rounded-full" />
            <Skeleton className="mx-auto h-4 w-8" />
            <Skeleton className="mx-auto h-3 w-12" />
          </div>

          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-5 w-5 rounded-full" />
            <Skeleton className="mx-auto h-4 w-8" />
            <Skeleton className="mx-auto h-3 w-12" />
          </div>

          <div className="space-y-2 text-center">
            <Skeleton className="mx-auto h-5 w-5 rounded-full" />
            <Skeleton className="mx-auto h-4 w-8" />
            <Skeleton className="mx-auto h-3 w-12" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}