'use client'
import { usePathname } from 'next/navigation'
import Style from './View.module.scss'
import { useFetchStoryItem } from '@/app/hooks/useFetchStoryItem'
import { createMarkup } from '@/app/utils/helper'
import DeviceReader from '@/app/components/Speakers/DeviceReader'
import EdenaiReader from '@/app/components/Speakers/EdenaiReader'
import LovoReader from '@/app/components/Speakers/LovoReader'
import { useGlobalContext } from '@/app/context/store'
import { useEffect } from 'react'

const View = () => {
  const { setGlobalStory } = useGlobalContext()
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

  useEffect(() => {
    setGlobalStory(data?.story)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div className={box}>
        {status === 'success'
          ? splitStory(data?.story)
          : 'Loading...'}
      </div>

      <h2>Readers</h2>

      {status === 'success'
        ? (
          <>
            <div>
              <p>This example uses the Reader operating system </p>
              <DeviceReader />
            </div>

            <hr />

            <div>
              <div>
                This example uses a API with AI.
                <br />First Push Load Edenai AI
              </div>
              <EdenaiReader />
            </div>

            <hr />

            <div>
              <div>
                This example uses a API with AI. It has a limit of 500 characters. So you have to pass the text in sections.'
                <br />First Push Load Lovo AI
              </div>
              <LovoReader />
            </div>
          </>
          )
        : 'Loading...'}

    </>
  )
}
export default View
