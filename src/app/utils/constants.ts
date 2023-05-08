
/**
 * These messages will be displayed when making requests to the server
 */
export const LoadingMessages = [
  'Adding some magic...',
  'Training young wizards...',
  'Creating your character...'
]

export const characterOpts = [
  { label: 'Giraffe', imgPath: '/images/characters/giraffe.png', alt: 'Giraffe' },
  { label: 'Whale', imgPath: '/images/characters/whale.png', alt: 'Whale' },
  { label: 'Dog', imgPath: '/images/characters/dog.png', alt: 'Dog' },
  { label: 'Rabbit', imgPath: '/images/characters/rabbit.png', alt: 'Rabbit' }
]

export const scenarioOpts = [
  { label: 'Ocean', imgPath: '/images/scenarios/ocean.png', alt: 'Ocean' },
  { label: 'Jungle', imgPath: '/images/scenarios/jungle.png', alt: 'Jungle' },
  { label: 'Castle', imgPath: '/images/scenarios/castle.png', alt: 'Castle' },
  { label: 'Moon', imgPath: '/images/scenarios/moon.png', alt: 'Moon' }
]

export const lessonOpts = [
  { label: 'Friendship' },
  { label: 'Family' },
  { label: 'Inclusivity' },
  { label: 'Respect' }
]

export const namesOpts = [
  { label: 'Alice' },
  { label: 'Molly' },
  { label: 'Bella' },
  { label: 'Max' },
  { label: 'Oliver' },
  { label: 'Leo' }
]

export const PROMPT_STEPS = {
  CHARACTER: 1,
  NAME: 2,
  SCENARIO: 3,
  LESSON: 4,
  GENERATION: 5
}
