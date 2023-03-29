'use client'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { doc, DocumentReference } from 'firebase/firestore'

type Response = {
  id: string;
  title: string;
  story: string;
  collectionPath: string;
  appropriate: boolean
};

export function useFetchStoryItem (stroyItemId: string, collectionPath: string) {
  const firestore = useFirestore()
  const id = stroyItemId || ' '
  const storyPath = collectionPath

  const ref = doc(
    firestore,
    storyPath,
    id
  ) as DocumentReference<Response>

  return useFirestoreDocData(ref, { idField: 'id' })
}
