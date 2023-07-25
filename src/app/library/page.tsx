'use client'
import { Container, Heading, useMediaQuery } from '@chakra-ui/react'
import Stories from '../components/Library/Library'
import { ages } from '@/app/services/constants/StoryParams'
import LoadingSkeleton from '../components/Library/LoadingSkeleton'
import { useFetchStory } from '@/app/hooks/useFetchStory'

function LibraryPage () {
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string
  const { data, loading } = useFetchStory(fireBaseStoryCollection) // get stories from the repository

  const [isLargerThan990] = useMediaQuery('(min-width: 990px)')

  return (
    <>
      <Container>
        <Heading as='h1' className='heading-small'>
          Popular Stories
        </Heading>
        {ages.map((age:string, item: number) => {
          return (
            <div key={item}>
              {loading && <LoadingSkeleton isGrid={isLargerThan990} />}
              {!loading && <Stories age={age} stories={data} loading={loading} isLargerThan990={isLargerThan990} />}
            </div>
          )
        })}
      </Container>
    </>
  )
}

export default LibraryPage
