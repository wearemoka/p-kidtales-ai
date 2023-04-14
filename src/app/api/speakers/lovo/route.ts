/**
 * This use Eden AI
 * API References: https://api.lovo.ai/document/api#Conversion
 */

import { NextResponse } from 'next/server'

const API_URL = process.env.LOVO_API_URL || ''
const API_TOKEN = process.env.LOVO_API_TOKEN || ''

export async function POST (request: Request) {
  const body = await request.json()

  const header = {
    'Content-Type': 'application/json; charset=utf-8',
    apiKey: API_TOKEN
  }

  try {
    const res = await fetch(`${API_URL}/conversion`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: header
    })

    const buffer = await res.arrayBuffer()
    const blob = new Blob([buffer], { type: 'audio/mpeg' })
    return new Response(blob)
  } catch (err) {
    return NextResponse.json({ status: 'error', error: 'An internal server error' })
  }
}
