/**
 * This use Eden AI
 * API References: https://docs.edenai.co/reference/audio_text_to_speech_create
 * Dashboard: https://app.edenai.run/admin/account/settings
 */

import { NextResponse } from 'next/server'

const API_URL = process.env.EDENAI_API_URL || ''
const API_TOKEN = process.env.EDENAI_API_TOKEN || ''

export async function POST (request: Request) {
  const body = await request.json()

  const header = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${API_TOKEN}`
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: header,
      cache: 'no-cache'
    })
    const jsonData = await res.json()

    return NextResponse.json({ res: jsonData })
  } catch (err) {
    return NextResponse.json({ status: 'error', error: 'An internal server error' })
  }
}
