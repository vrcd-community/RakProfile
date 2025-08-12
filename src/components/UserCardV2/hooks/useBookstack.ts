import { useFetch } from '@/utils/useFetch'
import { useEffect, useState } from 'react'

export interface Statistics {
  owned_books: number,
  edited_books: number,
  owned_pages: number,
  edited_pages: number,
  chars: {
    owned_pages: number,
    edited_pages: number,
    total: number
  }
}

export interface BookItem {
  title: string,
  description: string,
  last_update: string,
  cover?: string,
  url: string
}

interface books {
  owned: BookItem[],
  edited: BookItem[]
}

export interface PageItem {
  title: string,
  last_update: string,
  url: string
}

interface pages {
  owned: PageItem[],
  edited: PageItem[]
}

export interface BookStack {
  statistics: Statistics,
  books: books,
  pages: pages
}

export const useBookstack = (uid: string) => {
  const [bookStackError, setBookStackError] = useState<string | undefined>(undefined)

  const { loading, data, error } = useFetch<{ data: BookStack, error?: string }>(`/api/user/${uid}/bookstack`)

  useEffect(() => {
    if (data) {
      if (data.error) {
        setBookStackError(data.error)
      }
    }
  }, [data])

  return {
    loading,
    bookstack: data?.data ?? null,
    error: bookStackError ?? error?.message
  }
}