import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

import SectionsPageClient from './_components/SectionsPageClient'

async function getRequestBaseUrl() {
  const headerStore = await headers()
  const host = headerStore.get('x-forwarded-host') ?? headerStore.get('host')
  const protocol =
    headerStore.get('x-forwarded-proto') ??
    (host?.includes('localhost') ? 'http' : 'https')

  if (!host) {
    throw new Error('Unable to resolve request host.')
  }

  return {
    baseUrl: `${protocol}://${host}`,
    cookie: headerStore.get('cookie') ?? '',
  }
}

async function getCourse(courseId) {
  const { baseUrl, cookie } = await getRequestBaseUrl()
  const response = await fetch(`${baseUrl}/api/admin/course/${courseId}`, {
    cache: 'no-store',
    headers: {
      cookie,
    },
  })

  if (response.status === 404) {
    notFound()
  }

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.message || 'Failed to load course')
  }

  const payload = await response.json()
  return payload.data
}

async function getSections(courseId) {
  const { baseUrl, cookie } = await getRequestBaseUrl()
  const response = await fetch(
    `${baseUrl}/api/admin/section?courseId=${encodeURIComponent(courseId)}`,
    {
      cache: 'no-store',
      headers: {
        cookie,
      },
    }
  )

  if (!response.ok) {
    const payload = await response.json().catch(() => null)
    throw new Error(payload?.message || 'Failed to load sections')
  }

  const payload = await response.json()
  return payload.data ?? []
}

export default async function CourseSectionsPage({ params }) {
  const { courseId } = await params
  const [course, sections] = await Promise.all([
    getCourse(courseId),
    getSections(courseId),
  ])

  return (
    <SectionsPageClient
      course={course}
      initialSections={sections}
    />
  )
}
