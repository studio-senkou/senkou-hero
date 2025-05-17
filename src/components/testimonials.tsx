'use client'

import { cn } from '@hero/lib/utils'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { TESTIMONIALS } from '@hero/constants/testimony'

export const Testimonials = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const AUTOPLAY_INTERVAL = 10000

  // Responsive: detect mobile using window.matchMedia
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1023)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const CARDS_PER_PAGE = isMobile ? 1 : 2

  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const totalPages = Math.ceil(TESTIMONIALS.length / CARDS_PER_PAGE)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (currentPage === totalPages - 1) {
        setDirection(-1)
        setCurrentPage(0)
      } else {
        setDirection(1)
        setCurrentPage((previousPage) => previousPage + 1)
      }
    }, AUTOPLAY_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentPage, totalPages])

  // Reset currentPage if totalPages changes (e.g., on resize)
  useEffect(() => {
    setCurrentPage(0)
  }, [CARDS_PER_PAGE])

  const startIndex = currentPage * CARDS_PER_PAGE
  const currentTestimonials = TESTIMONIALS.slice(
    startIndex,
    startIndex + CARDS_PER_PAGE,
  )

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(2px)',
      transition: { duration: 0.35, ease: [0.4, 0.01, 0.165, 0.99] },
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.4, 0.01, 0.165, 0.99] },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      filter: 'blur(2px)',
      transition: { duration: 0.35, ease: [0.4, 0.01, 0.165, 0.99] },
    }),
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full lg:p-8 overflow-x-hidden',
        className,
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold mb-4 text-[#002603]">
        What Our Clients Say
      </h2>
      <div className="flex flex-col items-center w-full">
        <div
          className="w-full flex flex-row justify-center gap-6 overflow-hidden min-h-[280px]"
          style={{ position: 'relative' }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              className="flex flex-row gap-6 w-full justify-center"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween' }}
              style={{ width: '100%' }}
            >
              {currentTestimonials.map((testimonial, testimonialIndex) => (
                <TestimonyCard
                  key={startIndex + testimonialIndex}
                  content={testimonial.content}
                  image={testimonial.image}
                  role={testimonial.role}
                  name={testimonial.name}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <button
              key={pageIndex}
              className={`h-2 transition-all rounded-lg cursor-pointer ${pageIndex === currentPage ? 'bg-[#00B207] w-8' : 'bg-gray-300'} w-3`}
              onClick={() => {
                setDirection(pageIndex > currentPage ? 1 : -1)
                setCurrentPage(pageIndex)
              }}
              aria-label={`Go to testimonial page ${pageIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface TestimonyCardProps {
  content: string
  image: string
  role: string
  name: string
}

const TestimonyCard = ({
  content,
  image,
  role,
  name,
}: Readonly<TestimonyCardProps>) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-w-sm max-w-sm lg:min-w-lg lg:max-w-lg">
      <div className="flex flex-col items-center gap-4 border w-full border-neutral-200 p-6 rounded-lg">
        <Image
          src="/quote.svg"
          alt="Quote Icon"
          width={36}
          height={36}
          loading="lazy"
        />
        <q>{content}</q>
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <Image
          src={image}
          alt={name}
          width={50}
          height={50}
          className="rounded-full"
          loading="lazy"
        />
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#002603]">{name}</h3>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  )
}
