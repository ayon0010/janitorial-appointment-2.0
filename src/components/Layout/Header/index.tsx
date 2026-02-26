'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { headerData } from '../Header/Navigation/menuData'
import Image from 'next/image'
import HeaderLink from '../Header/Navigation/HeaderLink'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'
import { useTheme } from 'next-themes'
import janitorialLogo from '../../../../public/images/logo/Janitorial-appointment-logo.avif'
import { UserRole } from '@prisma/client'
import { useSession, signOut } from 'next-auth/react'

const CONTACT_EMAIL = 'contact@janitorialappointment.com'
const WHATSAPP_NUMBER = '8801568868704'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
const FACEBOOK_URL = 'https://www.facebook.com/commercialcleaningleads/'

const Header: React.FC = () => {
  const pathUrl = usePathname()
  const { theme, setTheme } = useTheme()
  const { data: session, status } = useSession();

  const [navbarOpen, setNavbarOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  const isLoggedIn = status === 'authenticated' && session?.user
  const isAdmin = isLoggedIn && (session?.user?.roles as string[] | undefined)?.includes(UserRole.ADMIN)

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false)
    }
    if (
      accountRef.current &&
      !accountRef.current.contains(event.target as Node)
    ) {
      setAccountOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen, accountOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  // Close mobile menu when route changes (e.g. after clicking a nav link)
  useEffect(() => {
    setNavbarOpen(false)
  }, [pathUrl])

  return (
    <>
      {/* Top bar: email, WhatsApp, Facebook, hours */}
      <div className="bg-secondary dark:bg-darklight border-b border-white/10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-white/90 hover:text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">{CONTACT_EMAIL}</span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/90 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="hidden sm:inline">Facebook</span>
              </a>
            </div>
            <p className="text-white/90 text-xs sm:text-sm">
              Mon–Fri 9am – 5pm
            </p>
          </div>
        </div>
      </div>

      <header
        className={`sticky h-24 top-0 py-1 z-50 w-full bg-primary transition-all ${sticky
          ? 'shadow-lg dark:shadow-darkmd bg-primary dark:bg-primary'
          : 'shadow-none'
          }`}>
        <div className='container mx-auto flex items-center justify-between p-6'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='shrink-0 relative'>
              <Image
                src={janitorialLogo}
                alt="Janitorial Appointments Icon"
                width={40}
                height={40}
                className="object-contain"
                unoptimized
              />
            </div>
            <span className='text-xl sm:text-2xl font-bold text-white dark:text-white'>
              Janitorial Appointments
            </span>
          </Link>
          <ul className='hidden lg:flex grow items-center justify-center gap-6'>
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </ul>
          <div className='flex items-center xl:gap-4 lg:gap-2 gap-2'>
            <button
              type='button'
              aria-label='Toggle theme'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white'>
              <svg
                viewBox='0 0 16 16'
                className={`hidden h-6 w-6 dark:block ${!sticky && pathUrl === '/' && 'text-white'
                  }`}>
                <path
                  d='M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z'
                  fill='#FFFFFF'
                />
              </svg>
              <svg
                viewBox='0 0 23 23'
                className={`h-8 w-8 text-dark dark:hidden ${!sticky && pathUrl === '/' && 'text-white'
                  }`}>
                <path d='M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z' />
              </svg>
            </button>
            {isLoggedIn ? (
              <div className='hidden lg:block relative' ref={accountRef}>
                <button
                  type='button'
                  onClick={() => setAccountOpen(!accountOpen)}
                  aria-label='Profile menu'
                  className='flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 transition-colors'
                >
                  <svg className='w-5 h-5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {accountOpen && (
                  <div className='absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-darklight rounded-lg shadow-lg border border-gray-200 dark:border-white/10 z-50'>
                    <Link
                      href='/account'
                      className='block px-4 py-2 text-sm text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                      onClick={() => setAccountOpen(false)}
                    >
                      My account
                    </Link>
                    {isAdmin && (
                      <Link
                        href='/dashboard'
                        className='block px-4 py-2 text-sm text-secondary dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                        onClick={() => setAccountOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      type='button'
                      onClick={() => { signOut({ callbackUrl: '/' }); setAccountOpen(false); }}
                      className='block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-white/10'
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href='/signin'
                  className='hidden lg:block bg-white border border-primary text-primary px-4 py-2 rounded-lg hover:bg-black hover:text-white'
                >
                  Sign In
                </Link>
                <Link
                  href='/signup'
                  className='hidden lg:block bg-LightApricot text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white'
                >
                  Sign Up
                </Link>
              </>
            )}
            <button
              type='button'
              title='Toggle mobile menu'
              onClick={() => setNavbarOpen(!navbarOpen)}
              className='block lg:hidden p-2 rounded-lg'
              aria-label='Toggle mobile menu'>
              <span className='block w-6 h-0.5 bg-white dark:bg-white'></span>
              <span className='block w-6 h-0.5 bg-white dark:bg-white mt-1.5'></span>
              <span className='block w-6 h-0.5 bg-white dark:bg-white mt-1.5'></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )}

        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-darkmode shadow-lg transform transition-transform duration-300 max-w-64 ${navbarOpen ? 'translate-x-0' : 'translate-x-full'
            } z-50`}>
          <div className='flex items-center justify-between p-4'>
            <h2 className='text-lg font-bold text-black dark:text-white'>
              Menu
            </h2>
            <button
              type='button'
              title='Close mobile menu'
              onClick={() => setNavbarOpen(false)}
              aria-label='Close mobile menu'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                className='dark:text-white'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <nav className='flex flex-col items-start p-4'>
            {headerData.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className='mt-4 flex flex-col gap-4 w-full'>
              {isLoggedIn ? (
                <>
                  <Link
                    href='/account'
                    title='My account'
                    className='bg-white border border-primary text-primary px-4 py-2 rounded-lg hover:bg-black hover:text-white'
                    onClick={() => setNavbarOpen(false)}>
                    My account
                  </Link>
                  {isAdmin && (
                    <Link
                      href='/dashboard'
                      title='Dashboard'
                      className='bg-gray-100 dark:bg-white/10 text-secondary dark:text-white px-4 py-2 rounded-lg'
                      onClick={() => setNavbarOpen(false)}>
                      Dashboard
                    </Link>
                  )}
                  <button
                    type='button'
                    onClick={() => { signOut({ callbackUrl: '/' }); setNavbarOpen(false); }}
                    className='text-left text-red-600 dark:text-red-400 px-4 py-2 rounded-lg border border-red-200 dark:border-red-900'>
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href='/signin'
                    title='Sign In'
                    className='bg-white border border-primary text-primary px-4 py-2 rounded-lg hover:bg-black hover:text-white'>
                    Sign In
                  </Link>
                  <Link
                    href='/signup'
                    title='Sign Up'
                    className='bg-LightApricot text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white'>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
