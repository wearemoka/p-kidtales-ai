import Stories from '../components/Library/Library'
import { ages } from '@/app/services/constants/StoryParams'

function LibraryPage () {
  return (
    <>
      <div>
        <h1 className='heading-small'>Popular Stories</h1>

        {ages.map((age:string, item: number) => {
          return (
            <Stories age={age} key={item} />
          )
        })}
      </div>
    </>
  )
}

export default LibraryPage
