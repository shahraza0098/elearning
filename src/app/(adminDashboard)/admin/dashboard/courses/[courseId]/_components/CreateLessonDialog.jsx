// 'use client'

// import { useState } from 'react'

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import useBunnyUpload from '@/hooks/useBunnyUpload'
// import { uploadToBunny } from '@/lib/tus-upload';

// function createSlug(value) {
//   return value
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '')
// }

// function buildInitialState(defaultPosition) {
//   return {
//     title: '',
//     slug: '',
//     description: '',
//     position: String(defaultPosition),
//     duration: '0',
//     videoId: '',
//     thumbnailUrl: '',
//     isPreview: false,
//   }
// }

// export default function CreateLessonDialog({
//   sectionId,
//   defaultPosition,
//   onCreated,
// }) {
//   const [open, setOpen] = useState(false)
//   const [formState, setFormState] = useState(buildInitialState(defaultPosition))
//   const [errorMessage, setErrorMessage] = useState('')
//   const [isSaving, setIsSaving] = useState(false)
//   const [selectedVideoFile, setSelectedVideoFile] = useState(null)
//   const [uploadingProgress, setUploadingProgress] = useState(0)
//   const { uploadVideo, uploading, progress, pauseUpload, resumeUpload, cancelUpload } = useBunnyUpload()

//   const resetState = () => {
//     setFormState(buildInitialState(defaultPosition))
//     setErrorMessage('')
//     setSelectedVideoFile(null)
//   }

//   const handleOpenChange = (nextOpen) => {
//     setOpen(nextOpen)

//     if (!nextOpen) {
//       resetState()
//     }
//   }

//   const handleTitleChange = (event) => {
//     const title = event.target.value

//     setFormState((current) => {
//       const nextSlug =
//         current.slug.length === 0 || current.slug === createSlug(current.title)
//           ? createSlug(title)
//           : current.slug

//       return {
//         ...current,
//         title,
//         slug: nextSlug,
//       }
//     })
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     setIsSaving(true)
//     setErrorMessage('')

//     try {
//      let videoId = formState.videoId.trim()

// if (selectedVideoFile) {
//   const uploadedVideo = await uploadToBunny(
//     selectedVideoFile,
//     (progress) => {
//       setUploadingProgress(progress)
//     }
//   )

//   videoId = uploadedVideo.videoId
// }

//       if (!videoId) {
//         throw new Error('Please upload a video or enter a Video ID.')
//       }

//       const response = await fetch('/api/admin/lesson', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: formState.title,
//           slug: formState.slug,
//           description: formState.description || undefined,
//           position: Number(formState.position),
//           duration: Number(formState.duration),
//           videoId,
//           thumbnailUrl: formState.thumbnailUrl || undefined,
//           isPreview: formState.isPreview,
//           sectionId,
//         }),
//       })

//       const payload = await response.json().catch(() => null)

//       if (!response.ok) {
//         throw new Error(
//           payload?.errors?.join(', ') ||
//             payload?.message ||
//             'Failed to create lesson.'
//         )
//       }

//       onCreated(payload.data)
//       handleOpenChange(false)
//     } catch (error) {
//       setErrorMessage(error.message || 'Failed to create lesson.')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogTrigger asChild>
//         <Button size="sm">Add Lesson</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Create Lesson</DialogTitle>
//           <DialogDescription>
//             Add a lesson to this section with its playback and preview details.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="space-y-2 sm:col-span-2">
//               <label className="text-sm font-medium text-foreground">
//                 Lesson title
//               </label>
//               <input
//                 required
//                 type="text"
//                 value={formState.title}
//                 onChange={handleTitleChange}
//                 placeholder="Welcome and course roadmap"
//                 className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//               />
//             </div>

//             <div className="space-y-2 sm:col-span-2">
//               <label className="text-sm font-medium text-foreground">
//                 Slug
//               </label>
//               <input
//                 required
//                 type="text"
//                 value={formState.slug}
//                 onChange={(event) =>
//                   setFormState((current) => ({
//                     ...current,
//                     slug: event.target.value,
//                   }))
//                 }
//                 placeholder="welcome-course-roadmap"
//                 className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-foreground">
//                 Position
//               </label>
//               <input
//                 required
//                 min="0"
//                 step="1"
//                 type="number"
//                 value={formState.position}
//                 onChange={(event) =>
//                   setFormState((current) => ({
//                     ...current,
//                     position: event.target.value,
//                   }))
//                 }
//                 className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-foreground">
//                 Duration (seconds)
//               </label>
//               <input
//                 required
//                 min="0"
//                 step="1"
//                 type="number"
//                 value={formState.duration}
//                 onChange={(event) =>
//                   setFormState((current) => ({
//                     ...current,
//                     duration: event.target.value,
//                   }))
//                 }
//                 className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//               />
//             </div>

