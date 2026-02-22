import { DM_Sans } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import { SessionProvider } from 'next-auth/react'

const dmsans = DM_Sans({ subsets: ['latin'] })

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmsans.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <NextTopLoader color="#f9c78f" />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
