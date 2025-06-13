import Image from 'next/image'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@hero/lib/utils'

const LandingJumbotron = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <section
      className={cn('py-4 px-6 min-w-screen bg-[#F0F5F1]', className)}
      {...props}
    >
      <div className="flex flex-col-reverse lg:flex-row w-full lg:max-w-3/4 mx-auto lg:min-h-[600px] gap-4">
        <div className="w-full lg:w-1/3 flex flex-col justify-center p-4">
          <h6 className="uppercase text-xs font-semibold text-app-primary-base mb-5">
            Best Organic Market
          </h6>
          <h1 className="text-5xl font-semibold">
            Freshness Guaranteed 🥬, Service Unmatched
          </h1>
          <div className="flex flex-col gap-2 mt-3">
            {/* <h3 className="text-xl">
              <span>Sale up to </span>
              <span className="font-medium text-[#FF8A00]">30% OFF</span>
            </h3> */}
            <p className="text-md text-[#808080]">
              Enjoy farm-fresh products delivered fast, with service you can
              always count on.
            </p>
          </div>
          <Button className="flex items-center max-w-fit rounded-full bg-app-primary-base mt-5 text-base font-normal hover:bg-[#00b206bb] text-white px-8 py-3">
            Order Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="w-full lg:w-2/3 flex items-center justify-center">
          <Image
            src="/hero-image-ax1.png"
            alt="Buah buahan"
            className="w-full h-auto sm:max-w-lg lg:max-w-xl drop-shadow-xl"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
    </section>
  )
}

export { LandingJumbotron }
