import { Metadata } from 'next'
import NotFoundScene from '@sections/NotFoundScene'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return <NotFoundScene />
}
