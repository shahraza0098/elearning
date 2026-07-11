// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'sonner'

// import useCourses from '@/hooks/useCourses'
// import useCategories from '@/hooks/useCategories'

// import CourseToolbar from './_components/CourseToolbar'
// import CourseGrid from './_components/CourseGrid'

// export default function CoursePage() {
//   const router = useRouter()
//   const {
//     courses,
//     loading,
//     createCourse,
//     deleteCourse,
//     filters,
//     setFilters,
//   } = useCourses()

//   const { categories } = useCategories()

//   const [deleting, setDeleting] = useState(false)

//   const handleView = (course) => {
//     router.push(`/admin/dashboard/courses/${course.id}`)
//   }

//   const handleEdit = (course) => {
//     console.log('Edit:', course)

//     // TODO:
//     // router.push(`/dashboard/courses/${course.id}/edit`)
//   }

//   const handleDelete = async (course) => {
//     const confirmDelete = window.confirm(
//       `Delete "${course.title}"?`
//     )

//     if (!confirmDelete) return

//     try {
//       setDeleting(true)

//       await deleteCourse(course.id)

//       toast.success('Course deleted successfully')
//     } catch (err) {
//       toast.error('Failed to delete course')
//     } finally {
//       setDeleting(false)
//     }
//   }

//   return (
//     <div className="space-y-8 p-6">
//       {/* Header */}

//       <div className="flex flex-col gap-2">
//         <h1 className="text-3xl font-bold tracking-tight">
//           Courses
//         </h1>

//         <p className="text-muted-foreground">
//           Manage your courses, lessons and pricing.
//         </p>
//       </div>

//       {/* Toolbar */}

//       <CourseToolbar
//         filters={filters}
//         setFilters={setFilters}
//         categories={categories}
//         createCourse={createCourse}
//       />

//       {/* Stats */}

//       <div className="text-sm text-muted-foreground">
//         Total Courses:{' '}
//         <span className="font-semibold text-foreground">
//           {courses.length}
//         </span>
//       </div>

//       {/* Grid */}

//       <CourseGrid
//         courses={courses}
//         loading={loading || deleting}
//         onView={handleView}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//       />
//     </div>
//   )
// }



//gemini UI

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useCourses from '@/hooks/useCourses'
import useCategories from '@/hooks/useCategories'

import CourseToolbar from './_components/CourseToolbar'
import CourseGrid from './_components/CourseGrid'

export default function CoursePage() {
  const router = useRouter()
  const {
    courses,
    loading,
    createCourse,
    deleteCourse,
    filters,
    setFilters,
  } = useCourses()

  const { categories } = useCategories()
  const [deleting, setDeleting] = useState(false)

  const handleView = (course) => {
    router.push(`/admin/dashboard/courses/${course.id}`)
  }

  const handleEdit = (course) => {
    console.log('Edit:', course)
    // TODO:
    // router.push(`/dashboard/courses/${course.id}/edit`)
  }

  const handleDelete = async (course) => {
    const confirmDelete = window.confirm(
      `Delete "${course.title}"?`
    )

    if (!confirmDelete) return

    try {
      setDeleting(true)
      await deleteCourse(course.id)
      toast.success('Course deleted successfully')
    } catch (err) {
      toast.error('Failed to delete course')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="min-h-screen relative bg-slate-50 p-6 md:p-8 z-0">
      
      {/* Decorative Fixed Background Blobs for Glassmorphism Context */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] rounded-full bg-blue-400/20 mix-blend-multiply blur-[100px] opacity-70" />
        <div className="absolute top-[20%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-purple-400/20 mix-blend-multiply blur-[100px] opacity-70" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40rem] h-[40rem] rounded-full bg-indigo-400/20 mix-blend-multiply blur-[100px] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 relative z-[100]">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Courses
          </h1>
          <p className="text-slate-500 font-medium">
            Manage your courses, lessons and pricing.
          </p>
        </div>

        {/* Toolbar */}
        <div className="relative z-[90]">
          <CourseToolbar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            createCourse={createCourse}
          />
        </div>

        {/* Stats */}
        <div className="text-sm font-semibold text-slate-500 pl-2">
          Total Courses:{' '}
          <span className="font-bold text-indigo-600 ml-1 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
            {courses.length}
          </span>
        </div>

        {/* Grid */}
        <div className="relative z-10">
          <CourseGrid
            courses={courses}
            loading={loading || deleting}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

      </div>
    </div>
  )
}