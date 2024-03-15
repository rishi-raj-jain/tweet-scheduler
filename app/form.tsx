// File: app/form.tsx

'use client'

// UI Imports
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { useToast } from '@/components/ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Form Status hook
import { useFormStatus } from 'react-dom'
import { useEffect, useState } from 'react'

// Define Form Props
export interface FormProps {
  ok?: boolean
  tweet_date?: string
}

export default function ({ ok, tweet_date }: FormProps) {
  const { toast } = useToast()
  // Use React's useFormStatus hook to detect form submission state
  const { pending } = useFormStatus()

  useEffect(() => {
    // If the form is not pending
    if (!pending) {
      // If the server ok-ed the query, reset the form
      if (ok) {
        const scheduleForm = document.getElementById('schedule_form') as HTMLFormElement
        if (scheduleForm) scheduleForm.reset()
        // Display that scheduling was succesful
        toast({
          title: 'Scheduled Tweet',
          description: tweet_date,
        })
      } else {
        // Display that scheduling failed
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        })
      }
    }
  }, [pending])

  // Listen to the date picker changes
  const [date, setDate] = useState<Date>()

  return (
    <>
      <span className="font-semibold">Tweet Scheduler</span>
      {/* Date Picker for Scheduling Tweet on future dates */}
      <input id="tweet_date" name="tweet_date" className="hidden" value={date?.toString()} />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
      {/* Text Area for Entering Text of Tweet */}
      <Textarea id="tweet_text" name="tweet_text" className="min-h-[300px] w-[280px]" placeholder="Tweet" />
      {/* Schedule Button Tweet */}
      <Button disabled={pending} className="w-[280px]">
        {pending ? 'Scheduling...' : <>Schedule &rarr;</>}
      </Button>
    </>
  )
}
