import './globals.css'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Responsive Dashboard',
  description: 'A news and payout dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          {/* <Navbar /> */}
          
          {children}
        </Providers>
      </body>
    </html>
  )
}
