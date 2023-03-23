"use client"
import { FirebaseAppProvider } from 'reactfire'
import Header from './components/Header/Header'
import { config } from './firebase/Config/Config'
import StoreProvider from './firebase/StoreProvider/StoreProvider'
import './globals.css'
/**
 * For future use 
 * @param param0 
 * 
 */
// export const metadata = {
//   title: 'KidTales.ai',
//   description: 'KidTales AI Generator'
// }

export default function RootLayout({
  children
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <FirebaseAppProvider firebaseConfig={config}>
          <StoreProvider>
            <div className ="main">
              {children}
            </div>
          </StoreProvider>
        </FirebaseAppProvider>
      </body>
    </html>
  )
}
