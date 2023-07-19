// 'use client'
// import { FirebaseAppProvider } from 'reactfire'
// import { config } from './firebase/Config/Config'
// import StoreProvider from './firebase/StoreProvider/StoreProvider'
// import { GlobalContextProvider } from './context/store'
// import { ThemeProvider } from './ThemeProvider'
import TopBar from './components/TopBar/TopBar'
import ThemeProvider from './providers/ThemeProvider'
import RegisterPWA from './RegisterPWA'
import './styles/globals.scss'

/**
 * For future use
 * @param param0
 *
 */
// export const metadata = {
//   title: 'KidTales.ai',
//   description: 'KidTales AI Generator'
// }

interface Props {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}

export default function RootLayout ({ children }: Props) {
  return (
    <html lang='en'>

      <head>
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='stylesheet' type='text/css' charSet='UTF-8' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
      </head>

      {/* <body>
        <RegisterPWA />

        <GlobalContextProvider>
          <ThemeProvider>

            <TopBar />
            <FirebaseAppProvider firebaseConfig={config}>
              <StoreProvider>
                <div className='main'>
                  {children}
                </div>
              </StoreProvider>
            </FirebaseAppProvider>

          </ThemeProvider>
        </GlobalContextProvider>
      </body> */}
      <body>
        <RegisterPWA />
        <ThemeProvider>
          <TopBar />
          <div className='main'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
