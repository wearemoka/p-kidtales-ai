'use client'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { doc, DocumentReference } from 'firebase/firestore'

type Response = {
  id: string;
  title: string;
  description: string;
  appropriate: boolean
};

export function useFetchStoryItem (stroyItemId: string) {
  const firestore = useFirestore()
  const id = stroyItemId || ' '
  const storyPath = '/stories'

  const ref = doc(
    firestore,
    storyPath,
    id
  ) as DocumentReference<Response>

  return useFirestoreDocData(ref, { idField: 'id' })
}
