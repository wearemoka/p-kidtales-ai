'use client'
import { Inter } from 'next/font/google'
import StoryPage from './story/page'
// eslint-disable-next-line no-unused-vars
const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <StoryPage />
  )
}
