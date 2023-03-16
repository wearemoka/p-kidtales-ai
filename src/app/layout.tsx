import './globals.css'

export const metadata = {
  title: 'KidTales.ai',
  description: 'KidTales AI Generator'
}

export default function RootLayout ({
  children
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
