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

export function validateCreateSectionInput(body) {
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

  const position = normalizeInteger(body.position)
  if (position === null || position < 0) {
    errors.push('position must be a non-negative integer')
  } else {
    data.position = position
  }

  if (!isNonEmptyString(body.courseId)) {
    errors.push('courseId is required')
  } else {
    data.courseId = body.courseId.trim()
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  }
}

export function validateUpdateSectionInput(body) {
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

  if ('position' in body) {
    const position = normalizeInteger(body.position)

    if (position === null || position < 0) {
      errors.push('position must be a non-negative integer')
    } else {
      data.position = position
    }
  }

  if ('courseId' in body) {
    if (!isNonEmptyString(body.courseId)) {
      errors.push('courseId must be a non-empty string')
    } else {
      data.courseId = body.courseId.trim()
    }
  }

  if (Object.keys(data).length === 0 && errors.length === 0) {
    errors.push('At least one field is required to update section')
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  }
}
