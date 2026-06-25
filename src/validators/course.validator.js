

const COURSE_LEVELS = new Set(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'])

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeSlug(value) {
  return value.trim().toLowerCase()
}

function normalizePrice(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value.toFixed(2)
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Number(value)

    if (Number.isFinite(parsed)) {
      return parsed.toFixed(2)
    }
  }

  return null
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

function validateLevel(level) {
  return typeof level === 'string' && COURSE_LEVELS.has(level)
}

export function validateCreateCourseInput(body) {
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

  if (!isNonEmptyString(body.description)) {
    errors.push('description is required')
  } else {
    data.description = body.description.trim()
  }

  const position = normalizeInteger(body.position)
  if (position === null || position < 0) {
    errors.push('position must be a non-negative integer')
  } else {
    data.position = position
  }

  if (!isNonEmptyString(body.thumbnailUrl)) {
    errors.push('thumbnailUrl is required')
  } else {
    data.thumbnailUrl = body.thumbnailUrl.trim()
  }

  const price = normalizePrice(body.price)
  if (price === null || Number(price) < 0) {
    errors.push('price must be a valid non-negative number')
  } else {
    data.price = price
  }

  if (!isNonEmptyString(body.categoryId)) {
    errors.push('categoryId is required')
  } else {
    data.categoryId = body.categoryId.trim()
  }

  if ('isPublished' in body) {
    if (typeof body.isPublished !== 'boolean') {
      errors.push('isPublished must be a boolean')
    } else {
      data.isPublished = body.isPublished
    }
  }

  if ('totalDuration' in body && body.totalDuration !== null) {
    const totalDuration = normalizeInteger(body.totalDuration)

    if (totalDuration === null || totalDuration < 0) {
      errors.push('totalDuration must be a non-negative integer')
    } else {
      data.totalDuration = totalDuration
    }
  }

  if ('level' in body) {
    if (!validateLevel(body.level)) {
      errors.push('level must be one of BEGINNER, INTERMEDIATE, or ADVANCED')
    } else {
      data.level = body.level
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  }
}

export function validateUpdateCourseInput(body) {
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

  if ('description' in body) {
    if (!isNonEmptyString(body.description)) {
      errors.push('description must be a non-empty string')
    } else {
      data.description = body.description.trim()
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

  if ('thumbnailUrl' in body) {
    if (!isNonEmptyString(body.thumbnailUrl)) {
      errors.push('thumbnailUrl must be a non-empty string')
    } else {
      data.thumbnailUrl = body.thumbnailUrl.trim()
    }
  }

  if ('price' in body) {
    const price = normalizePrice(body.price)

    if (price === null || Number(price) < 0) {
      errors.push('price must be a valid non-negative number')
    } else {
      data.price = price
    }
  }

  if ('categoryId' in body) {
    if (!isNonEmptyString(body.categoryId)) {
      errors.push('categoryId must be a non-empty string')
    } else {
      data.categoryId = body.categoryId.trim()
    }
  }

  if ('isPublished' in body) {
    if (typeof body.isPublished !== 'boolean') {
      errors.push('isPublished must be a boolean')
    } else {
      data.isPublished = body.isPublished
    }
  }

  if ('totalDuration' in body) {
    if (body.totalDuration === null) {
      data.totalDuration = null
    } else {
      const totalDuration = normalizeInteger(body.totalDuration)

      if (totalDuration === null || totalDuration < 0) {
        errors.push('totalDuration must be a non-negative integer')
      } else {
        data.totalDuration = totalDuration
      }
    }
  }

  if ('level' in body) {
    if (!validateLevel(body.level)) {
      errors.push('level must be one of BEGINNER, INTERMEDIATE, or ADVANCED')
    } else {
      data.level = body.level
    }
  }

  if (Object.keys(data).length === 0 && errors.length === 0) {
    errors.push('At least one field is required to update course')
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  }
}
