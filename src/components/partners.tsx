import { PARTNERS } from '@hero/constants/partner'
import { cn } from '@hero/lib/utils'
import Image from 'next/image'
import { Suspense } from 'react'
import { Skeleton } from './ui/skeleton'

export const Partners = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex flex-row flex-wrap justify-center items-center gap-36',
        className,
      )}
      {...props}
    >
      <Suspense
        fallback={[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-[100px] h-[100px] rounded-full" />
        ))}
      >
        {PARTNERS.map((partner, index) => (
          <div key={index} className="flex items-center cursor-pointer">
            <div className="transition-all duration-300 filter grayscale hover:grayscale-0">
              <Image
                src={partner.logoPath}
                alt={partner.name}
                width={100}
                height={100}
              />
            </div>
          </div>
        ))}
      </Suspense>
    </div>
  )
}
