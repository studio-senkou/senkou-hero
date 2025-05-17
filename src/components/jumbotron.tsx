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
      className={cn(
        'flex flex-col lg:flex-row gap-4 py-4 px-12 lg:max-w-4/5 mx-auto lg:min-h-[600px] bg-[#F0F5F1] rounded-lg',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col-reverse lg:flex-row w-full">
        <div className="w-full lg:w-1/3 flex flex-col justify-center p-4">
          <h6 className="uppercase text-xs font-semibold text-[#00B207]">
            Welcome To Hero
          </h6>
          <h1 className="text-5xl font-semibold">Organic & Healthy</h1>
          <div className="flex flex-col gap-2 mt-3">
            <h3 className="text-xl">
              <span>Sale up to </span>
              <span className="font-medium text-[#FF8A00]">30% OFF</span>
            </h3>
            <p className="text-xs text-[#808080]">
              Free shipping on all your order. we deliver, you enjoy
            </p>
          </div>
          <Button className="flex items-center max-w-fit rounded-full bg-[#00B207] mt-3 text-md font-normal hover:bg-[#00b206bb] text-white px-4 py-2">
            Shop Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="w-full lg:w-2/3 hidden lg:flex items-center justify-center">
          <Image
            src="/hero-image-ax1.png"
            alt="Buah buahan"
            className="w-full h-auto max-w-xl drop-shadow-xl"
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
