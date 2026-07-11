// 'use client'

// import { useState } from 'react'

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'

// import { Button } from '@/components/ui/button'

// import { Plus } from 'lucide-react'

// import CourseForm from './CourseForm'

// export default function CreateCourseDialog({
//   categories,
//   createCourse,
// }) {
//   const [open, setOpen] = useState(false)

//   const handleSubmit = async (values) => {
//     const result = await createCourse(values)

//     if (result) {
//       setOpen(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Course
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <DialogTitle>Create New Course</DialogTitle>
//         </DialogHeader>

//         <CourseForm
//           categories={categories}
//           onSubmit={handleSubmit}
//           onCancel={() => setOpen(false)}
//         />
//       </DialogContent>
//     </Dialog>
//   )
// }







//gemini UI


'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import CourseForm from './CourseForm'

export default function CreateCourseDialog({
  categories,
  createCourse,
}) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (values) => {
    const result = await createCourse(values)

    if (result) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg shadow-indigo-500/30 w-full sm:w-auto border-0">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </DialogTrigger>

      {/* 
        FIX: Added custom max-w-5xl for wider 2-col layout, removed default padding (!p-0), 
        and applied glassmorphism styling to the dialog content wrapper 
      */}
      <DialogContent className="sm:max-w-5xl !p-0 overflow-hidden bg-white/80 backdrop-blur-2xl border-white/80 shadow-[0_16px_64px_rgba(0,0,0,0.1)] rounded-[2rem]">
        <DialogHeader className="px-8 py-6 border-b border-white/40 bg-gradient-to-r from-white/40 to-transparent shrink-0">
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Create New Course
          </DialogTitle>
        </DialogHeader>

        <CourseForm
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}