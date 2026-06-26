'use client'

import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import CreateCourseDialog from './CreateCourseDialog'

export default function CourseToolbar({
  filters,
  setFilters,

  categories = [],

  createCourse,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      {/* Left Section */}
      <div className="flex flex-1 flex-col gap-3 md:flex-row">
        {/* Search */}

        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search courses..."
            className="pl-9"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
          />
        </div>

        {/* Category */}

        <Select
          value={filters.categoryId}
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              categoryId: value === 'all' ? '' : value,
            }))
          }
        >
          <SelectTrigger className="w-full md:w-[220px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Categories
            </SelectItem>

            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}

        <Select
          value={
            filters.isPublished === ''
              ? 'all'
              : String(filters.isPublished)
          }
          onValueChange={(value) =>
            setFilters((prev) => ({
              ...prev,
              isPublished:
                value === 'all'
                  ? ''
                  : value === 'true',
            }))
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">
              All Status
            </SelectItem>

            <SelectItem value="true">
              Published
            </SelectItem>

            <SelectItem value="false">
              Draft
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Right Section */}

      <div className="flex justify-end">
        <CreateCourseDialog
          categories={categories}
          createCourse={createCourse}
        />
      </div>
    </div>
  )
}