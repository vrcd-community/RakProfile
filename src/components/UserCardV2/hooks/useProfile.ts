import { useFetch } from '@/utils/useFetch'
import { useEffect, useState } from 'react'

interface Claims {
  sub: string
  name: string
  picture: string
  bio: string
}

interface User {
  isAuthenticated: boolean
  admin: boolean
  censor?: {
    pass: boolean,
    message: string
  }
}

export const useProfile = (uid: string) => {
  const [claims, setClaims] = useState<Claims>()
  const [user, setUser] = useState<User>()

  const { loading, data, error } = useFetch<{ data: { user: User, claims: Claims } }>(`/api/user/profile/${uid}`)

  useEffect(() => {
    if (data) {
      const user = data.data.user;
      const claims = data.data.claims;
    
      setUser(user)
      setClaims(claims)
    }
  }, [data])

  return {
    loading,
    claims,
    user,
    error
  }
}