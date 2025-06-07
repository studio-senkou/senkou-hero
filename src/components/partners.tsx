import { cn } from '@hero/lib/utils'
import Image from 'next/image'
import { ComponentProps, Suspense } from 'react'
import { Skeleton } from './ui/skeleton'
import { Client } from '@hero/types/dto'

interface PartnerProps extends ComponentProps<'div'> {
  partners: Array<Client>
}

export const Partners = ({ className, partners, ...props }: PartnerProps) => {
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
        {partners.map((partner, index) => (
          <div key={index} className="flex items-center cursor-pointer">
            <div className="transition-all duration-300 filter grayscale hover:grayscale-0">
              <Image
                src={
                  partner.organization_image &&
                  process.env.NEXT_PUBLIC_SUPABASE_S3
                    ? `${process.env.NEXT_PUBLIC_SUPABASE_S3}/clients/${partner.organization_image}`
                    : 'https://placehold.in/200.webp'
                }
                alt={partner.organization_name ?? 'Client Logo'}
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
