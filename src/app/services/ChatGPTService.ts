import { NextResponse } from 'next/server'

/**
 * Requests a story to the AI using internal API
 * @param ageRange the age range, e.g. 5-7
 * @param character a character, e.g. dog
 * @param characterName the name of character
 * @param place where the story take place, e.g. farm
 * @param lesson a lesson for the story, e.g. friendship
 * @returns promise
 */
export async function getAiStory (ageRange: string, character: string, characterName: string = '', place: string, lesson: string = '') {
  const response = await fetch('/api/story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
    body: JSON.stringify({ ageRange, character, characterName, place, lesson })
  })

  console.log('service response', response)
  if (response.status >= 500) {
    return NextResponse.json({ status: 'error', error: 'Internal server error' }, { status: response.status })
  }

  const jsonResponse = await response.json()
  return jsonResponse
}

/**
 * This function requests a IA to moderate a string
 * @param value string to moderate
 */
export async function moderateStringWithAI (value: string) {
  const response = await fetch('/api/moderate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store',
    body: JSON.stringify({ value })
  })
  const jsonResponse = await response.json()
  return jsonResponse
}
