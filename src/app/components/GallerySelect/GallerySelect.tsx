import GalleryItem from './GalleryItem/GalleryItem'

interface IOptions {
  label: string,
  imgPath?: string,
  alt?: string
}
interface Props {
  title: string,
  options: IOptions[]
}

function GallerySelect ({ title, options }: Props) {
  return (
    <>
      <div>{title}</div>
      {options.map((opt, index) => (
        <div key={index}>
          <GalleryItem option={opt} />
        </div>
      ))}
    </>
  )
}

export default GallerySelect
