import { DM_Sans } from 'next/font/google'
import '../globals.css'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import { UserRole } from '@prisma/client'
import { redirect } from 'next/navigation'

const dmsans = DM_Sans({ subsets: ['latin'] })

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await auth();
  const isAdmin = session?.user?.roles?.includes(UserRole.ADMIN);


  if (!isAdmin) {
    redirect('/unauthorized')
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmsans.className}>
        <SessionProvider>
          <ThemeProvider attribute="class" enableSystem defaultTheme="system">
            <NextTopLoader color="#f9c78f" />
            <div className=''>
              {children}
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
