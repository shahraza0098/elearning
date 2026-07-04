# Bunny Stream TUS Resumable Upload Implementation

## Architecture Overview

This implementation uses **TUS (Tus Resumable Upload Protocol)** for direct frontend-to-Bunny-Stream uploads. This production-grade architecture eliminates Next.js server upload size limitations and avoids buffering large files in server memory.

### How it Works

1. **Admin initiates lesson creation** → selects a video file (100MB–5GB+)
2. **Backend creates video entry** → `/api/admin/upload/video` calls Bunny Stream API to create a video record and returns a TUS upload URL
3. **Frontend uploads directly to Bunny Stream** → uses TUS protocol with 5MB chunks
4. **Admin can pause/resume** → network interruptions don't restart the upload
5. **Upon completion** → video ID is saved to the lesson database record

### Key Benefits

- ✅ **No server-side bottleneck** — Files upload directly from frontend to Bunny Stream
- ✅ **Multi-GB support** — TUS handles chunking and resumable uploads natively
- ✅ **Network resilience** — Pause and resume without re-uploading
- ✅ **Real-time progress** — Admins see upload percentage and can pause/cancel
- ✅ **Security** — Only authenticated admins can create video entries and upload

## File Structure

```
backend/
├── src/
│   ├── lib/
│   │   └── tus-upload.js                    # TUS protocol client
│   ├── hooks/
│   │   └── useBunnyUpload.js               # React hook orchestrating the upload flow
│   └── app/api/admin/upload/
│       └── video/route.js                  # Backend: Create video entry, return TUS URL
└── .env                                      # Bunny Stream credentials
```

## Setup

### 1. Bunny Stream Credentials

Add to `.env`:

```bash
BUNNY_STREAM_API_KEY=your_api_key
BUNNY_STREAM_LIBRARY_ID=your_library_id
# Optional: override default API URL
# BUNNY_STREAM_API_URL=https://api.bunny.net
```

