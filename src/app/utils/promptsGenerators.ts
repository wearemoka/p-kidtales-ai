
const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY
const MODEL_COMPLETIONS = process.env.NEXT_PUBLIC_MODEL_COMPLETIONS || 'gpt-3.5-turbo'
const MODEL_IMAGE_GENERATION = process.env.NEXT_PUBLIC_MODEL_IMAGE_GENERATION || 'image-alpha-001'

export const headerOpenAiRequest = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`
}

const getPrompt = (character: string, characterName: string, adventure: string, place: string, ageRange: string, lesson: string, paragraphs: number) => {
  return `Generate a story about a ${character} whose name should be ${characterName} who embarks on a ${adventure} adventure in ${place}. The story should be appropriate for children ${ageRange} years old. Add a lesson of ${lesson}. The story should have ${paragraphs} paragraphs. Be creative and feel free to add any other details or plot twists that you think would make the story more interesting. Return the story title, content and lesson learnt from the story in 50 words as different parameters`
}

export function getStoryPrompt (character: string, characterName: string, adventure: string, place: string, ageRange: string, lesson: string, paragraphs: number, streamed: boolean = false) {
  const prompt = JSON.stringify({
    model: MODEL_COMPLETIONS,
    stream: streamed,
    messages: [
      {
        role: 'user',
        content: getPrompt(character, characterName, adventure, place, ageRange, lesson, paragraphs)
      }
    ]
  })

  return prompt
}

export function getStoryIllustrationPrompt (about:string) {
  const prompt = JSON.stringify({
    model: MODEL_IMAGE_GENERATION,
    prompt: `Give me an illustration for a 5 year olds of this story about ${about}`,
    n: 1,
    response_format: 'b64_json',
    size: '512x512'
  })

  return prompt
}
