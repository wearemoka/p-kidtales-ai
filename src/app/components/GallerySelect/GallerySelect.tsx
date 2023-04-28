import GalleryItem from '@/app/components/GallerySelect/GalleryItem/GalleryItem'
import { IOptions } from '@/app/utils/interfaces'
import { Box, Heading, SimpleGrid, VStack } from '@chakra-ui/react'

interface Props {
  title: string,
  options: IOptions[],
  saveOn: string
}

function GallerySelect ({ title, options, saveOn }: Props) {
  return (
    <VStack>
      <Heading>{title}</Heading>

      <SimpleGrid columns={2} spacing={10}>
        {options.map((opt, index) => (
          <Box key={index}>
            <GalleryItem option={opt} saveOn={saveOn} />
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default GallerySelect
