function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeTags(tags) {
  if (tags === undefined) return undefined

  if (!Array.isArray(tags)) {
    return { error: 'tags must be an array of strings' }
  }

  const normalized = tags
    .map((tag) => (typeof tag === 'string' ? tag.trim() : tag))
    .filter(Boolean)

  if (normalized.some((tag) => typeof tag !== 'string')) {
    return { error: 'tags must be an array of strings' }
  }

  return { value: [...new Set(normalized)] }
}

export function validateCreateCategoryInput(body) {
  const errors = []

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, errors: ['Request body must be a JSON object'] }
  }

  const data = {}

  if (!isNonEmptyString(body.name)) {
    errors.push('name is required')
  } else {
    data.name = body.name.trim()
  }

  if (!isNonEmptyString(body.slug)) {
    errors.push('slug is required')
  } else {
    data.slug = body.slug.trim().toLowerCase()
  }

  if (!isNonEmptyString(body.bannerUrl)) {
    errors.push('bannerUrl is required')
  } else {
    data.bannerUrl = body.bannerUrl.trim()
  }

  const tagsResult = normalizeTags(body.tags)
  if (tagsResult?.error) {
    errors.push(tagsResult.error)
  } else {
    data.tags = tagsResult?.value ?? []
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  }
}

export function validateUpdateCategoryInput(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, errors: ['Request body must be a JSON object'] }
  }

  const data = {}
  const errors = []

  if ('name' in body) {
    if (!isNonEmptyString(body.name)) {
      errors.push('name must be a non-empty string')
    } else {
      data.name = body.name.trim()
    }
  }

  if ('slug' in body) {
    if (!isNonEmptyString(body.slug)) {
      errors.push('slug must be a non-empty string')
    } else {
      data.slug = body.slug.trim().toLowerCase()
    }
  }

  if ('bannerUrl' in body) {
    if (!isNonEmptyString(body.bannerUrl)) {
      errors.push('bannerUrl must be a non-empty string')
    } else {
      data.bannerUrl = body.bannerUrl.trim()
    }
  }

  if ('tags' in body) {
    const tagsResult = normalizeTags(body.tags)
    if (tagsResult?.error) {
      errors.push(tagsResult.error)
    } else {
      data.tags = tagsResult?.value ?? []
    }
  }

  if (Object.keys(data).length === 0 && errors.length === 0) {
    errors.push('At least one field is required to update category')
  }

  return {
    valid: errors.length === 0,
    errors,
    data,
  }
}
