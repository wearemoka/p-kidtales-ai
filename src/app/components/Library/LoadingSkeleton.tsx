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
          <Skeleton className={styles.libraryItem} h={175} w={400} />
          <Skeleton className={styles.libraryItem} h={175} w={400} />
          <Skeleton className={styles.libraryItem} h={175} w={400} />
          <Skeleton className={styles.libraryItem} h={175} w={400} />
          <Skeleton className={styles.libraryItem} h={175} w={400} />
          <Skeleton className={styles.libraryItem} h={175} w={400} />
        </SimpleGrid>}

      {!isGrid &&
        <HStack>
          <Skeleton w={220} h={90} />
          <Skeleton w={220} h={90} />
        </HStack>}
    </>
  )
}

export default LoadingSkeleton
