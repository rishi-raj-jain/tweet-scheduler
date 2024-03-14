import { Redis } from '@upstash/redis'
import { Queue } from '@upstash/queue'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

export const queue = new Queue({
  redis,
  queueName: 'tweets',
  concurrencyLimit: 5,
})
