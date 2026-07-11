// 'use client'

// import { useMemo, useState } from 'react'

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

// function buildInitialState(defaultPosition) {
//   return {
//     title: '',
//     position: String(defaultPosition),
//   }
// }

// export default function CreateSectionDialog({
//   courseId,
//   defaultPosition,
//   onCreated,
// }) {
//   const initialState = useMemo(
//     () => buildInitialState(defaultPosition),
//     [defaultPosition]
//   )
//   const [open, setOpen] = useState(false)
//   const [formState, setFormState] = useState(initialState)
//   const [errorMessage, setErrorMessage] = useState('')
//   const [isSaving, setIsSaving] = useState(false)

//   const resetState = () => {
//     setFormState(buildInitialState(defaultPosition))
//     setErrorMessage('')
//   }

//   const handleOpenChange = (nextOpen) => {
//     setOpen(nextOpen)

//     if (!nextOpen) {
//       resetState()
//     }
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     setIsSaving(true)
//     setErrorMessage('')

//     try {
//       const response = await fetch('/api/admin/section', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: formState.title,
//           position: Number(formState.position),
//           courseId,
//         }),
//       })

//       const payload = await response.json().catch(() => null)

//       if (!response.ok) {
//         throw new Error(
//           payload?.errors?.join(', ') ||
//             payload?.message ||
//             'Failed to create section.'
//         )
//       }

//       onCreated(payload.data)
//       handleOpenChange(false)
//     } catch (error) {
//       setErrorMessage(error.message || 'Failed to create section.')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogTrigger asChild>
//         <Button>Add New Section</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Create Section</DialogTitle>
//           <DialogDescription>
//             Add a new section to this course and place it in the right order.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-foreground">
//               Section title
//             </label>
//             <input
//               required
//               type="text"
//               value={formState.title}
//               onChange={(event) =>
//                 setFormState((current) => ({
//                   ...current,
//                   title: event.target.value,
//                 }))
//               }
//               placeholder="Introduction"
//               className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-medium text-foreground">
//               Position
//             </label>
//             <input
//               required
//               min="0"
//               step="1"
//               type="number"
//               value={formState.position}
//               onChange={(event) =>
//                 setFormState((current) => ({
//                   ...current,
//                   position: event.target.value,
//                 }))
//               }
//               className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
//             />
//           </div>

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
//               disabled={isSaving}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isSaving}>
//               {isSaving ? 'Saving...' : 'Create Section'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }





//gemini UI


'use client'

import { useMemo, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function buildInitialState(defaultPosition) {
  return {
    title: '',
    position: String(defaultPosition),
  }
}

export default function CreateSectionDialog({
  courseId,
  defaultPosition,
  onCreated,
}) {
  const initialState = useMemo(
    () => buildInitialState(defaultPosition),
    [defaultPosition]
  )
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const resetState = () => {
    setFormState(buildInitialState(defaultPosition))
    setErrorMessage('')
  }

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      resetState()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/admin/section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formState.title,
          position: Number(formState.position),
          courseId,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          payload?.errors?.join(', ') ||
            payload?.message ||
            'Failed to create section.'
        )
      }

      onCreated(payload.data)
      handleOpenChange(false)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create section.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg shadow-indigo-500/30 w-full sm:w-auto border-0">
          <Plus className="h-4 w-4" />
          Add New Section
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md !p-0 overflow-hidden bg-white/80 backdrop-blur-2xl border-white/80 shadow-[0_16px_64px_rgba(0,0,0,0.1)] rounded-[2rem]">
        <DialogHeader className="px-8 py-6 border-b border-white/40 bg-gradient-to-r from-white/40 to-transparent shrink-0">
          <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
            Create Section
          </DialogTitle>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Add a new section to this course and place it in the right order.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="p-6 md:px-8 space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Section title
              </label>
              <input
                required
                type="text"
                value={formState.title}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Introduction"
                className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Position
              </label>
              <input
                required
                min="0"
                step="1"
                type="number"
                value={formState.position}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    position: event.target.value,
                  }))
                }
                className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-slate-800 placeholder-slate-400"
              />
            </div>

            {errorMessage ? (
              <div className="rounded-xl border border-rose-200/50 bg-rose-50/80 backdrop-blur-sm p-3 text-sm font-medium text-rose-800 shadow-sm">
                {errorMessage}
              </div>
            ) : null}
          </div>

          <div className="shrink-0 flex items-center justify-end gap-3 p-6 md:px-8 border-t border-white/40 bg-white/40 backdrop-blur-xl rounded-b-[2rem]">
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isSaving}
              className="px-6 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-white/80 border border-transparent hover:border-white rounded-xl transition-all duration-300 backdrop-blur-sm shadow-none"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSaving}
              className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg shadow-indigo-500/30 disabled:opacity-70 border-0"
            >
              {isSaving ? 'Saving...' : 'Create Section'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}