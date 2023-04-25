import GalleryItem from '@/app/components/GallerySelect/GalleryItem/GalleryItem'
import { IOptions } from '@/app/utils/interfaces'

interface Props {
  title: string,
  options: IOptions[],
  saveOn: string
}

function GallerySelect ({ title, options, saveOn }: Props) {
  return (
    <>
      <div>{title}</div>
      {options.map((opt, index) => (
        <div key={index}>
          <GalleryItem option={opt} saveOn={saveOn} />
        </div>
      ))}
    </>
  )
}

export default GallerySelect
