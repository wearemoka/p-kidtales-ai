import { characterOpts, lessonOpts, namesOpts, PROMPT_STEPS, scenarioOpts } from './constants'
import { IUserPromptSelection } from './interfaces'

const specialCharactersRegex = /[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g
export const generateRandomIndex = (data: string[]) => {
  const randomIndex = Math.floor(Math.random() * data.length)
  return data[randomIndex]
}

export const createSlugWithTimeStamp = (title:string) => {
  return title.replaceAll(specialCharactersRegex, '-').toLowerCase() + '-' + Date.now()
}

export const getStoryTitle = (message: string) => {
  const splitAnswer = message?.split('\n')?.filter((text) => text !== '')
  return splitAnswer[0]?.split('Title:')[1]?.trim()
}

/**
 * Get a random value from the array
 * @param data array of values
 * @param props property of the value to return
 */
export const getRandomValue = (data: any[], props: string): string => {
  const randomIndex = Math.floor(Math.random() * data.length)
  const value = data[randomIndex]
  return value[props]
}

/**
 * Generate a Random Prompt for all values
 */
export const getRandomUserPrompt = (age: string): IUserPromptSelection => {
  const character = getRandomValue(characterOpts, 'label')
  const name = getRandomValue(namesOpts, 'label')
  const lesson = getRandomValue(lessonOpts, 'label')
  const scenario = getRandomValue(scenarioOpts, 'label')

  const randomStory: IUserPromptSelection = {
    step: PROMPT_STEPS.GENERATION,
    age,
    character,
    name,
    scenario,
    lesson
  }

  return randomStory
}

/**
 * Split the story and clean empty lines
 */
export const paginateStory = (story: string): string[] => {
  return story.split('\n\n').filter((value: string) => value !== '')
}
