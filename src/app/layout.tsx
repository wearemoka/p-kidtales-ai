'use client'
import { FirebaseAppProvider } from 'reactfire'
import Header from './components/Header/Header'
import { config } from './firebase/Config/Config'
import StoreProvider from './firebase/StoreProvider/StoreProvider'
import AudioPlayer from './components/generators/AudioPlayer'
import './globals.scss'
import { GlobalContextProvider } from './context/store'
/**
 * For future use
 * @param param0
 *
 */
// export const metadata = {
//   title: 'KidTales.ai',
//   description: 'KidTales AI Generator'
// }

export default function RootLayout ({
  children
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <GlobalContextProvider>

          <Header />
          <div className='positionTopRight'>
            <AudioPlayer />
          </div>

          <FirebaseAppProvider firebaseConfig={config}>
            <StoreProvider>
              <div className='main'>
                {children}
              </div>
            </StoreProvider>
          </FirebaseAppProvider>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
