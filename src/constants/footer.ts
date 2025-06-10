import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export const FOOTER_LINKS = [
  {
    title: 'Services',
    links: [
      // { label: 'My Account', href: '#' },
      { label: 'Shopping Cart', href: '/cart' },
      // { label: 'Settings', href: '#' },
    ],
  },
  {
    title: 'Helps',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Faqs', href: '/#testimonials' },
      // { label: 'Term & Condition', href: '#' },
      // { label: 'Privacy Policy', href: '#' },
    ],
  },
  {
    title: 'Proxy',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Shop', href: '/products' },
      { label: 'Product', href: '/products' },
      // { label: 'Products Details', href: '#' },
    ],
  },
]

export const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    enabled: !!process.env.NEXT_PUBLIC_FACEBOOK_URL,
    icon: Facebook,
  },
  {
    label: 'X',
    href: process.env.NEXT_PUBLIC_X_URL,
    enabled: !!process.env.NEXT_PUBLIC_X_URL,
    icon: Twitter,
  },
  {
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    enabled: !!process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    icon: Instagram,
  },
  {
    label: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    enabled: !!process.env.NEXT_PUBLIC_LINKEDIN_URL,
    icon: Linkedin,
  },
]
