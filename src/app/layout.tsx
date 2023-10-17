import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar/Navbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mozoni',
  description: 'Вы будете довольны покупкой',
  // keywords: ["ecommerce", "lower prices", "nextjs"],
  // icons: {icon: './favicon.ico'}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Navbar/>
        <main className='p-4 max-w-7xl m-auto min-w-[300px]'>
          {children}
        </main>
      </body>

    </html>
  )
}
