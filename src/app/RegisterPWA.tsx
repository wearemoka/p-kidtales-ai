'use client'

import { useEffect } from 'react'

function RegisterPWA () {
  let serviceWorker: ServiceWorkerContainer | undefined

  if (typeof window !== 'undefined') {
    serviceWorker = window?.navigator?.serviceWorker
  }

  useEffect(() => {
    if (serviceWorker) {
      serviceWorker.register('/sw.js', { scope: '/' }).then((registration) => {
        console.log('Service Worker registration successful with scope: ', registration.scope)
      }).catch((err) => {
        console.log('Service Worker registration failed: ', err)
      })
    }
  }, [serviceWorker])

  return (
    <></>
  )
}

export default RegisterPWA
