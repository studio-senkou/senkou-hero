import { cn } from '@hero/lib/utils'
import Image from 'next/image'
import { ComponentProps, Suspense } from 'react'
import { Skeleton } from './ui/skeleton'
import { Client } from '@hero/types/dto'
import { getSupabaseAsset } from '@hero/utils/asset'

interface PartnerProps extends ComponentProps<'div'> {
  partners: Array<Client>
}

export const Partners = ({ className, partners, ...props }: PartnerProps) => {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row flex-wrap justify-center items-center gap-12 lg:gap-24',
        className,
      )}
      {...props}
    >
      <Suspense
        fallback={[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-[100px] h-[100px] rounded-full" />
        ))}
      >
        {partners.map((partner, index) => {
          if (!partner.organization_image && !partner.organization_name) {
            return null
          }

          return (
            <div key={index} className="flex items-center cursor-pointer">
              <div className="transition-all duration-300 filter grayscale hover:grayscale-0 w-[150px] h-[150px] flex items-center justify-center rounded-full bg-white overflow-visible">
                {partner.organization_image &&
                process.env.NEXT_PUBLIC_SUPABASE_S3 ? (
                  <Image
                    src={
                      partner.organization_image
                        ? getSupabaseAsset(
                            `/clients/${partner.organization_image}`,
                          ).trim()
                        : ''
                    }
                    alt={
                      partner.organization_name ??
                      partner.client_name ??
                      'Client Logo'
                    }
                    width={240}
                    height={240}
                    className="transition-all duration-300 filter grayscale hover:grayscale-0 object-cover scale-150"
                  />
                ) : (
                  partner.organization_name && (
                    <span className="text-center text-app-primary-base text-2xl font-semibold px-2 transition-all duration-300 filter grayscale hover:grayscale-0">
                      {partner.organization_name}
                    </span>
                  )
                )}
              </div>
            </div>
          )
        })}
      </Suspense>
    </div>
  )
}
