// File: app/api/auth/twitter/authenticated/route.ts

import { NextResponse } from 'next/server'
import { redis } from '@/lib/upstash'

export async function GET() {
  const access_token = await redis.get<string>('twitter_oauth_access_token')
  if (!access_token) return NextResponse.json({ ok: false }, { status: 200 })
  return NextResponse.json({ ok: true }, { status: 200 })
}
