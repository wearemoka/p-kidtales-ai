'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useFetchStoryItem } from '@/app/hooks/useFetchStoryItem'
import { updateDocumentInFireStore } from '@/app/service/FirebaseService'
import { useState } from 'react'
import Form, { StoryFormState } from '../../../components/Story/Form/Form'

const EditStory = () => {
  const [updateStoryStatus, setUpdateStoryStatus] = useState<string>('')
  const router = useRouter()
  const path = usePathname()
  const splitPath = path.split('/')
  const { status, data } = useFetchStoryItem(splitPath[3] as string, process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string)

  const updateStoryHandler = async (value: StoryFormState) => {
    setUpdateStoryStatus('Updating...')
    const updateId = splitPath[3] as string
    await updateDocumentInFireStore('stories', value, updateId)
    setUpdateStoryStatus('Updated!')
    router.push('/story')
  }

  return (
    <div>
      {status === 'success'
        ? <Form
            selectedItemTitle={data?.title}
            selectedItemDescription={data?.story}
            selectedItemAppropriate={data?.appropriate}
            onSubmit={updateStoryHandler}
            isEdit
            message={updateStoryStatus}
          />
        : 'Loading...'}
    </div>
  )
}
export default EditStory
