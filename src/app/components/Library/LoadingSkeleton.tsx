import { SimpleGrid, Skeleton } from '@chakra-ui/react'
import styles from './Library.module.scss'

function LoadingSkeleton () {
  return (
    <SimpleGrid columns={3} spacing={5} mt={10}>
      <Skeleton className={styles.libraryItem} h={175} w={400} />
      <Skeleton className={styles.libraryItem} h={175} w={400} />
      <Skeleton className={styles.libraryItem} h={175} w={400} />
    </SimpleGrid>
  )
}

export default LoadingSkeleton