//             <div className="space-y-2 sm:col-span-2">
//               <label className="text-sm font-medium text-foreground">
//                 Upload video for Bunny Stream
//               </label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 disabled={uploading}
//                 onChange={(event) => {
//                   const file = event.target.files?.[0] ?? null
//                   setSelectedVideoFile(file)
//                 }}
//                 className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
//               />
//               <p className="text-sm text-muted-foreground">
//                 Upload a video here to create a Bunny Stream asset. Leave it blank to use a manual Video ID.
//                 Supports files up to 5GB+ with resumable upload.
//               </p>

//               {selectedVideoFile && (
//                 <div className="rounded-lg border border-border bg-muted/30 p-3">
//                   <p className="text-sm font-medium text-foreground">
//                     {selectedVideoFile.name}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     {(selectedVideoFile.size / (1024 * 1024 * 1024)).toFixed(2)} GB
//                   </p>
//                 </div>
//               )}

//               {uploading && (
//                 <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
//                   <div className="flex items-center justify-between">
//                     <p className="text-sm font-medium text-foreground">
//                       Uploading: {Math.round(progress)}%
//                     </p>
//                     <p className="text-xs text-muted-foreground">
//                       {Math.round(progress)}% complete
//                     </p>
//                   </div>
//                   <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
//                     <div
//                       className="h-full bg-green-500 transition-all duration-300"
//                       style={{ width: `${progress}%` }}
//                     />
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       type="button"
//                       size="sm"
//                       variant="outline"
//                       onClick={pauseUpload}
//                       className="flex-1"
//                     >
//                       Pause
//                     </Button>
//                     <Button
//                       type="button"
//                       size="sm"
//                       variant="outline"
//                       onClick={resumeUpload}
//                       className="flex-1"
//                     >
//                       Resume
//                     </Button>
//                     <Button
//                       type="button"
//                       size="sm"
//                       variant="destructive"
//                       onClick={cancelUpload}
//                       className="flex-1"
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="space-y-2 sm:col-span-2">
//               <label className="text-sm font-medium text-foreground">
//                 Video ID
//               </label>
//               <input
//                 type="text"
//                 value={formState.videoId}
//                 onChange={(event) =>
//                   setFormState((current) => ({
//                     ...current,
//                     videoId: event.target.value,
//                   }))
//                 }
//                 placeholder="mux_123 or provider asset id"
//                 className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-foreground">
//                 Thumbnail URL
//               </label>
//               <input
//                 type="url"
//                 value={formState.thumbnailUrl}
//                 onChange={(event) =>
//                   setFormState((current) => ({
//                     ...current,
//                     thumbnailUrl: event.target.value,
//                   }))
//                 }
//                 placeholder="https://example.com/lesson-cover.jpg"
//                 className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//               />
//             </div>

//             <div className="space-y-2 sm:col-span-2">
//               <label className="text-sm font-medium text-foreground">
//                 Description
//               </label>
//               <textarea
//                 rows={4}
//                 value={formState.description}
//                 onChange={(event) =>
//                   setFormState((current) => ({
//                     ...current,
//                     description: event.target.value,
//                   }))
//                 }
//                 placeholder="What students will learn in this lesson..."
//                 className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//               />
//             </div>
//           </div>

//           <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-3 py-3">
//             <input
//               type="checkbox"
//               checked={formState.isPreview}
//               onChange={(event) =>
//                 setFormState((current) => ({
//                   ...current,
//                   isPreview: event.target.checked,
//                 }))
//               }
//               className="mt-1 h-4 w-4"
//             />
//             <div>
//               <p className="text-sm font-medium text-foreground">
//                 Make this lesson a preview
//               </p>
//               <p className="text-sm text-muted-foreground">
//                 Preview lessons can be visible to non-enrolled visitors.
//               </p>
//             </div>
//           </label>

