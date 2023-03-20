'use client'
import { useCreateStory } from '@/app/hooks/useCreateStory'
import { useRouter } from 'next/navigation'
import Form, { StoryFormState } from '../components/Story/Form/Form'

const AddStory = () => {
  let message
  const [createStory, createStoryState] = useCreateStory()
  const router = useRouter()

  const handlerSubmit = async (value:StoryFormState) => {
    createStory(value)
    router.push('/story/list')
  }
  if (createStoryState === 'error') {
    message = <p>Ops, we couldnt create this story</p>
  }

  if (createStoryState === 'loading') {
    message = <p>Creating your story. Please Wait....</p>
  }

  if (createStoryState === 'success') {
    // eslint-disable-next-line no-unused-vars
    message = <p>Yay! It worked.</p>
  }

  return (
    <Form onSubmit={handlerSubmit} selectedItemDescription='' selectedItemTitle='' />
  )
}

export default AddStory
