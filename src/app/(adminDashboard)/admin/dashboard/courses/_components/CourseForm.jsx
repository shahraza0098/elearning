// 'use client'

// import Image from 'next/image'
// import { useEffect, useState } from 'react'
// import { useForm, useWatch } from 'react-hook-form'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

// import { Label } from '@/components/ui/label'
// import { Switch } from '@/components/ui/switch'

// function slugify(text = '') {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-')
// }

// export default function CourseForm({
//   categories = [],
//   onSubmit,
//   onCancel,
//   initialValues = null,
// }) {
//   const [submitError, setSubmitError] = useState('')
//   const [thumbnailFile, setThumbnailFile] = useState(null)
//   const [thumbnailPreview, setThumbnailPreview] = useState('')

//   const {
//     control,
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     defaultValues: {
//       title: '',
//       slug: '',
//       description: '',
//       categoryId: '',
//       thumbnailUrl: '',
//       price: '',
//       position: 0,
//       totalDuration: '',
//       level: 'BEGINNER',
//       isPublished: false,
//     },
//   })

//   useEffect(() => {
//     if (initialValues) {
//       reset(initialValues)
//     }
//   }, [initialValues, reset])

//   const title = useWatch({ control, name: 'title' })
//   const categoryId = useWatch({ control, name: 'categoryId' })
//   const level = useWatch({ control, name: 'level' })
//   const thumbnailUrl = useWatch({ control, name: 'thumbnailUrl' })
//   const isPublished = useWatch({ control, name: 'isPublished' })

//   useEffect(() => {
//     if (!initialValues) {
//       setValue('slug', slugify(title))
//     }
//   }, [title, initialValues, setValue])

//   useEffect(() => {
//     return () => {
//       if (thumbnailPreview.startsWith('blob:')) {
//         URL.revokeObjectURL(thumbnailPreview)
//       }
//     }
//   }, [thumbnailPreview])

//   const handleThumbnailFileChange = (event) => {
//     const file = event.target.files?.[0] ?? null

//     if (thumbnailPreview.startsWith('blob:')) {
//       URL.revokeObjectURL(thumbnailPreview)
//     }

//     setThumbnailFile(file)
//     setThumbnailPreview(file ? URL.createObjectURL(file) : '')
//   }

//   const handleFormSubmit = async (values) => {
//     setSubmitError('')

//     try {
//       let uploadedThumbnailUrl = values.thumbnailUrl?.trim() ?? ''

//       if (thumbnailFile) {
//         const uploadFormData = new FormData()
//         uploadFormData.append('file', thumbnailFile)

//         const uploadResponse = await fetch(
//           '/api/admin/upload/course-thumbnail',
//           {
//             method: 'POST',
//             body: uploadFormData,
//           }
//         )

//         const uploadPayload = await uploadResponse.json().catch(() => null)

//         if (!uploadResponse.ok) {
//           throw new Error(
//             uploadPayload?.message ||
//               'Failed to upload course banner image.'
//           )
//         }

//         uploadedThumbnailUrl =
//           uploadPayload?.data?.publicUrl ?? uploadedThumbnailUrl
//       }

//       if (!uploadedThumbnailUrl) {
//         throw new Error(
//           'Please upload a course banner image or provide a thumbnail URL.'
//         )
//       }

//       await onSubmit({
//         ...values,
//         thumbnailUrl: uploadedThumbnailUrl,
//         totalDuration:
//           values.totalDuration === '' ||
//           values.totalDuration === null ||
//           values.totalDuration === undefined
//             ? null
//             : values.totalDuration,
//       })
//     } catch (error) {
//       setSubmitError(error.message || 'Failed to save course.')
//     }
//   }

//   const resolvedThumbnailPreview =
//     thumbnailPreview || thumbnailUrl || initialValues?.thumbnailUrl || ''

//   return (
//     <form
//       onSubmit={handleSubmit(handleFormSubmit)}
//       className="mx-auto max-w-4xl space-y-8 pb-10"
//     >
//       {submitError && (
//         <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
//           <p className="font-medium">Hold up!</p>
//           <p>{submitError}</p>
//         </div>
//       )}

//       {/* Basic Information Section */}
//       <div className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
//         <div>
//           <h3 className="text-lg font-semibold leading-none tracking-tight">
//             Basic Information
//           </h3>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Provide the core details and description for this course.
//           </p>
//         </div>
        
//         <div className="h-px bg-border" />

//         <div className="grid gap-6 md:grid-cols-2">
//           {/* Title */}
//           <div className="space-y-2">
//             <Label htmlFor="title">Course Title</Label>
//             <Input
//               id="title"
//               placeholder="e.g. React Masterclass"
//               {...register('title', {
//                 required: 'Course title is required',
//               })}
//             />
//             {errors.title && (
//               <p className="text-[0.8rem] font-medium text-destructive">
//                 {errors.title.message}
//               </p>
//             )}
//           </div>

//           {/* Slug */}
//           <div className="space-y-2">
//             <Label htmlFor="slug">URL Slug</Label>
//             <Input
//               id="slug"
//               placeholder="e.g. react-masterclass"
//               className="bg-muted/50"
//               {...register('slug', {
//                 required: 'Slug is required',
//               })}
//             />
//             {errors.slug && (
//               <p className="text-[0.8rem] font-medium text-destructive">
//                 {errors.slug.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Description */}
//         <div className="space-y-2">
//           <Label htmlFor="description">Description</Label>
//           <Textarea
//             id="description"
//             rows={5}
//             className="resize-none"
//             placeholder="What will students learn in this course?"
//             {...register('description', {
//               required: 'Description is required',
//             })}
//           />
//           {errors.description && (
//             <p className="text-[0.8rem] font-medium text-destructive">
//               {errors.description.message}
//             </p>
//           )}
//         </div>

//         {/* Category */}
//         <div className="space-y-2">
//           <Label>Category</Label>
//           <Select
//             onValueChange={(value) => setValue('categoryId', value)}
//             value={categoryId || undefined}
//           >
//             <SelectTrigger className="w-full md:w-[50%]">
//               <SelectValue placeholder="Select a relevant category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((category) => (
//                 <SelectItem key={category.id} value={category.id}>
//                   {category.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <input
//             type="hidden"
//             {...register('categoryId', {
//               required: 'Category is required',
//             })}
//           />
//           {errors.categoryId && (
//             <p className="text-[0.8rem] font-medium text-destructive">
//               {errors.categoryId.message}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Media Section */}
//       <div className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
//         <div>
//           <h3 className="text-lg font-semibold leading-none tracking-tight">
//             Course Media
//           </h3>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Upload a compelling banner image to attract students.
//           </p>
//         </div>

//         <div className="h-px bg-border" />

//         <div className="grid gap-6 md:grid-cols-2">
//           {/* File Upload */}
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label>Upload Course Banner</Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleThumbnailFileChange}
//                 className="cursor-pointer file:text-foreground"
//               />
//               <p className="text-[0.8rem] text-muted-foreground">
//                 Recommended: 1280x720px (JPG, PNG, WEBP). Max 5MB.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <div className="relative flex items-center py-2">
//                 <div className="grow border-t border-muted" />
//                 <span className="mx-2 text-xs text-muted-foreground uppercase">or</span>
//                 <div className="grow border-t border-muted" />
//               </div>
              
