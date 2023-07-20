import TopBar from './components/TopBar/TopBar'
import ThemeProvider from './providers/ThemeProvider'
import { GlobalContextProvider } from './context/store'
import RegisterPWA from './RegisterPWA'
import './styles/globals.scss'

/**
 * For future use
 * @param param0
 *
 */
export const metadata = {
  title: 'KidTales.ai',
  description: 'KidTales AI Generator',
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/manifest.json'
}

interface Props {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}

export default function RootLayout ({ children }: Props) {
  return (
    <html lang='en'>

      <head>
        {/* <meta name='viewport' content='width=device-width,initial-scale=1' />
        <link rel='manifest' href='/manifest.json' /> */}
        <link rel='stylesheet' type='text/css' charSet='UTF-8' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css' />
      </head>

      <body>
        <RegisterPWA />
        <GlobalContextProvider>
          <ThemeProvider>
            <TopBar />
            <div className='main'>
              {children}
            </div>
          </ThemeProvider>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
