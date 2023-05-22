import { HStack, SimpleGrid, Skeleton } from '@chakra-ui/react'
import styles from './Library.module.scss'

interface Props {
  isGrid: boolean
}

function LoadingSkeleton ({ isGrid }: Props) {
  return (
    <>
      {isGrid &&
        <SimpleGrid columns={3} spacing={5}>
          <Skeleton className={styles.libraryItem} h={220} />
          <Skeleton className={styles.libraryItem} h={220} />
          <Skeleton className={styles.libraryItem} h={220} />
          <Skeleton className={styles.libraryItem} h={220} />
          <Skeleton className={styles.libraryItem} h={220} />
          <Skeleton className={styles.libraryItem} h={220} />
        </SimpleGrid>}

      {!isGrid &&
        <HStack>
          <Skeleton w={340} h={150} />
          <Skeleton w={340} h={150} />
          <Skeleton w={340} h={150} />
        </HStack>}
    </>
  )
}

export default LoadingSkeleton
