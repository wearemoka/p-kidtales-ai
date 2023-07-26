import { HStack, SimpleGrid, Skeleton, useMediaQuery } from '@chakra-ui/react'
import styles from './Library.module.scss'

function LoadingSkeleton () {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <>
      {(!isMobile)
        ? <SimpleGrid columns={3} spacing={5} mt={10}>
          <Skeleton h={175} w={400} />
          <Skeleton h={175} w={400} />
          <Skeleton h={175} w={400} />
          </SimpleGrid>
        : <HStack spacing='20px' className={styles.stack}>
          <Skeleton h={120} w={280} />
          <Skeleton h={120} w={280} />
          <Skeleton h={120} w={280} />
        </HStack>}
    </>
  )
}

export default LoadingSkeleton
