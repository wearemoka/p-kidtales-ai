'use client'
import { useFetchStory } from '@/app/hooks/useFetchStory'
import { updateDocumentInFireStore } from '@/app/service/FirebaseService'
import Link from 'next/link'
import Style from './list.module.css'

const List = () => {
  const fireBaseStoryCollection = process.env.NEXT_PUBLIC_FIREBASE_STORE_STORY_END_POINT as string
  const { data, setData } = useFetchStory(fireBaseStoryCollection)
  /**
   * Edit a Story
   * Route to edit page
   */

  // const editStoryHandler = (id: string) => {
  //   router.push(`/story/edit/${id}`)
  // }

  /**
   * Flag a Story for inappropriate content or language
   */
  const banStory = async (story:any) => {
    const updatedStory = { ...story, appropriate: false }
    await updateDocumentInFireStore(fireBaseStoryCollection, updatedStory, story.id)
    const storyIndex = data.findIndex(item => item.id === story.id)
    const newData = [...data]
    newData[storyIndex] = updatedStory
    setData(newData)
  }

  return (
    <div className={Style.tableWrapper}>
      <table className={Style.table} style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th className={Style.tableColumnCell}>No</th>
            <th className={Style.tableColumnCell}>Title</th>
            <th className={Style.tableColumnCell}>Is Appropriate?</th>
            <th className={Style.tableColumnCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0
            ? data.map((item, index) => {
              return (
                <tr key={`${index}`}>
                  <td className={Style.tableRowCell}>{index + 1}</td>
                  <td className={Style.tableRowCell}>{item.title}</td>
                  <td className={Style.tableRowCell}>{(item.appropriate == null || item.appropriate) ? '✅' : '❌'}</td>
                  <td className={Style.tableRowCell}>
                    <Link className={Style.actionViewButton} href={`/story/view/${item.id}`}>View</Link>
                    <button onClick={() => banStory(item)} disabled={!(item.appropriate == null || item.appropriate)}>Inappropriate</button>
                  </td>
                </tr>
              )
            })
            : <tr><td colSpan={12}>Loading...</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

export default List
