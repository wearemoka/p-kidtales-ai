import GalleryItem from '@/app/components/GallerySelect/GalleryItem/GalleryItem'
import { IOptions } from '@/app/utils/interfaces'
import { Box, SimpleGrid } from '@chakra-ui/react'

interface Props {
  title: string,
  options: IOptions[],
  saveOn: string
}

function GallerySelect ({ title, options, saveOn }: Props) {
  return (
    <>
      <div>{title}</div>
      <SimpleGrid columns={2} spacing={10}>
        {options.map((opt, index) => (
          <Box key={index}>
            <GalleryItem option={opt} saveOn={saveOn} />
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}

export default GallerySelect
