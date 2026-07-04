# Quick Start: Bunny Stream TUS Upload

## 30-Second Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Add Bunny credentials to .env
BUNNY_STREAM_API_KEY=your_api_key
BUNNY_STREAM_LIBRARY_ID=your_library_id

# 3. Start dev server
pnpm dev

# 4. Navigate to Admin Dashboard → Courses → Add Lesson
# 5. Select a video file and upload
```

## Code Example

```javascript
import useBunnyUpload from '@/hooks/useBunnyUpload'

export function LessonUploader() {
  const { uploadVideo, uploading, progress, error } = useBunnyUpload()
  const [file, setFile] = useState(null)

  const handleUpload = async () => {
    try {
      const result = await uploadVideo(file, 'My Video', {
        onProgress: ({ progress }) => console.log(`${progress}%`),
        onSuccess: ({ videoId }) => console.log('Done:', videoId),
      })
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? `${progress}%` : 'Upload'}
      </button>
    </>
  )
}
```

## Features

✅ **Multi-GB support** — Upload files up to 5GB+  
✅ **Pause/Resume** — Network interruptions won't restart  
✅ **Automatic retry** — Handles transient failures  
✅ **Progress tracking** — Real-time upload percentage  
✅ **Admin-only** — Requires Clerk ADMIN role  

## Common Tasks

### Get Video ID After Upload
```javascript
const { videoId } = await uploadVideo(file, title)
```

### Pause Upload
```javascript
const { pauseUpload } = useBunnyUpload()
pauseUpload()
```

### Resume Upload
```javascript
const { resumeUpload } = useBunnyUpload()
resumeUpload()
```

### Cancel Upload
```javascript
const { cancelUpload } = useBunnyUpload()
cancelUpload()
```

## Troubleshooting

### "Bunny Stream is not configured"
→ Add API key and library ID to `.env`

### Upload gets stuck
→ Check network in DevTools, click Pause then Resume

### 403 error from Bunny
→ Verify API key is correct in Bunny Dashboard

## Files

- Backend: [src/app/api/admin/upload/video/route.js](src/app/api/admin/upload/video/route.js)
- Frontend: [src/hooks/useBunnyUpload.js](src/hooks/useBunnyUpload.js)
- Documentation: [BUNNY_STREAM_OFFICIAL_TUS.md](BUNNY_STREAM_OFFICIAL_TUS.md)

## What's Changed from Custom TUS?

- ✅ Uses official `tus-js-client` library (proven, maintained)
- ✅ Follows Bunny documentation exactly
- ✅ 10MB chunks (faster than 5MB)
- ✅ Automatic retry with exponential backoff
- ✅ SHA256 signature-based auth (more secure)
- ✅ Same API (pause/resume/progress)

See [MIGRATION_TUS_OFFICIAL.md](MIGRATION_TUS_OFFICIAL.md) for details.
