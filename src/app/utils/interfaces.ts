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

interface storyFirebaseInterface {
    id: string,
    prompt: any;
    slug: string;
    story: string;
    title: string;
}

export interface IStoryStore {
    story: storyFirebaseInterface,
    storyPaged: string[],
    currentPage: number
}
export interface IOptions {
    label: string,
    imgPath?: string,
    alt?: string
}
