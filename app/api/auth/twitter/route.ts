import { NextResponse } from 'next/server'
import { authClient } from '@/lib/twitter/config'

export async function GET() {
  // Obtain an authorization URL from Twitter
  const authUrl = authClient.generateAuthURL({
    state: 'state',
    code_challenge: 'challenge',
    code_challenge_method: 'plain',
  })
  // Return with a 303 as a redirect to the authoriation URL
  return NextResponse.redirect(authUrl, 303)
}
