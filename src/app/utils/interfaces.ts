/**
 * All interfaces that are used in more than one place will be concentrated here.
 *
 */

export interface IUserPromptSelection {
    step: number,
    age: string,
    character: string,
    name: string,
    scenario: string,
    lesson: string,
}

export interface IOptions {
    label: string,
    imgPath?: string,
    alt?: string
}
