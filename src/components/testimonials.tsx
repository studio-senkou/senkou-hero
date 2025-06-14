'use client'

import { cn } from '@hero/lib/utils'
import { ComponentProps, useEffect, useRef, useState, Suspense } from 'react'
import { AnimatePresence, motion, PanInfo } from 'framer-motion'
import Image from 'next/image'
import type { Testimony } from '@hero/types/dto'
import { Skeleton } from './ui/skeleton'
import { getSupabaseAsset } from '@hero/utils/asset'

interface TestimonialProps extends ComponentProps<'div'> {
  testimonials: Array<Testimony>
}

export const Testimonials = ({
  testimonials,
  className,
  ...props
}: TestimonialProps) => {
  const [isMobile, setIsMobile] = useState(false)

  const AUTOPLAY_INTERVAL = 10000

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

  const totalPages = Math.ceil(testimonials?.length / CARDS_PER_PAGE)

  const goToNextPage = () => {
    setDirection(currentPage === totalPages - 1 ? -1 : 1)
    setCurrentPage(currentPage === totalPages - 1 ? 0 : currentPage + 1)
  }

  const goToPrevPage = () => {
    setDirection(currentPage === 0 ? 1 : -1)
    setCurrentPage(currentPage === 0 ? totalPages - 1 : currentPage - 1)
  }

  const goToPage = (pageIndex: number) => {
    setDirection(pageIndex > currentPage ? 1 : -1)
    setCurrentPage(pageIndex)
  }
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50
    const swipeVelocityThreshold = 500

    if (
      info.offset.x > swipeThreshold ||
      info.velocity.x > swipeVelocityThreshold
    ) {
      goToPrevPage()
      resetAutoplay()
    } else if (
      info.offset.x < -swipeThreshold ||
      info.velocity.x < -swipeVelocityThreshold
    ) {
      goToNextPage()
      resetAutoplay()
    }
  }
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goToNextPage()
    }, AUTOPLAY_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    setCurrentPage(0)
  }, [CARDS_PER_PAGE])

  const startIndex = currentPage * CARDS_PER_PAGE
  const currentTestimonials = testimonials.slice(
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

  const resetAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        goToNextPage()
      }, AUTOPLAY_INTERVAL)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full lg:p-8 overflow-x-hidden',
        className,
      )}
      id="testimonials"
      aria-label="Client Testimonials"
      {...props}
    >
      <h2 className="text-3xl font-semibold mb-4 text-[#002603]">
        What Our Clients Say
      </h2>

      <div className="flex gap-2 mt-4 mb-8">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            className={`h-1 transition-all rounded-xs cursor-pointer ${pageIndex === currentPage ? 'bg-[#00B207] w-8' : 'bg-gray-300'} w-3`}
            onClick={() => {
              goToPage(pageIndex)
              resetAutoplay()
            }}
            aria-label={`Go to testimonial page ${pageIndex + 1}`}
          />
        ))}
      </div>

      <div className="flex flex-col items-center w-full">
        <Suspense
          fallback={
            <div className="w-full flex flex-row justify-center gap-6 overflow-hidden min-h-[280px]">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="w-full max-w-sm h-64 rounded-lg" />
              ))}
            </div>
          }
        >
          <div className="w-full flex flex-row justify-center gap-6 overflow-hidden min-h-[280px] relative">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                className="flex flex-row gap-6 w-full justify-center cursor-grab active:cursor-grabbing"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'tween' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: 'grabbing' }}
                style={{ width: '100%' }}
              >
                {currentTestimonials.map((testimonial, testimonialIndex) => (
                  <TestimonyCard
                    key={startIndex + testimonialIndex}
                    {...testimonial}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Suspense>
      </div>
    </div>
  )
}

const TestimonyCard = ({ testimony, client }: Readonly<Testimony>) => {
  const isAnonymous = !client || !client.client_name

  return (
    <div className="flex flex-col items-center justify-between p-4 min-w-sm max-w-sm lg:min-w-lg lg:max-w-lg min-h-[320px]">
      <div className="flex flex-col items-center gap-4 border w-full border-neutral-200 p-6 rounded-lg min-h-[180px] justify-center">
        <Image
          src="/quote.svg"
          alt="Quote Icon"
          width={36}
          height={36}
          loading="lazy"
        />
        <q className="text-center">{testimony}</q>
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="w-[72px] h-[72px] relative">
          {!isAnonymous && client.client_image ? (
            <Image
              src={
                client.client_image
                  ? getSupabaseAsset(`/clients/${client.client_image}`)
                  : 'https://placehold.in/72x72.webp'
              }
              alt={client.client_name}
              fill
              className="rounded-full object-cover"
              loading="lazy"
              sizes="72px"
            />
          ) : (
            <Image
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                isAnonymous ? 'Anonymous' : client.client_name,
              )}&rounded=true&background=random`}
              alt={isAnonymous ? 'Anonymous' : client.client_name}
              width={72}
              height={72}
              className="rounded-full object-cover"
              loading="lazy"
            />
          )}
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-[#002603]">
            {isAnonymous ? 'Anonymous' : client.client_name}
          </h3>
          {!isAnonymous && client.organization_name && (
            <p className="text-sm text-gray-500">{client.organization_name}</p>
          )}
        </div>
      </div>
    </div>
  )
}
