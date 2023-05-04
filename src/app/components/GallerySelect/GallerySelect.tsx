import GalleryItem from '@/app/components/GallerySelect/GalleryItem/GalleryItem'
import { IOptions } from '@/app/utils/interfaces'
import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react'

interface Props {
  title: string,
  options: IOptions[],
  saveOn: string,
  columns: number[],
  afterClickHandler?:any,
  type: string,
}

function GallerySelect ({ title, options, saveOn, columns, afterClickHandler, type }: Props) {
  const noImg = type === 'noImg' ? 5 : 8

  return (
    <VStack>
      <Heading as='h3' className='caption bold' mb={3}>{title}</Heading>

      <SimpleGrid columns={columns} spacing={[4, noImg]}>
        {options.map((opt, index) => (
          <Box key={index}>
            <GalleryItem option={opt} saveOn={saveOn} afterClickHandler={afterClickHandler} value={type} />
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default GallerySelect
