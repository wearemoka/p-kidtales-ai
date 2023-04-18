/**
 * This use Eden AI
 * API References: https://api.lovo.ai/document/api#Skins
 */

import { NextResponse } from 'next/server'

const API_URL = process.env.LOVO_API_URL || ''
const API_TOKEN = process.env.LOVO_API_TOKEN || ''

export async function GET (request: Request) {
  const header = {
    'Content-Type': 'application/json; charset=utf-8',
    apiKey: API_TOKEN
  }

  try {
    const res = await fetch(`${API_URL}/skins`, {
      method: 'GET',
      headers: header,
      cache: 'no-cache'
    })
    const jsonData = await res.json()

    return NextResponse.json({ res: jsonData })
  } catch (err) {
    return NextResponse.json({ status: 'error', error: 'An internal server error', message: JSON.stringify(err) })
  }
}
