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

export const createMarkup = (story: string) => {
  const splitAnswer = story.split('\n').filter((text) => text !== '')
  return splitAnswer
}

export const getRandomValue = (data: any[], props: string): string => {
  const randomIndex = Math.floor(Math.random() * data.length)
  const value = data[randomIndex]
  return value[props]
}

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

// Return the next step to be completed
export const checkPromptIsComplete = (prompt: IUserPromptSelection) => {
  const { character, name, scenario, lesson } = prompt

  if (!character) return PROMPT_STEPS.CHARACTER
  if (!name) return PROMPT_STEPS.NAME
  if (!scenario) return PROMPT_STEPS.SCENARIO
  if (!lesson) return PROMPT_STEPS.LESSON

  return null
}
