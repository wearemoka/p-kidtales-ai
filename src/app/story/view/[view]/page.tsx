'use client'
import { usePathname } from 'next/navigation'
import Style from './View.module.css'
import { useFetchStoryItem } from '@/app/hooks/useFetchStoryItem'
import { createMarkup } from '@/app/utils/helper'
const View = () => {
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string
  const path = usePathname()
  const splitPath = path.split('/')
  const { status, data } = useFetchStoryItem(splitPath[3] as string, fireBaseStoryCollection)
  const { box, description } = Style

  const splitStory = (story:string) => {
    const storyDescription = createMarkup(story)
    return storyDescription?.map((item, index) => {
      const removeTitle = item.split('Title:')[1] ? item.split('Title:')[1] : item
      if (index === 0) {
        return <h2 key={`${index}`}>{removeTitle}</h2>
      } else {
        return <p className={description} key={`${index}`}>{item}</p>
      }
    })
  }
  return (
    <div className={box}>
      {status === 'success'
        ? splitStory(data?.story)
        : 'Loading...'}
    </div>
  )
}
export default View
