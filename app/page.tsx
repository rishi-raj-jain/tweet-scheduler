// File: app/page.tsx

'use client'

// Form with Pending Status
import Form from './form'

// Form with access to the server returned data
import { useFormState } from 'react-dom'

// Scheduling Next.js Action
import Twitter from '@/components/twitter'
import { schedule } from './schedule.server'

export default function () {
  const [state, formAction] = useFormState(schedule, {})
  return (
    <div className="flex w-[300px] flex-col gap-y-3 p-5">
      <Twitter />
      <form id="schedule_form" action={formAction} className="flex w-[300px] flex-col gap-y-3">
        <Form {...state} />
      </form>
    </div>
  )
}