//           {errorMessage ? (
//             <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//               {errorMessage}
//             </div>
//           ) : null}

//           <DialogFooter className="px-0 pb-0">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => handleOpenChange(false)}
//               disabled={isSaving || uploading}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isSaving || uploading}>
//               {uploading ? `Uploading video (${Math.round(progress)}%)...` : isSaving ? 'Saving...' : 'Create Lesson'}
//             </Button>
//           </DialogFooter>
//         </form>
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
import { Plus, Pause, Play, X, Video } from 'lucide-react'
import useBunnyUpload from '@/hooks/useBunnyUpload'
import { uploadToBunny } from '@/lib/tus-upload'

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildInitialState(defaultPosition) {
  return {
    title: '',
    slug: '',
    description: '',
    position: String(defaultPosition),
    duration: '0',
    videoId: '',
    thumbnailUrl: '',
    isPreview: false,
  }
}

export default function CreateLessonDialog({
  sectionId,
  defaultPosition,
  onCreated,
}) {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState(buildInitialState(defaultPosition))
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [selectedVideoFile, setSelectedVideoFile] = useState(null)
  const [uploadingProgress, setUploadingProgress] = useState(0)
  const { uploadVideo, uploading, progress, pauseUpload, resumeUpload, cancelUpload } = useBunnyUpload()

  const resetState = () => {
    setFormState(buildInitialState(defaultPosition))
    setErrorMessage('')
    setSelectedVideoFile(null)
  }

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen)
    if (!nextOpen) resetState()
  }

  const handleTitleChange = (event) => {
    const title = event.target.value
    setFormState((current) => {
      const nextSlug =
        current.slug.length === 0 || current.slug === createSlug(current.title)
          ? createSlug(title)
          : current.slug
      return { ...current, title, slug: nextSlug }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage('')

    try {
      let videoId = formState.videoId.trim()

      if (selectedVideoFile) {
        const uploadedVideo = await uploadToBunny(
          selectedVideoFile,
          (progress) => setUploadingProgress(progress)
        )
        videoId = uploadedVideo.videoId
      }

      if (!videoId) {
        throw new Error('Please upload a video or enter a Video ID.')
      }

      const response = await fetch('/api/admin/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formState.title,
          slug: formState.slug,
          description: formState.description || undefined,
          position: Number(formState.position),
          duration: Number(formState.duration),
          videoId,
          thumbnailUrl: formState.thumbnailUrl || undefined,
          isPreview: formState.isPreview,
          sectionId,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          payload?.errors?.join(', ') || payload?.message || 'Failed to create lesson.'
        )
      }

      onCreated(payload.data)
      handleOpenChange(false)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create lesson.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-0 shadow-sm rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300">
          <Plus className="h-4 w-4" /> Add Lesson
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-4xl !p-0 overflow-hidden bg-white/80 backdrop-blur-2xl border-white/80 shadow-[0_16px_64px_rgba(0,0,0,0.1)] rounded-[2rem]">
        <DialogHeader className="px-8 py-6 border-b border-white/40 bg-gradient-to-r from-white/40 to-transparent shrink-0">
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Create Lesson
          </DialogTitle>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Add a lesson to this section with its playback and preview details.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          
          {/* Scrollable Form Body */}
          <div className="overflow-y-auto max-h-[calc(100vh-220px)] p-6 md:p-8 space-y-8 custom-scrollbar">
            
            {/* Core Info */}
            <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Lesson Details</h3>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Lesson title</label>
                  <input
                    required
                    type="text"
                    value={formState.title}
                    onChange={handleTitleChange}
                    placeholder="Welcome and course roadmap"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-sm text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">URL Slug</label>
                  <input
                    required
                    type="text"
                    value={formState.slug}
                    onChange={(e) => setFormState(c => ({ ...c, slug: e.target.value }))}
                    placeholder="welcome-course-roadmap"
                    className="w-full px-4 py-3 rounded-xl bg-slate-100/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-sm text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Position</label>
                  <input
                    required min="0" step="1" type="number"
                    value={formState.position}
                    onChange={(e) => setFormState(c => ({ ...c, position: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-sm text-slate-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Duration (seconds)</label>
                  <input
                    required min="0" step="1" type="number"
                    value={formState.duration}
                    onChange={(e) => setFormState(c => ({ ...c, duration: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-sm text-slate-800"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Description</label>
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={(e) => setFormState(c => ({ ...c, description: e.target.value }))}
                    placeholder="What students will learn in this lesson..."
                    className="w-full px-4 py-4 resize-none rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-sm text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Media Info */}
            <div className="space-y-6 rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Video & Media</h3>
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Upload video for Bunny Stream</label>
                  <input
                    type="file"
                    accept="video/*"
                    disabled={uploading}
                    onChange={(e) => setSelectedVideoFile(e.target.files?.[0] ?? null)}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 text-slate-800 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer disabled:opacity-50"
                  />
                  <p className="text-xs font-medium text-slate-500 ml-1 mt-2">
                    Supports files up to 5GB+ with resumable upload. Leave blank to use a manual Video ID.
                  </p>

                  {selectedVideoFile && (
                    <div className="mt-4 rounded-xl border border-white/80 bg-white/60 backdrop-blur-md p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                          <Video size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 truncate max-w-[200px] sm:max-w-sm">
                            {selectedVideoFile.name}
                          </p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">
                            {(selectedVideoFile.size / (1024 * 1024 * 1024)).toFixed(2)} GB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {uploading && (
                    <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50/50 backdrop-blur-md p-4 space-y-4 shadow-sm animate-in fade-in">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-indigo-900">
                          Uploading Video
                        </p>
                        <p className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-md">
                          {Math.round(progress)}%
                        </p>
                      </div>
                      
                      {/* Custom Progress Bar */}
                      <div className="h-2.5 w-full overflow-hidden rounded-full bg-indigo-200/50">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-300 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          onClick={pauseUpload}
                          className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm rounded-xl h-9"
                        >
                          <Pause size={14} className="mr-2" /> Pause
                        </Button>
                        <Button
                          type="button"
                          onClick={resumeUpload}
                          className="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm rounded-xl h-9"
                        >
                          <Play size={14} className="mr-2" /> Resume
                        </Button>
                        <Button
                          type="button"
                          onClick={cancelUpload}
                          className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 shadow-sm rounded-xl h-9"
                        >
                          <X size={14} className="mr-2" /> Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative flex items-center py-2 md:col-span-2">
                  <div className="grow border-t border-white/80" />
                  <span className="mx-4 text-xs font-bold text-slate-400 uppercase">or</span>
                  <div className="grow border-t border-white/80" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Manual Video ID</label>
                  <input
                    type="text"
                    value={formState.videoId}
                    onChange={(e) => setFormState(c => ({ ...c, videoId: e.target.value }))}
                    placeholder="mux_123 or provider asset id"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-sm text-slate-800 placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Thumbnail URL</label>
                  <input
                    type="url"
                    value={formState.thumbnailUrl}
                    onChange={(e) => setFormState(c => ({ ...c, thumbnailUrl: e.target.value }))}
                    placeholder="https://example.com/cover.jpg"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 shadow-sm text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Visibility Settings */}
            <div className="rounded-[2rem] border border-white/60 bg-white/40 backdrop-blur-xl p-6 shadow-sm flex items-center gap-4">
              <input
                type="checkbox"
                id="isPreview"
                checked={formState.isPreview}
                onChange={(e) => setFormState(c => ({ ...c, isPreview: e.target.checked }))}
                className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <div>
                <label htmlFor="isPreview" className="text-sm font-bold text-slate-800 cursor-pointer block">
                  Make this lesson a preview
                </label>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Preview lessons can be visible to non-enrolled visitors.
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="rounded-2xl border border-rose-200/50 bg-rose-50/80 backdrop-blur-sm p-4 text-sm font-medium text-rose-800 shadow-sm">
                {errorMessage}
              </div>
            )}
          </div>

          {/* Sticky Footer */}
          <div className="shrink-0 flex items-center justify-end gap-3 p-6 md:px-8 border-t border-white/40 bg-white/40 backdrop-blur-xl rounded-b-[2rem]">
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isSaving || uploading}
              className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-white/80 border border-transparent hover:border-white rounded-xl transition-all duration-300 backdrop-blur-sm shadow-none"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSaving || uploading}
              className="flex items-center justify-center px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg shadow-indigo-500/30 disabled:opacity-70 border-0 min-w-[160px]"
            >
              {uploading ? `Uploading (${Math.round(progress)}%)...` : isSaving ? 'Saving...' : 'Create Lesson'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}