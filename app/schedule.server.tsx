'use server'

import type { FormProps } from './form'
import { queue } from '@/lib/upstash/config'

export async function schedule(_: any, formData: FormData): Promise<FormProps> {
  try {
    const tweet_text = formData.get('tweet_text') as string
    const tweet_date = formData.get('tweet_date') as string
    const now = new Date().getTime()
    const delay = new Date(tweet_date).getTime() - now
    await queue.sendMessage({ tweet_text, tweet_date }, delay)
    return { ok: true, tweet_date }
  } catch (e) {
    console.log(e)
    return { ok: false }
  }
}
