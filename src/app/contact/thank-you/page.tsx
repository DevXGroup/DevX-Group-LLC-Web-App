import type { Metadata } from 'next'
import ThankYouClient from './ThankYouClient'

export const metadata: Metadata = {
  title: 'Thank You | DevX Group',
  description:
    'Your message has been received. Book a free 30-minute consultation while you wait for our reply.',
  robots: { index: false, follow: true },
}

export default function ThankYouPage() {
  return <ThankYouClient />
}
