'use client'
import { useCreateStory } from '@/app/hooks/useCreateStory'
import { useRouter } from 'next/navigation'
import Form, { StoryFormState } from '../../components/Story/Form/Form'

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
