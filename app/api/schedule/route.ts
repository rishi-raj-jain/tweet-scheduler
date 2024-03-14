import { NextResponse } from 'next/server'
import { queue, redis } from '@/lib/upstash/config'
import { verifySignatureAppRouter } from '@upstash/qstash/dist/nextjs'

interface TweetBody {
  tweet_text?: string
  tweet_date?: number
}

async function tweet(access_token: string, text: string | undefined) {
  if (text) {
    await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ['Bearer', access_token].join(' '),
      },
      body: JSON.stringify({ text }),
    })
  }
}

async function handler() {
  const access_token = await redis.get<string>('twitter_oauth_access_token')
  if (!access_token) return NextResponse.json({}, { status: 403 })
  const tweets = await Promise.all(Array.from({ length: 4 }, () => queue.receiveMessage<TweetBody>()))
  await Promise.all(tweets.map((i) => tweet(access_token, i?.body?.tweet_text)))
  return NextResponse.json({}, { status: 200 })
}

export const POST = verifySignatureAppRouter(handler)
