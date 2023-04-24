import Image from 'next/image'
import React from 'react'
interface IOptions {
  label: string,
  imgPath?: string,
  alt?: string
}

interface Props {
  option: IOptions
}
function GalleryItem ({ option }: Props) {
  return (
    <>
      {(option.imgPath && option.alt) &&
        <Image
          src={option.imgPath}
          alt={option.alt}
          width={100}
          height={100}
        />}
      <label>{option.label}</label>
    </>
  )
}

export default GalleryItem
