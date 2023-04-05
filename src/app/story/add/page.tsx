'use client'
import Form, { StoryFormState } from '@/app/components/Story/Form/Form'
import { useCreateStory } from '@/app/hooks/useCreateStory'
import { useRouter } from 'next/navigation'

const AddStory = () => {
  const [createStory] = useCreateStory()
  const router = useRouter()

  const handlerSubmit = async (value:StoryFormState) => {
    createStory(value)
    router.push('/story/list')
  }

  return (
    <Form onSubmit={handlerSubmit} selectedItemDescription='' selectedItemTitle='' selectedItemAppropriate />
  )
}

export default AddStory
