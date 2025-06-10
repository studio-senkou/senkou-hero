'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X } from 'lucide-react'

import { NAVIGATION_ITEMS } from '@hero/constants/navigation'
import { cn } from '@hero/lib/utils'
import { Button } from './button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb'
import { useCart } from '@hero/hooks/use-cart'

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  breadcrumbLabel?: string
}

const Navbar = ({ breadcrumbLabel, className, ...props }: NavbarProps) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const cartItems = useCart((state) => state.items)

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
  }, [sidebarOpen])

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 font-medium text-base lg:text-md">
      {NAVIGATION_ITEMS.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className={cn(
              'text-gray-800 hover:text-[#00B207] transition-colors duration-300',
              pathname === item.href && 'text-[#00B207]',
            )}
            onClick={onClick}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )

  const Brand =
    pathname === '/' ? (
      <Image src="/hero-logo-c1.png" alt="Hero Logo" width={64} height={12} />
    ) : (
      <h1 className="text-2xl font-medium">Hero</h1>
    )

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out bg-white',
        hasScrolled
          ? 'bg-white/80 backdrop-blur-md'
          : 'border-b border-transparent bg-white',
        pathname === '/' && hasScrolled && 'border-b border-neutral-200',
        className,
      )}
      {...props}
    >
      <div className="flex justify-between items-center lg:max-w-3/4 mx-auto p-6">
        <div>{Brand}</div>
        <div className="hidden lg:flex items-center gap-6">
          <NavLinks />
        </div>
        <div className="flex items-center gap-4">
          {/* {['md', ''].map((bp, i) => (
            <span
              key={`search-${bp}-${i}`}
              className={cn(
                bp ? `hidden ${bp}:inline-flex p-0` : `${bp}:hidden p-0`,
              )}
            >
              <Search className="w-5 h-5" />
            </span>
          ))} */}
          {['md', ''].map((bp, i) => (
            <Link
              key={`cart-${bp}-${i}`}
              href="/cart"
              className={cn(
                bp ? `hidden ${bp}:inline-flex p-0` : `${bp}:hidden p-0`,
                'relative items-center justify-center',
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          ))}
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed w-screen h-screen  inset-0 z-50 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              key="sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute top-0 right-0 h-full w-full bg-white shadow-lg p-6 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                {Brand}
                <Button
                  variant="ghost"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                >
                  <X />
                </Button>
              </div>
              <NavLinks onClick={() => setSidebarOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      {pathname !== '/' && (
        <div className="py-2 px-6 bg-black text-white">
          <div className="flex items-center lg:max-w-3/4 mx-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-xs text-white hover:text-neutral-200"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-xs text-[#00B207]">
                    {breadcrumbLabel ||
                      pathname
                        .split('/')
                        .filter(Boolean)
                        .map(
                          (segment) =>
                            segment.charAt(0).toUpperCase() + segment.slice(1),
                        )
                        .join(' / ')}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}
    </nav>
  )
}

export { Navbar }