Get these from your [Bunny Dashboard](https://dash.bunny.net/):
- **API Key**: Settings → API Access
- **Library ID**: Video Library → Details

### 2. No Additional Dependencies

TUS client is implemented natively using the Fetch API. No additional npm packages required.

## Usage

### From Admin Panel

1. Navigate to Course → Add Lesson
2. Fill lesson details (title, slug, duration, etc.)
3. **Upload video file** — Supports any video format
4. Watch the progress bar as the video uploads in 5MB chunks
5. **Pause/Resume/Cancel** — Control the upload as needed
6. Click **Create Lesson** after upload completes

### From Code (useBunnyUpload Hook)

```javascript
import useBunnyUpload from '@/hooks/useBunnyUpload'

export function MyComponent() {
  const { uploadVideo, uploading, progress, pauseUpload, resumeUpload, cancelUpload } = useBunnyUpload()

  const handleUpload = async () => {
    try {
      const videoEntry = await uploadVideo(file, 'My Video Title', {
        onProgress: (data) => console.log(`${data.progress}% uploaded`),
        onSuccess: (data) => console.log('Upload complete', data),
        onError: (error) => console.error('Upload failed', error),
      })
      console.log('Video ID:', videoEntry.videoId)
    } catch (error) {
      console.error('Upload error:', error.message)
    }
  }

  return (
    <div>
      <button onClick={handleUpload} disabled={uploading}>
        Upload
      </button>
      {uploading && (
        <div>
          <p>Progress: {progress}%</p>
          <button onClick={pauseUpload}>Pause</button>
          <button onClick={resumeUpload}>Resume</button>
          <button onClick={cancelUpload}>Cancel</button>
        </div>
      )}
    </div>
  )
}
```

## API Reference

### POST `/api/admin/upload/video`

**Request:**
```json
{
  "title": "Introduction to React"
}
```

**Response:**
```json
{
  "message": "Video entry created successfully. Use the provided TUS URL to upload the video file from your client.",
  "data": {
    "videoId": "xyz-abc-123",
    "title": "Introduction to React",
    "tusUploadUrl": "https://video.bunnycdn.com/upload?vid=xyz-abc-123",
    "playbackUrl": "https://iframe.mediadelivery.net/play/xyz-abc-123"
  }
}
```

### useBunnyUpload Hook

**Returns:**
```javascript
{
  uploadVideo,          // (file, title, callbacks?) => Promise<videoEntry>
  uploading,           // boolean
  error,               // string
  progress,            // 0-100 percentage
  setError,            // (message) => void
  pauseUpload,         // () => void
  resumeUpload,        // () => Promise
  cancelUpload,        // () => void
}
```

**Callbacks (optional):**
```javascript
{
  onEntryCreated: ({ videoId, title }) => void,  // Called after video entry created
  onProgress: (progressData) => void,            // Called during chunked upload
  onSuccess: (finalData) => void,               // Called when upload completes
  onError: (error) => void,                     // Called if upload fails
}
```

## TUS Protocol Details

### Upload Flow

1. **Create Video Entry**
   - POST to Bunny API: `https://api.bunny.net/library/{libraryId}/videos`
   - Returns `videoId`

2. **Get TUS Upload URL**
   - URL pattern: `https://video.bunnycdn.com/upload?vid={videoId}`
   - Ready for chunked uploads

3. **Upload Chunks**
   - Method: `PATCH` to TUS URL
   - Headers: `Tus-Resumable: 1.0.0`, `Upload-Offset: {bytes}`
   - Body: 5MB file chunk

4. **Check Offset**
   - Method: `HEAD` to TUS URL
   - Response header: `upload-offset: {bytes}`
   - Allows resuming from last successful chunk

### Chunk Configuration

- **Chunk size**: 5MB (configurable in hook)
- **Retry logic**: Built-in via resumable protocol
- **Timeout**: Configured per fetch (30s default)
- **Parallel uploads**: Not supported (TUS is sequential by design)

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Bunny Stream is not configured" | Missing credentials in `.env` | Add `BUNNY_STREAM_API_KEY` and `BUNNY_STREAM_LIBRARY_ID` |
| "Failed to get TUS upload URL" | Invalid API key or library ID | Verify credentials in Bunny Dashboard |
| "Chunk upload failed" | Network issue or file corruption | Pause, check network, resume |
| "Upload cancelled" | Admin clicked cancel button | File not uploaded; can retry |

### Retry Strategy

The TUS protocol handles retries automatically:
- Each chunk includes an `Upload-Offset` header
- Before uploading, the client checks the server offset
- Only missing chunks are re-uploaded
- No need to restart from the beginning

## Performance Considerations

### Upload Speed

- **Bandwidth dependent**: Typical residential = 5–20 MB/s
- **1GB file** @ 10 MB/s = ~100 seconds
- **5GB file** @ 50 MB/s = ~100 seconds

### Memory Usage

- **Frontend**: Only one 5MB chunk in memory at a time
- **Backend**: No file buffering; only creates video entry
- **Total server memory**: ~1KB per request

### Network Resilience

- **Pause/Resume**: Full support via TUS
- **Connection loss**: Resume from last chunk
- **Multiple tabs**: Each upload is independent

## Bunny Stream Integration

### Video Playback

After upload completes, use the `playbackUrl` to embed the video:

```html
<iframe
  src="https://iframe.mediadelivery.net/play/{videoId}"
  allowFullScreen
  allow="autoplay"
></iframe>
```

### Video Management

Access your videos in the [Bunny Dashboard](https://dash.bunny.net/video):
- View upload status
- Edit metadata (title, description)
- Manage transcoding and quality levels
- Set up analytics

## Testing

### Local Testing

1. Add Bunny credentials to `.env`
2. Start the Next.js dev server: `npm run dev`
3. Navigate to Admin → Course → Add Lesson
4. Select a small video (5–50MB) and upload
5. Watch progress bar and pause/resume controls

### Large File Testing

```bash
# Create a 1GB test file
dd if=/dev/zero of=test-1gb.mp4 bs=1M count=1024

# Upload through admin panel
```

### Network Simulation (Chrome DevTools)

1. Open DevTools → Network tab
2. Set throttling to "Slow 3G" or "Offline"
3. Click Pause during upload
4. Reconnect network
5. Click Resume to continue

## Future Enhancements

- [ ] Retry failed chunks automatically
- [ ] Queue multiple videos for batch upload
- [ ] Estimate upload time based on file size and bandwidth
- [ ] Store upload state (localStorage) for multi-session resume
- [ ] WebRTC P2P uploads for very large files
- [ ] Bunny Stream transcoding status webhooks

## Security Notes

- ✅ **Admin-only**: Only authenticated admins can create video entries
- ✅ **Video ID required**: Frontend cannot upload without a valid Bunny video entry
- ✅ **TUS URL scoped**: Each TUS URL is tied to a specific `videoId`
- ✅ **No credentials leaked**: Admin API key stays on backend only

## References

- [TUS Protocol Specification](https://tus.io/protocols/resumable-upload.html)
- [Bunny Stream API Docs](https://docs.bunny.net/reference/video-library-api)
- [Bunny TUS Upload Endpoint](https://docs.bunny.net/reference/video-upload-tus)
