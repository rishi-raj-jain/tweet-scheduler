'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function () {
  const state: { [k: string]: { message: string; variant: 'outline' | 'secondary' | 'destructive' } } = {
    pending: {
      message: '...',
      variant: 'outline',
    },
    true: {
      message: '✔️ Authenticated Instance',
      variant: 'secondary',
    },
    false: {
      message: '1-Time Authentication with Twitter &rarr;',
      variant: 'destructive',
    },
  }

  const [authenticated, setAuthenticated] = useState<string | boolean>('pending')
  useEffect(() => {
    fetch('/api/auth/twitter/authenticated')
      .then((res) => res.json())
      .then((res) => {
        setAuthenticated(res.ok as boolean)
      })
  }, [])

  {
    /* Authenticate with Twitter */
  }
  return (
    <Button
      className="w-[280px]"
      onClick={() => {
        if (!authenticated) window.location.href = '/api/auth/twitter'
      }}
      variant={state[authenticated.toString()].variant}
    >
      {state[authenticated.toString()].message}
    </Button>
  )
}
