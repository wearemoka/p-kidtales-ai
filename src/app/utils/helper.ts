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
