import GalleryItem from '@/app/components/GallerySelect/GalleryItem/GalleryItem'
import { IOptions } from '@/app/utils/interfaces'
import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react'

interface Props {
  title: string,
  options: IOptions[],
  saveOn: string,
  columns: number[],
  afterClickHandler?:any
}

function GallerySelect ({ title, options, saveOn, columns, afterClickHandler }: Props) {
  return (
    <VStack>
      <Heading as='h3' className='caption bold' mb={3}>{title}</Heading>

      <SimpleGrid columns={columns} spacing={[4, 10]}>
        {options.map((opt, index) => (
          <Box key={index}>
            <GalleryItem option={opt} saveOn={saveOn} afterClickHandler={afterClickHandler} />
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default GallerySelect
