function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeInteger(value) {
  if (typeof value === 'number' && Number.isInteger(value)) {
    return value
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value)

    if (Number.isInteger(parsed)) {
      return parsed
    }
  }

  return null
}

function normalizeSlug(value) {
  return value.trim().toLowerCase()
}

export function validateCreateLessonInput(body) {
  const errors = []

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, errors: ['Request body must be a JSON object'] }
  }

  const data = {}

  if (!isNonEmptyString(body.title)) {
    errors.push('title is required')
  } else {
    data.title = body.title.trim()
  }

  if (!isNonEmptyString(body.slug)) {
    errors.push('slug is required')
  } else {
    data.slug = normalizeSlug(body.slug)
  }

  const position = normalizeInteger(body.position)
  if (position === null || position < 0) {
    errors.push('position must be a non-negative integer')
  } else {
    data.position = position
  }

  const duration = normalizeInteger(body.duration)
  if (duration === null || duration < 0) {
    errors.push('duration must be a non-negative integer')
  } else {
    data.duration = duration
  }

  if (!isNonEmptyString(body.videoId)) {
    errors.push('videoId is required')
  } else {
    data.videoId = body.videoId.trim()
  }

  if (!isNonEmptyString(body.sectionId)) {
    errors.push('sectionId is required')
  } else {
    data.sectionId = body.sectionId.trim()
  }

  if ('description' in body && body.description !== null) {
    if (!isNonEmptyString(body.description)) {
      errors.push('description must be a non-empty string')
    } else {
      data.description = body.description.trim()
    }
  }

  if ('thumbnailUrl' in body && body.thumbnailUrl !== null) {
    if (!isNonEmptyString(body.thumbnailUrl)) {
      errors.push('thumbnailUrl must be a non-empty string')
    } else {
      data.thumbnailUrl = body.thumbnailUrl.trim()
    }
  }

  if ('isPreview' in body) {
    if (typeof body.isPreview !== 'boolean') {
      errors.push('isPreview must be a boolean')
    } else {
      data.isPreview = body.isPreview
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  }
}

export function validateUpdateLessonInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, errors: ['Request body must be a JSON object'] }
  }

  const data = {}
  const errors = []

  if ('title' in body) {
    if (!isNonEmptyString(body.title)) {
      errors.push('title must be a non-empty string')
    } else {
      data.title = body.title.trim()
    }
  }

  if ('slug' in body) {
    if (!isNonEmptyString(body.slug)) {
      errors.push('slug must be a non-empty string')
    } else {
      data.slug = normalizeSlug(body.slug)
    }
  }

  if ('position' in body) {
    const position = normalizeInteger(body.position)

    if (position === null || position < 0) {
      errors.push('position must be a non-negative integer')
    } else {
      data.position = position
    }
  }

  if ('duration' in body) {
    const duration = normalizeInteger(body.duration)

    if (duration === null || duration < 0) {
      errors.push('duration must be a non-negative integer')
    } else {
      data.duration = duration
    }
  }

  if ('videoId' in body) {
    if (!isNonEmptyString(body.videoId)) {
      errors.push('videoId must be a non-empty string')
    } else {
      data.videoId = body.videoId.trim()
    }
  }

  if ('sectionId' in body) {
    if (!isNonEmptyString(body.sectionId)) {
      errors.push('sectionId must be a non-empty string')
    } else {
      data.sectionId = body.sectionId.trim()
    }
  }

  if ('description' in body) {
    if (body.description === null) {
      data.description = null
    } else if (!isNonEmptyString(body.description)) {
      errors.push('description must be a non-empty string')
    } else {
      data.description = body.description.trim()
    }
  }

  if ('thumbnailUrl' in body) {
    if (body.thumbnailUrl === null) {
      data.thumbnailUrl = null
    } else if (!isNonEmptyString(body.thumbnailUrl)) {
      errors.push('thumbnailUrl must be a non-empty string')
    } else {
      data.thumbnailUrl = body.thumbnailUrl.trim()
    }
  }

  if ('isPreview' in body) {
    if (typeof body.isPreview !== 'boolean') {
      errors.push('isPreview must be a boolean')
    } else {
      data.isPreview = body.isPreview
    }
  }

  if (Object.keys(data).length === 0 && errors.length === 0) {
    errors.push('At least one field is required to update lesson')
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  }
}
