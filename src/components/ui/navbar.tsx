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

const Navbar = ({ breadcrumbLabel, className }: NavbarProps) => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const cartItems = useCart((state) => state.items)

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
  }, [sidebarOpen])

  const isHomepageTop = pathname === '/' && !hasScrolled

  const navVariants = {
    transparent: {
      backgroundColor: '#F0F5F1',
      borderBottomColor: 'transparent',
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderBottomColor: 'rgba(229, 231, 235, 1)',
    },
    solid: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderBottomColor: 'rgba(229, 231, 235, 1)',
    },
  }

  const currentVariant = isHomepageTop
    ? 'transparent'
    : hasScrolled
      ? 'scrolled'
      : 'solid'

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <motion.ul
      className="flex flex-col lg:flex-row gap-4 lg:gap-6 font-medium text-base lg:text-md"
      initial={false}
    >
      {NAVIGATION_ITEMS.map((item, index) => (
        <motion.li
          key={item.label}
          initial={false}
          animate={{
            color: pathname === item.href ? '#30ab54' : '#374151',
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: index * 0.05,
          }}
        >
          <Link
            href={item.href}
            className="hover:text-app-primary-base transition-colors duration-300"
            onClick={onClick}
          >
            {item.label}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  )

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 overflow-hidden border-b-[.1px]',
        className,
      )}
      variants={navVariants}
      initial={false}
      animate={currentVariant}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        backdropFilter: hasScrolled && !isHomepageTop ? 'blur(12px)' : 'none',
      }}
    >
      <AnimatePresence>
        {isHomepageTop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 bg-[#F0F5F1]"
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>

      <div className="relative flex justify-between items-center lg:max-w-3/4 mx-auto p-6">
        <Link href="/">
          <Image
            src="/hero-logo-c1.png"
            alt="Hero Logo"
            width={64}
            height={12}
          />
        </Link>
        <div className="hidden lg:flex items-center gap-6">
          <NavLinks />
        </div>
        <div className="flex items-center gap-4">
          {['md', ''].map((bp, i) => (
            <Link
              key={`cart-${bp}-${i}`}
              href="/cart"
              className={cn(
                bp ? `hidden ${bp}:inline-flex p-0` : `${bp}:hidden p-0`,
                'relative items-center justify-center',
              )}
            >
              <motion.div
                initial={false}
                animate={{
                  color: '#374151',
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.div>
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute -top-2 -right-2 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </Link>
          ))}
          <motion.div
            initial={false}
            animate={{
              color: '#374151',
            }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <Button
              variant="ghost"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu />
              </motion.div>
            </Button>
          </motion.div>
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
              className="absolute top-0 right-0 h-full w-full bg-white p-6 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <Link href="/">
                  <Image
                    src="/hero-logo-c1.png"
                    alt="Hero Logo"
                    width={64}
                    height={12}
                  />
                </Link>
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
    </motion.nav>
  )
}

export { Navbar }
