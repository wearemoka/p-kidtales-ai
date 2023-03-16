
// Some declarations
const uriAPI = 'https://api.openai.com/v1';
const apiKey = process.env.NEXT_PUBLIC_OPENIA_API_KEY;

const headerOpenAiRequest = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
}

/**
 * Requests a story to the AI using the about parameter and
 * adds constraints to the story.
 * @param about string, what the story is about
 * @returns promise
 */
export async function getAiHistory(about:string) {
    try {
        const prompt = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": `Tell me a story about ${about} for a 5 year old child`
                }
            ]
        });

        const res = await fetch(`${uriAPI}/chat/completions`,{
            method: "POST",
            body: prompt,
            headers: headerOpenAiRequest
        });
        const data = res.json();
        return data;
    } catch(err) {
        console.error('catch', err);
    }
}

/**
 * Requests a img from the AI using the about parameter
 * @param about string, what the illustration is about
 * @returns promise
 */
export async function getAiIllustration(about:string) {
    try {
        const prompt = JSON.stringify({
            "prompt": `Give me an illustration for a 5 year olds of this story about  ${about}`,
            "n": 1,
            "size": "512x512"
            });

        const res = await fetch(`${uriAPI}/images/generations`, {
            method: "POST",
            body: prompt,
            headers: headerOpenAiRequest
        });

        const data = res.json();
        return data;
    } catch (err) {
        console.error('catch', err);
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
export async function getAiStory(ageRange: string, character:string, adventure:string, place:string, paragraphs:number = 3) {
    try {
        const prompt = JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "user",
                    "content": `Generate a story about a ${ageRange}-year-old ${character} who embarks on a ${adventure} adventure in ${place}. The story should have ${paragraphs} paragraphs. Be creative and feel free to add any other details or plot twists that you think would make the story more interesting.`
                }
            ]
        });

        const res = await fetch(`${uriAPI}/chat/completions`, {
            method: "POST",
            body: prompt,
            headers: headerOpenAiRequest
        });
        const data = res.json();
        return data;
    } catch (err) {
        console.error('catch', err);
    }
}