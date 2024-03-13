import { auth } from 'twitter-api-sdk'

export const authClient = new auth.OAuth2User({
  client_id: process.env.TWITTER_CLIENT_ID,
  callback: process.env.TWITTER_AUTH_CALLBACK_URL,
  client_secret: process.env.TWITTER_CLIENT_SECRET,
  scopes: ['tweet.write', 'tweet.read', 'offline.access', 'users.read'],
})
