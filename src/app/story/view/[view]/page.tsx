'use client'
import { usePathname } from 'next/navigation'
import { useFetchStoryItem } from '@/app/hooks/useFetchStoryItem'
import { useGlobalContext } from '@/app/context/store'
import { useEffect } from 'react'
import { StoryPagination } from '@/app/components/StoryPagination/StoryPagination'
import SelectSpeaker from '@/app/components/Speakers/SelectSpeaker'
import style from './View.module.scss'

const View = () => {
  const { setGlobalStory } = useGlobalContext()
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string
  const path = usePathname()
  const splitPath = path.split('/')
  const { status, data } = useFetchStoryItem(splitPath[3] as string, fireBaseStoryCollection)

  useEffect(() => {
    setGlobalStory(data?.story)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      <div className={style.box}>
        {(status === 'success')
          ? <StoryPagination />
          : 'Loading...'}
      </div>

      <h2>Readers</h2>

      {status === 'success'
        ? (
          <SelectSpeaker />
          )
        : 'Loading...'}

    </>
  )
}
export default View