//               <Label>Course Banner URL</Label>
//               <Input
//                 type="url"
//                 placeholder="https://images.example.com/course-cover.jpg"
//                 {...register('thumbnailUrl')}
//               />
//             </div>
//           </div>

//           {/* Preview Area */}
//           <div className="flex flex-col space-y-2">
//             <Label>Preview</Label>
//             {resolvedThumbnailPreview ? (
//               <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted shadow-inner">
//                 <Image
//                   src={resolvedThumbnailPreview}
//                   alt="Course banner preview"
//                   fill
//                   unoptimized
//                   className="object-cover transition-all hover:scale-105"
//                 />
//               </div>
//             ) : (
//               <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
//                 <p className="text-sm text-muted-foreground">No image selected</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Configuration Section */}
//       <div className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
//         <div>
//           <h3 className="text-lg font-semibold leading-none tracking-tight">
//             Course Configuration
//           </h3>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Set the difficulty, pricing, and structural details.
//           </p>
//         </div>

//         <div className="h-px bg-border" />

//         <div className="grid gap-6 md:grid-cols-2">
//           <div className="space-y-2">
//             <Label>Level</Label>
//             <Select
//               value={level}
//               onValueChange={(value) => setValue('level', value)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select course level" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="BEGINNER">Beginner</SelectItem>
//                 <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
//                 <SelectItem value="ADVANCED">Advanced</SelectItem>
//               </SelectContent>
//             </Select>
//             <input type="hidden" {...register('level')} />
//           </div>

