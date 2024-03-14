import { auth } from 'twitter-api-sdk'

export const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID as string,
  callback: process.env.TWITTER_AUTH_CALLBACK_URL as string,
  client_secret: process.env.TWITTER_CLIENT_SECRET as string,
  scopes: ['tweet.write', 'tweet.read', 'offline.access', 'users.read'],
})
