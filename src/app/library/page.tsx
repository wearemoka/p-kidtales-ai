import Stories from '../components/Library/Stories/Stories'
import { ages } from '@/app/services/constants/StoryParams'

function LibraryPage () {
  return (
    <>
      <h3>Popular Stories</h3>

      {ages.map((age:string, item: number) => {
        return (
          <Stories age={age} key={item} />
        )
      })}

    </>
  )
}

export default LibraryPage
