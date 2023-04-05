'use client'
import { FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire'
import React, { useMemo } from 'react'
import { connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore'
import { config } from '../Config/Config'

interface FirebaseAppProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider ({
  children,
  useEmulator
}: React.PropsWithChildren<{ useEmulator?: boolean }>) {
  const firestore = useFirestore()

  // connect to emulator if enabled
  if (useEmulator) {
    const host = getFirestoreHost()
    const port = Number(getFirestorePort())

    try {
      connectFirestoreEmulator(firestore, host, port)
    } catch (e) {
      // this may happen on re-renderings
    }
  }
  // We enable offline capabilities by caching Firestore in IndexedDB
  // NB: if you don't want to cache results, please remove the next few lines
  return <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
}

function getFirestoreHost () {
  return process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST ?? 'localhost'
}

function getFirestorePort () {
  return process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT ?? 8080
}

function useFirestore () {
  const app = useFirebaseApp()
  return useMemo(() => initializeFirestore(app, {}), [app])
}

export const FireBaseProvider:React.FC<FirebaseAppProviderProps> = ({ children }) => {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <StoreProvider>
        {children}
      </StoreProvider>
    </FirebaseAppProvider>
  )
}
