import { NextResponse } from 'next/server'
import { redis } from '@/lib/upstash/config'
import { authClient } from '@/lib/twitter/config'

export async function GET(request: Request) {
  // Look for the callback URL to contain code
  const code = new URL(request.url).searchParams.get('code')
  // If no code query param found, return 403
  if (!code) return NextResponse.json({}, { status: 403 })
  // If code query param found, create another authorization URL to update internal code_verifier
  authClient.generateAuthURL({
    state: 'state',
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
  })
  // Obtain the access_token to use it for making requests in the future
  const {
    token: { access_token },
  } = await authClient.requestAccessToken(code)
  // Save the access_token in Upstash
  await redis.set('twitter_oauth_access_token', access_token)
  // Return with a succesful response code
  return NextResponse.json({}, { status: 200 })
}
