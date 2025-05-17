'use client'

import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { Button } from './button'
import Image from 'next/image'
import { NAVIGATION_ITEMS } from '@hero/constants/navigation'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
  }, [sidebarOpen])

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <ul className="flex flex-col md:flex-row gap-4 md:gap-6 font-semibold text-base md:text-xs">
      {NAVIGATION_ITEMS.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className="text-gray-800 hover:text-[#00B207] transition-colors duration-300"
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
      <h1 className="text-xl font-semibold">Hero</h1>
    )

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-2 z-50 transition-all duration-500 ease-in-out
        ${
          hasScrolled
            ? 'border-b border-gray-100 bg-white/80 backdrop-blur-md'
            : 'border-b border-transparent bg-white'
        }`}
    >
      <div className="flex justify-between items-center lg:max-w-3/4 mx-auto">
        <div>{Brand}</div>
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" className="hidden md:inline-flex">
            <Search />
          </Button>
          <Link href="/cart" className="hidden md:inline-flex">
            <ShoppingCart size={16} />
          </Link>
          <Button variant="ghost" className="md:hidden">
            <Search />
          </Button>
          <Link href="/cart" className="md:hidden">
            <ShoppingCart size={16} />
          </Link>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </Button>
        </div>
      </div>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
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
                {pathname === '/' ? (
                  <Image
                    src="/hero-logo-c1.png"
                    alt="Hero Logo"
                    width={48}
                    height={10}
                  />
                ) : (
                  <h1 className="text-lg font-semibold">Hero</h1>
                )}
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
    </nav>
  )
}

export { Navbar }
