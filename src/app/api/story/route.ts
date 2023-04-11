import { NextResponse } from 'next/server'

// Some declarations
const URI_API = 'https://api.openai.com/v1'
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const MODEL_COMPLETIONS = process.env.NEXT_PUBLIC_MODEL_COMPLETIONS || 'gpt-3.5-turbo'

/**
 * General prompt for the API Requests
 * Return a string
 */
const getPrompt = (character: string, characterName: string, adventure: string, place: string, ageRange: string, lesson: string, paragraphs: number) => {
  return `Generate a story about a ${character} whose name should be ${characterName} who embarks on a ${adventure} adventure in ${place}. The story should be appropriate for children ${ageRange} years old. Add a lesson of ${lesson}. The story should have ${paragraphs} paragraphs. Be creative and feel free to add any other details or plot twists that you think would make the story more interesting. Return the story title, content and lesson learnt from the story in 50 words as different parameters`
}

const headerOpenAiRequest = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`
}

export async function POST (request: Request) {
  const { ageRange, character, adventure, characterName, place, lesson, paragraphs } = await request.json()

  try {
    const prompt = JSON.stringify({
      model: MODEL_COMPLETIONS,
      messages: [
        {
          role: 'user',
          content: getPrompt(character, characterName, adventure, place, ageRange, lesson, paragraphs)
        }
      ]
    })

    const res = await fetch(`${URI_API}/chat/completions`, {
      method: 'POST',
      body: prompt,
      headers: headerOpenAiRequest
    })

    const jsonData = await res.json()

    return NextResponse.json({ res: jsonData.choices[0].message.content })
  } catch (err) {
    return NextResponse.json({ error: 'An internal server error' })
  }
}