//           <div className="space-y-2">
//             <Label>Position (Sorting Order)</Label>
//             <Input
//               type="number"
//               min="0"
//               step="1"
//               placeholder="0"
//               {...register('position', {
//                 required: 'Position is required',
//                 valueAsNumber: true,
//                 min: {
//                   value: 0,
//                   message: 'Position must be 0 or greater',
//                 },
//               })}
//             />
//             {errors.position && (
//               <p className="text-[0.8rem] font-medium text-destructive">
//                 {errors.position.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label>Price (USD)</Label>
//             <div className="relative">
//               <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">$</span>
//               <Input
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 placeholder="49.99"
//                 className="pl-7"
//                 {...register('price', {
//                   required: 'Price is required',
//                   valueAsNumber: true,
//                   min: {
//                     value: 0,
//                     message: 'Price must be 0 or greater',
//                   },
//                 })}
//               />
//             </div>
//             {errors.price && (
//               <p className="text-[0.8rem] font-medium text-destructive">
//                 {errors.price.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label>Total Duration (Seconds)</Label>
//             <Input
//               type="number"
//               min="0"
//               step="1"
//               placeholder="e.g. 5400 (1.5 hours)"
//               {...register('totalDuration', {
//                 setValueAs: (value) => (value === '' ? '' : Number(value)),
//                 validate: (value) =>
//                   value === '' ||
//                   (Number.isInteger(value) && value >= 0) ||
//                   'Duration must be a non-negative integer',
//               })}
//             />
//             {errors.totalDuration && (
//               <p className="text-[0.8rem] font-medium text-destructive">
//                 {errors.totalDuration.message}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Publish Section */}
//       <div className="flex items-center justify-between rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
//         <div className="space-y-1">
//           <Label className="text-base">Publish Course</Label>
//           <p className="text-sm text-muted-foreground">
//             Turn this on to make the course visible and accessible to students.
//           </p>
//         </div>
//         <Switch
//           checked={isPublished}
//           onCheckedChange={(value) => setValue('isPublished', value)}
//         />
//       </div>

//       {/* Sticky Bottom Actions */}
//       <div className="sticky bottom-0 z-10 flex items-center justify-end gap-4 border-t bg-background/80 px-4 py-4 backdrop-blur-md sm:px-0">
//         <Button
//           type="button"
//           variant="ghost"
//           onClick={onCancel}
//           disabled={isSubmitting}
//         >
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
//           {isSubmitting
//             ? 'Saving Changes...'
//             : initialValues
//             ? 'Update Course'
//             : 'Create Course'}
//         </Button>
//       </div>
//     </form>
//   )
// }





//gemini UI

'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

