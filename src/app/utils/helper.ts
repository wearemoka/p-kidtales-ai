const specialCharactersRegex =new RegExp(/[\s~`!@#$%^&*()_+\-={[}\]|\\:;"'<,>.?/]+/g)
export const generateRandomIndex = (data: string[]) => {
    const randomIndex = Math.floor(Math.random() * data.length)
    return data[randomIndex]
}

export const createSlugWithTimeStamp = (title:string) => {
    return title.replaceAll(specialCharactersRegex, '-').toLowerCase() + '-' + Date.now()
}
