/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useFetchStory } from '@/app/hooks/useFetchStory'
import { usePathname } from 'next/navigation'
import Style from './read.module.css'

const Read = () => {
  const documentPath = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string
  const { data } = useFetchStory(documentPath)
  const path = usePathname()
  const splitPath = path.split('/')
  const storyItem = data?.find((item) => item.slug === splitPath[3])
  const { box } = Style

  function createMarkup () {
    const splitAnswer = data?.[0]?.story?.split('\n').filter((text: string) => text !== '')
    return splitAnswer.map((text: string, index: number) => <p key={`${index}`} className={Style.description}>{text}</p>)
  }

  return (
    <div className={box}>
      {storyItem
        ? (
          <div>
            <h2>Title :: {storyItem?.title}</h2>{createMarkup()}
            <div className={Style.extraInformation}>
              <span>Prompt : {storyItem?.prompt.map((prompt: string, index: number) => {
                return <span key={`${index}`} className={Style.prompt}>{prompt}</span>
              })}
              </span>
            </div>
          </div>)
        : 'Loading...'}
    </div>
  )
}
export default Read
