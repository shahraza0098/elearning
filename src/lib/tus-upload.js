// /**
//  * TUS Resumable Upload Client
//  * Handles chunked, resumable uploads directly to Bunny Stream using the TUS protocol.
//  * Supports pause/resume, progress tracking, and large file uploads (multi-GB).
//  */

// const DEFAULT_CHUNK_SIZE = 5 * 1024 * 1024 // 5MB chunks

// export class TUSUploadClient {
//   constructor(options = {}) {
//     this.chunkSize = options.chunkSize || DEFAULT_CHUNK_SIZE
//     this.onProgress = options.onProgress || (() => {})
//     this.onError = options.onError || (() => {})
//     this.onSuccess = options.onSuccess || (() => {})
//     this.uploadUrl = options.uploadUrl
//     this.file = options.file
//     this.signal = options.signal // AbortSignal for cancellation
//     this.uploadedBytes = 0
//     this.isPaused = false
//   }

//   /**
//    * Start or resume the upload
//    */
//   async upload() {
//     if (!this.uploadUrl || !this.file) {
//       throw new Error('uploadUrl and file are required')
//     }

//     try {
//       // Get the current upload offset from the server
//       const offset = await this._getUploadOffset()
//       this.uploadedBytes = offset

//       // Upload chunks starting from the offset
//       while (this.uploadedBytes < this.file.size) {
//         if (this.isPaused) {
//           break
//         }

//         if (this.signal?.aborted) {
//           throw new Error('Upload cancelled')
//         }

//         const chunk = this._getChunk()
//         if (chunk.byteLength === 0) {
//           break
//         }

//         await this._uploadChunk(chunk)

//         // Notify progress
//         this.onProgress({
//           loaded: this.uploadedBytes,
//           total: this.file.size,
//           progress: (this.uploadedBytes / this.file.size) * 100,
//         })
//       }

//       if (!this.isPaused) {
//         this.onSuccess({
//           loaded: this.file.size,
//           total: this.file.size,
//           progress: 100,
//         })
//       }
//     } catch (error) {
//       this.onError(error)
//       throw error
//     }
//   }

//   /**
//    * Pause the upload (can be resumed later)
//    */
//   pause() {
//     this.isPaused = true
//   }

//   /**
//    * Resume the upload from where it was paused
//    */
//   resume() {
//     this.isPaused = false
//     return this.upload()
//   }

//   /**
//    * Get the current upload offset from the server
//    */
//   async _getUploadOffset() {
//     try {
//       const response = await fetch(this.uploadUrl, {
//         method: 'HEAD',
//         headers: this._getHeaders(),
//         signal: this.signal,
//       })

//       const uploadOffset = response.headers.get('upload-offset')
//       return uploadOffset ? parseInt(uploadOffset, 10) : 0
//     } catch (error) {
//       // If HEAD fails, assume offset is 0
//       console.warn('Failed to get upload offset:', error.message)
//       return 0
//     }
//   }

//   /**
//    * Extract the next chunk from the file
//    */
//   _getChunk() {
//     const start = this.uploadedBytes
//     const end = Math.min(start + this.chunkSize, this.file.size)
//     return this.file.slice(start, end)
//   }

//   /**
//    * Upload a single chunk
//    */
//   async _uploadChunk(chunk) {
//     const response = await fetch(this.uploadUrl, {
//       method: 'PATCH',
//       headers: this._getHeaders(chunk.size),
//       body: chunk,
//       signal: this.signal,
//     })

//     if (!response.ok) {
//       const text = await response.text().catch(() => 'Unknown error')
//       throw new Error(
//         `Chunk upload failed: ${response.status} ${response.statusText}. ${text}`
//       )
//     }

//     const uploadOffset = response.headers.get('upload-offset')
//     if (uploadOffset) {
//       this.uploadedBytes = parseInt(uploadOffset, 10)
//     } else {
//       this.uploadedBytes += chunk.size
//     }
//   }

//   /**
//    * Build TUS protocol headers
//    */
//   _getHeaders(contentLength = 0) {
//     const headers = {
//       'Tus-Resumable': '1.0.0',
//       'Upload-Offset': String(this.uploadedBytes),
//       'Content-Type': 'application/offset+octet-stream',
//     }

//     if (contentLength > 0) {
//       headers['Content-Length'] = String(contentLength)
//     }

//     return headers
//   }
// }

// /**
//  * Create a TUS upload client instance
//  */
// export function createTUSUpload(options) {
//   return new TUSUploadClient(options)
// }



//chatgpt new code:


import * as tus from "tus-js-client";

export async function uploadToBunny(file, onProgress) {
  // Get credentials
  const response = await fetch("/api/admin/upload/video", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: file.name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create Bunny video");
  }

  const credentials = await response.json();

  return new Promise(async (resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint: "https://video.bunnycdn.com/tusupload",

      retryDelays: [0, 3000, 5000, 10000, 20000],

      headers: {
        AuthorizationSignature: credentials.signature,
        AuthorizationExpire: credentials.expirationTime,
        LibraryId: credentials.libraryId,
        VideoId: credentials.videoId,
      },

      metadata: {
        filetype: file.type,
        title: file.name,
      },

      onProgress(bytesUploaded, bytesTotal) {
        const percent = Math.round(
          (bytesUploaded / bytesTotal) * 100
        );

        onProgress(percent);
      },

      onSuccess() {
        resolve(credentials);
      },

      onError(error) {
        reject(error);
      },
    });

    const previousUploads = await upload.findPreviousUploads();

    if (previousUploads.length) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }

    upload.start();
  });
}