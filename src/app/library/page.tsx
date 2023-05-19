'use client'
import { Container, Heading } from '@chakra-ui/react'
import Stories from '../components/Library/Library'
import { ages } from '@/app/services/constants/StoryParams'

function LibraryPage () {
  return (
    <>
      <Container>
        <Heading as='h1' className='heading-small'>Popular Stories</Heading>

        {ages.map((age:string, item: number) => {
          return (
            <Stories age={age} key={item} />
          )
        })}
      </Container>
    </>
  )
}

export default LibraryPage
