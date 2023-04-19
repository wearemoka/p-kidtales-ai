'use client'
import { FirebaseAppProvider } from 'reactfire'
import Header from './components/Header/Header'
import { config } from './firebase/Config/Config'
import StoreProvider from './firebase/StoreProvider/StoreProvider'
import AudioPlayer from './components/generators/AudioPlayer'
import { GlobalContextProvider } from './context/store'
import { ThemeProvider } from './ThemeProvider'
import './globals.scss'
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
          <ThemeProvider>

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
          </ThemeProvider>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
