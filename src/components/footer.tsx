'use client'

import Image from 'next/image'
// import { Input } from './ui/input'
import { Button } from './ui/button'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@hero/constants/footer'
import Link from 'next/link'
import { cn } from '@hero/lib/utils'
// import { useTransition } from 'react'
// import { subscribe } from '@hero/lib/subscription'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { toast } from 'sonner'
// import { z } from 'zod'

export const Footer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer
      className={cn(
        'flex flex-col items-center justify-center min-w-screen pb-10 bg-[#1A1A1A]',
        className,
      )}
      {...props}
    >
      <section className="w-full p-8 bg-[#F2F2F2]">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:max-w-3/4 mx-auto gap-4 lg:gap-0">
          <div className="flex items-center gap-4 mb-6 lg:mb-0">
            <Image src="/leaf-x3.svg" alt="Leaf Icon" width={36} height={36} />
            <h2 className="text-3xl font-medium">Hero</h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-medium mb-2">
                Ready to shop with Hero?
              </h3>
              <p className="text-base text-neutral-600 mb-4">
                Discover our latest products and enjoy exclusive deals. Start
                shopping now!
              </p>
              <Button
                className="bg-[#00B207] text-white rounded-full px-6 py-3 font-semibold hover:bg-[#00b206bb] transition"
                asChild
              >
                <Link href="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full lg:max-w-3/4 px-8 py-12 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-0">
          <div className="flex flex-col gap-4 max-w-lg lg:max-w-sm mb-8 lg:mb-0">
            <h3 className="text-xl font-semibold">About Hero</h3>
            <p className="text-sm text-neutral-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industries standard dummy text
              ever since the 1500s.
            </p>
            <div className="flex gap-2 items-center">
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
                {process.env.NEXT_PUBLIC_PHONE_NUMBER
                  ? `+678 ${process.env.NEXT_PUBLIC_PHONE_NUMBER.replace(/^(\+?678)?/, '').replace(/(\d{3})(\d{3,})/, '$1 $2')}`
                  : ''}
              </a>
              <span className="text-neutral-400">or</span>
              <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
                {process.env.NEXT_PUBLIC_EMAIL}
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row lg:ml-auto gap-8 lg:gap-16 w-full lg:w-auto">
            {FOOTER_LINKS.map((section) => (
              <nav key={section.title}>
                <h4 className="text-lg font-semibold mb-2">{section.title}</h4>
                <ul className="space-y-1 text-neutral-400">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="hover:text-white transition"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <hr className="my-8 mt-16 border-t border-neutral-700" />
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 order-2 lg:order-1">
            {SOCIAL_LINKS.map(
              (social) =>
                social.enabled && (
                  <Link key={social.label} href={social.href!} target="_blank">
                    <social.icon />
                  </Link>
                ),
            )}
          </div>
          <p className="text-sm text-neutral-400 text-center flex-1 order-1 lg:order-2">
            &copy; {new Date().getFullYear()} Hero. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// const newsletterSchema = z.object({
//   email: z.string().email('Please enter a valid email address.'),
// })

// function NewsletterSubscribeForm() {
//   const [isPending, startTransition] = useTransition()
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(newsletterSchema),
//     defaultValues: { email: '' },
//   })

//   const onSubmit = (data: z.infer<typeof newsletterSchema>) => {
//     startTransition(async () => {
//       try {
//         await subscribe(data.email)
//         reset()
//       } catch {
//         toast.error('Subscription failed', {
//           description: 'Please try again later.',
//           duration: 3000,
//         })
//       }
//     })
//   }

//   return (
//     <form
//       className="relative w-full max-w-xs p-5 lg:p-0"
//       onSubmit={handleSubmit((data) => {
//         onSubmit(data)
//         if (Object.keys(errors).length === 0) {
//           toast('Subscribed successfully!', {
//             description: 'Thank you for subscribing to our newsletter.',
//             duration: 3000,
//           })
//         }
//       })}
//     >
//       <Input
//         className={cn(
//           'bg-white rounded-full pr-28 placeholder:text-neutral-400 w-full',
//           errors.email && 'border border-red-500',
//         )}
//         placeholder="Your email address"
//         type="email"
//         autoComplete="email"
//         disabled={isPending}
//         {...register('email')}
//       />
//       <Button
//         className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#00B207] text-white rounded-full px-4 py-2 font-regular hover:bg-[#00b206bb] transition"
//         type="submit"
//         disabled={isPending}
//       >
//         {isPending ? 'Subscribing...' : 'Subscribe'}
//       </Button>
//     </form>
//   )
// }
