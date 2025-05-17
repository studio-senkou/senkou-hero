import { SERVICES } from '@hero/constants/service'
import { cn } from '@hero/lib/utils'
import Image from 'next/image'

export const Services = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-evenly bg-white p-4 gap-6',
        className,
      )}
      {...props}
    >
      {SERVICES.map((service, index) => (
        <div className="flex items-center w-full sm:w-64 lg:w-auto" key={index}>
          <Image
            src={service.iconPath}
            alt={service.title}
            width={24}
            height={24}
            className="flex-shrink-0"
          />
          <div className="flex flex-col items-start justify-center py-2 px-3 m-2">
            <h3 className="text-md font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
