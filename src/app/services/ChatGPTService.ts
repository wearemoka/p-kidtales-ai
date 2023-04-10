
// Some declarations
const uriAPI = 'https://api.openai.com/v1'
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY

const headerOpenAiRequest = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${apiKey}`
}

/**
 * Requests a story to the AI using the about parameter and
 * adds constraints to the story.
 * @param about string, what the story is about
 * @returns promise
 */
export async function getAiHistory (about:string) {
  try {
    const prompt = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Tell me a story about ${about} for a 5 year old child`
        }
      ]
    })

    const res = await fetch(`${uriAPI}/chat/completions`, {
      method: 'POST',
      body: prompt,
      headers: headerOpenAiRequest
    })
    const data = res.json()
    return data
  } catch (err) {
    console.error('catch', err)
  }
}

/**
 * Requests a img from the AI using the about parameter
 * @param about string, what the illustration is about
 * @returns promise
 */
export async function getAiIllustration (about: string) {
  try {
    const prompt = JSON.stringify({
      model: 'image-alpha-001',
      prompt: `Give me an illustration for a 5 year olds of this story about ${about}`,
      n: 1,
      response_format: 'b64_json',
      size: '512x512'
    })

    const res = await fetch(`${uriAPI}/images/generations`, {
      method: 'POST',
      body: prompt,
      headers: headerOpenAiRequest
    })

    const data = res.json()
    return data
  } catch (err) {
    console.error('catch', err)
  }
}

/**
 * Requests a story to the AI using some parameter and
 * adds constraints to the story.
 * @param ageRange the age range, e.g. 5-7
 * @param character a character, e.g. dog
 * @param adventure type of adventure, e.g. fable
 * @param place where the story take place, e.g. farm
 * @param paragraphs number of paragraphs expected
 * @returns promise
 */
export async function getAiStory (ageRange: string, character: string, adventure: string, characterName: string = '', place: string, lesson:string = '', paragraphs: number = 3) {
  try {
    const prompt = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Generate a story about a ${character} whose name should be ${characterName} who embarks on a ${adventure} adventure in ${place}. The story should be appropriate for children ${ageRange} years old. Add a lesson of ${lesson}. The story should have ${paragraphs} paragraphs. Be creative and feel free to add any other details or plot twists that you think would make the story more interesting. Return the story title, content and lesson learnt from the story in 50 words as different parameters`
        }
      ]
    })

    const res = await fetch(`${uriAPI}/chat/completions`, {
      method: 'POST',
      body: prompt,
      headers: headerOpenAiRequest
    })
    const data = res.json()
    return data
  } catch (err) {
    console.error('catch', err)
  }
}

/**
 * Requests a story to the AI using some parameter and
 * adds constraints to the story.
 * @param ageRange the age range, e.g. 5-7
 * @param character a character, e.g. dog
 * @param adventure type of adventure, e.g. fable
 * @param place where the story take place, e.g. farm
 * @param paragraphs number of paragraphs expected
 * @param callback a function to set the streamed response
 */
export async function getAiStoryWithStream (ageRange: string, character: string, adventure: string, characterName: string = '', place: string, lesson: string = '', callback: (result: string) => void, paragraphs: number = 3) {
  try {
    const prompt = JSON.stringify({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'user',
          content: `Generate a story about a ${character} whose name should be ${characterName} who embarks on a ${adventure} adventure in ${place}. The story should be appropriate for children ${ageRange} years old. Add a lesson of ${lesson}. The story should have ${paragraphs} paragraphs. Be creative and feel free to add any other details or plot twists that you think would make the story more interesting. Return the story title, content and lesson learnt from the story in 50 words as different parameters`
        }
      ]
    })

    const res = await fetch(`${uriAPI}/chat/completions`, {
      method: 'POST',
      body: prompt,
      headers: headerOpenAiRequest,
      signal: new AbortController().signal
    })

    const stream = res?.body?.getReader()

    if (!stream) return

    let result = ''
    let jsonResult = null
    let done = false

    do {
      const { value } = await stream.read()

      const v = new TextDecoder().decode(value)
      const lastIndex = v.lastIndexOf('data: {')
      if (lastIndex >= 0) {
        const s = v.substring(lastIndex + 6)
        jsonResult = JSON.parse(s.replace('\n\ndata: [DONE]\n\n', ''))

        done = jsonResult.choices[0].finish_reason === 'stop'
        if (!done) {
          result += jsonResult.choices[0].delta.content
          callback(result)
        }
      }
    } while (!done)
  } catch (err) {
    console.error('catch', err)
  }
}
