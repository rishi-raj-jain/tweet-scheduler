// File: lib/upstash.ts

import { Redis } from '@upstash/redis'
import { Queue } from '@upstash/queue'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL as string,
  token: process.env.UPSTASH_REDIS_REST_TOKEN as string,
})

export const queue = new Queue({
  redis,
  queueName: 'tweets',
  concurrencyLimit: 5,
})
