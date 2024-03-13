'use client'

// Scheduling Next.js Action
import { schedule } from './schedule.server'

// Form with Pending Status
import Form from './form'

// Form with access to the server returned data
import { useFormState } from 'react-dom'

export default function () {
  const [state, formAction] = useFormState(schedule, {})
  return (
    <form id="schedule_form" action={formAction} className="flex w-[300px] flex-col gap-y-3 p-5">
      <Form {...state} />
    </form>
  )
}
