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

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function CourseCard({
  course,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Thumbnail */}

      <div className="relative h-48 w-full bg-muted">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-14 w-14 text-muted-foreground" />
          </div>
        )}

        <Badge
          className="absolute right-3 top-3"
          variant={course.isPublished ? 'default' : 'secondary'}
        >
          {course.isPublished ? 'Published' : 'Draft'}
        </Badge>
      </div>

      <CardContent className="space-y-4 p-5">
        {/* Category */}

        <Badge variant="outline">
          {course.category?.name ?? 'Uncategorized'}
        </Badge>

        {/* Title */}

        <div>
          <h2 className="line-clamp-1 text-lg font-semibold">
            {course.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        </div>

        {/* Price */}

        <div className="text-2xl font-bold">
          ₹{course.price}
        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div>
            <BookOpen className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
            <p>{course.sections?.length ?? 0}</p>
            <p className="text-xs text-muted-foreground">
              Sections
            </p>
          </div>

          <div>
            <Users className="mx-auto mb-1 h-5 w-5 text-muted-foreground" />
            <p>{course.studentCount ?? 0}</p>
            <p className="text-xs text-muted-foreground">
              Students
            </p>
          </div>

          <div>
            <Star className="mx-auto mb-1 h-5 w-5 text-yellow-500" />
            <p>{course.averageRating ?? 0}</p>
            <p className="text-xs text-muted-foreground">
              Rating
            </p>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-between gap-2 pt-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => onView(course)}
          >
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="secondary"
            onClick={() => onEdit(course)}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="destructive"
            onClick={() => onDelete(course)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}