import Navigation from '../components/Navigation'
import './globals.css'

export const metadata = {
  title: 'University Portal',
  description: 'University Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