function slugify(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export default function CourseForm({
  categories = [],
  onSubmit,
  onCancel,
  initialValues = null,
}) {
  const [submitError, setSubmitError] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      categoryId: '',
      thumbnailUrl: '',
      price: '',
      position: 0,
      totalDuration: '',
      level: 'BEGINNER',
      isPublished: false,
    },
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const title = useWatch({ control, name: 'title' })
  const categoryId = useWatch({ control, name: 'categoryId' })
  const level = useWatch({ control, name: 'level' })
  const thumbnailUrl = useWatch({ control, name: 'thumbnailUrl' })
  const isPublished = useWatch({ control, name: 'isPublished' })

  useEffect(() => {
    if (!initialValues) {
      setValue('slug', slugify(title))
    }
  }, [title, initialValues, setValue])

  useEffect(() => {
    return () => {
      if (thumbnailPreview.startsWith('blob:')) {
        URL.revokeObjectURL(thumbnailPreview)
      }
    }
  }, [thumbnailPreview])

  const handleThumbnailFileChange = (event) => {
    const file = event.target.files?.[0] ?? null

    if (thumbnailPreview.startsWith('blob:')) {
      URL.revokeObjectURL(thumbnailPreview)
    }

    setThumbnailFile(file)
    setThumbnailPreview(file ? URL.createObjectURL(file) : '')
  }

  const handleFormSubmit = async (values) => {
    setSubmitError('')

    try {
      let uploadedThumbnailUrl = values.thumbnailUrl?.trim() ?? ''

      if (thumbnailFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', thumbnailFile)

        const uploadResponse = await fetch(
          '/api/admin/upload/course-thumbnail',
          {
            method: 'POST',
            body: uploadFormData,
          }
        )

        const uploadPayload = await uploadResponse.json().catch(() => null)

        if (!uploadResponse.ok) {
          throw new Error(
            uploadPayload?.message ||
              'Failed to upload course banner image.'
          )
        }

        uploadedThumbnailUrl =
          uploadPayload?.data?.publicUrl ?? uploadedThumbnailUrl
      }

      if (!uploadedThumbnailUrl) {
        throw new Error(
          'Please upload a course banner image or provide a thumbnail URL.'
        )
      }

      await onSubmit({
        ...values,
        thumbnailUrl: uploadedThumbnailUrl,
        totalDuration:
          values.totalDuration === '' ||
          values.totalDuration === null ||
          values.totalDuration === undefined
            ? null
            : values.totalDuration,
      })
    } catch (error) {
      setSubmitError(error.message || 'Failed to save course.')
    }
  }

  const resolvedThumbnailPreview =
    thumbnailPreview || thumbnailUrl || initialValues?.thumbnailUrl || ''

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col w-full"
    >
      {/* FIX: This scrollable container fixes the dialog cropping issue */}
      <div className="overflow-y-auto max-h-[calc(100vh-220px)] p-6 md:p-8 space-y-8 custom-scrollbar">
        
        {submitError && (
          <div className="rounded-2xl border border-rose-200/50 bg-rose-50/80 backdrop-blur-sm p-4 text-sm text-rose-800 shadow-sm">
            <p className="font-bold flex items-center gap-2">Hold up!</p>
            <p className="font-medium mt-1">{submitError}</p>
          </div>
        )}

        {/* Basic Information Section */}
        <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl p-6 md:p-8 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Basic Information
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Provide the core details and description for this course.
            </p>
          </div>
          
          <div className="h-px bg-white/40" />

          {/* FIX: Two columns for all basic info */}
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-700 font-semibold ml-1">Course Title</Label>
              <Input
                id="title"
                placeholder="e.g. React Masterclass"
                className="w-full px-4 py-6 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800"
                {...register('title', { required: 'Course title is required' })}
              />
              {errors.title && (
                <p className="text-xs font-semibold text-rose-500 ml-1">{errors.title.message}</p>
              )}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-slate-700 font-semibold ml-1">URL Slug</Label>
              <Input
                id="slug"
                placeholder="e.g. react-masterclass"
                className="w-full px-4 py-6 rounded-xl bg-slate-100/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800"
                {...register('slug', { required: 'Slug is required' })}
              />
              {errors.slug && (
                <p className="text-xs font-semibold text-rose-500 ml-1">{errors.slug.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold ml-1">Category</Label>
              <Select
                onValueChange={(value) => setValue('categoryId', value)}
                value={categoryId || undefined}
              >
                <SelectTrigger className="w-full h-[50px] px-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800">
                  <SelectValue placeholder="Select a relevant category" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-xl border-white/80 rounded-xl">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="cursor-pointer focus:bg-indigo-50">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register('categoryId', { required: 'Category is required' })}
              />
              {errors.categoryId && (
                <p className="text-xs font-semibold text-rose-500 ml-1">{errors.categoryId.message}</p>
              )}
            </div>
            
            {/* Level */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold ml-1">Level</Label>
              <Select
                value={level}
                onValueChange={(value) => setValue('level', value)}
              >
                <SelectTrigger className="w-full h-[50px] px-4 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800">
                  <SelectValue placeholder="Select course level" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-xl border-white/80 rounded-xl">
                  <SelectItem value="BEGINNER" className="cursor-pointer focus:bg-indigo-50">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE" className="cursor-pointer focus:bg-indigo-50">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED" className="cursor-pointer focus:bg-indigo-50">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" {...register('level')} />
            </div>

            {/* Description (Spans 2 columns) */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-slate-700 font-semibold ml-1">Description</Label>
              <Textarea
                id="description"
                rows={4}
                className="w-full px-4 py-4 resize-none rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800"
                placeholder="What will students learn in this course?"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && (
                <p className="text-xs font-semibold text-rose-500 ml-1">{errors.description.message}</p>
              )}
            </div>

          </div>
        </div>

        {/* Configuration Section */}
        <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl p-6 md:p-8 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Course Configuration
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Set the pricing, ordering, and structural details.
            </p>
          </div>

          <div className="h-px bg-white/40" />

          {/* FIX: Two columns for configuration info */}
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            
            {/* Price */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold ml-1">Price (USD)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-400">$</span>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="49.99"
                  className="w-full pl-8 px-4 py-6 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800"
                  {...register('price', {
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Price must be 0 or greater' },
                  })}
                />
              </div>
              {errors.price && (
                <p className="text-xs font-semibold text-rose-500 ml-1">{errors.price.message}</p>
              )}
            </div>

            {/* Total Duration */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold ml-1">Total Duration (Seconds)</Label>
              <Input
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 5400 (1.5 hours)"
                className="w-full px-4 py-6 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800"
                {...register('totalDuration', {
                  setValueAs: (value) => (value === '' ? '' : Number(value)),
                  validate: (value) =>
                    value === '' || (Number.isInteger(value) && value >= 0) || 'Duration must be a non-negative integer',
                })}
              />
              {errors.totalDuration && (
                <p className="text-xs font-semibold text-rose-500 ml-1">{errors.totalDuration.message}</p>
              )}
            </div>

            {/* Position */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold ml-1">Position (Sorting Order)</Label>
              <Input
                type="number"
                min="0"
                step="1"
                placeholder="0"
                className="w-full px-4 py-6 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800"
                {...register('position', {
                  required: 'Position is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Position must be 0 or greater' },
                })}
              />
              {errors.position && (
                <p className="text-xs font-semibold text-rose-500 ml-1">{errors.position.message}</p>
              )}
            </div>

            {/* Publish Toggle */}
            <div className="space-y-2 flex flex-col justify-center pt-6">
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/60 bg-white/50 backdrop-blur-md shadow-sm">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold text-slate-800">Publish Course</Label>
                  <p className="text-xs font-medium text-slate-500">
                    Make visible to students.
                  </p>
                </div>
                <Switch
                  checked={isPublished}
                  onCheckedChange={(value) => setValue('isPublished', value)}
                  className="data-[state=checked]:bg-indigo-600"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Media Section */}
        <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl p-6 md:p-8 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              Course Media
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Upload a compelling banner image to attract students.
            </p>
          </div>

          <div className="h-px bg-white/40" />

          {/* FIX: Two columns for Media */}
          <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
            
            {/* File Upload Controls */}
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold ml-1">Upload Course Banner</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailFileChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                <p className="text-xs font-medium text-slate-500 ml-1">
                  Recommended: 1280x720px (JPG, PNG, WEBP). Max 5MB.
                </p>
              </div>

              <div className="relative flex items-center py-2">
                <div className="grow border-t border-white/80" />
                <span className="mx-4 text-xs font-bold text-slate-400 uppercase">or</span>
                <div className="grow border-t border-white/80" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold ml-1">Course Banner URL</Label>
                <Input
                  type="url"
                  placeholder="https://images.example.com/cover.jpg"
                  className="w-full px-4 py-6 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 text-slate-800"
                  {...register('thumbnailUrl')}
                />
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex flex-col space-y-2 h-full">
              <Label className="text-slate-700 font-semibold ml-1">Preview</Label>
              {resolvedThumbnailPreview ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/80 bg-slate-100/50 shadow-sm animate-in fade-in zoom-in">
                  <Image
                    src={resolvedThumbnailPreview}
                    alt="Course banner preview"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-2xl border-2 border-dashed border-white/80 bg-white/30 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-slate-400">No image selected</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* FIX: Sticky Bottom Actions separate from the scrollable area */}
      <div className="shrink-0 flex items-center justify-end gap-3 p-6 md:px-8 border-t border-white/40 bg-white/40 backdrop-blur-xl rounded-b-[2rem]">
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-white/80 border border-transparent hover:border-white rounded-xl transition-all duration-300 backdrop-blur-sm shadow-none"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="flex items-center justify-center px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg shadow-indigo-500/30 disabled:opacity-70 border-0 min-w-[160px]"
        >
          {isSubmitting
            ? 'Saving Changes...'
            : initialValues
            ? 'Update Course'
            : 'Create Course'}
        </Button>
      </div>
    </form>
  )
}