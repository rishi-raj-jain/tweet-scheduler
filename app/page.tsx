'use client'

// Scheduling Next.js Action
import { schedule } from './schedule.server'

// Form with Pending Status
import Form from './form'

// Form with access to the server returned data
import { useFormState } from 'react-dom'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function () {
  const [state, formAction] = useFormState(schedule, {})
  const [authenticated, setAuthenticated] = useState<string | boolean>('pending')
  useEffect(() => {
    fetch('/api/auth/twitter/authenticated')
      .then((res) => res.json())
      .then((res) => {
        setAuthenticated(res.ok as boolean)
      })
  }, [])
  return (
    <div className="flex w-[300px] flex-col gap-y-3 p-5">
      {/* Authenticate with Twitter */}
      <Button
        className="w-[280px]"
        onClick={() => {
          if (!authenticated) window.location.href = '/api/auth/twitter'
        }}
        variant={authenticated === 'pending' ? 'outline' : authenticated === true ? 'secondary' : 'destructive'}
      >
        {authenticated === 'pending' ? <>...</> : authenticated ? <>✔️ Authenticated Instance</> : <>1-Time Authentication with Twitter &rarr;</>}
      </Button>
      <form id="schedule_form" action={formAction} className="flex w-[300px] flex-col gap-y-3">
        <Form {...state} />
      </form>
    </div>
  )
}
