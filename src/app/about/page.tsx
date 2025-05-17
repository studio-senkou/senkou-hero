import { Footer } from '@hero/components/footer'
import { Navbar } from '@hero/components/ui/navbar'
import { ADVANTAGES } from '@hero/constants/about'
import Image from 'next/image'

export default function About() {
  return (
    <main className="flex flex-col items-center mt-12 lg:mt-24">
      <Navbar />
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        <div className="flex flex-col items-start justify-center w-full md:max-w-2xl p-8">
          <h1 className="text-4xl font-bold">
            100% Trusted Organic Food Store
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Welcome to Hero, your trusted source for fresh, organic, and
            sustainably sourced foods. We are committed to providing the highest
            quality products while supporting local farmers and promoting
            healthy living. Discover our wide selection and experience the
            difference of truly organic food.
          </p>
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <Image
            src="/about/about-f1.png"
            alt="About Image"
            width={500}
            height={500}
            className="rounded-md w-full max-w-xs md:max-w-none"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row w-full gap-8 mt-24 border-b border-neutral-200">
        <div className="relative flex-1 flex items-center justify-center mb-8 md:mb-0 min-h-[400px]">
          <Image
            src="/about/about-f2.png"
            alt="About Image"
            fill
            className="object-cover"
            loading="lazy"
            style={{ minHeight: 400 }}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <Image
            src="/about/about-hero-f2.png"
            alt="About Overlay"
            fill
            className="absolute top-0 left-0 w-full h-full rounded-md object-contain pointer-events-none"
            loading="lazy"
            style={{ minHeight: 400 }}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="flex-1 flex flex-col items-start justify-center p-8">
          <h2 className="text-4xl font-bold">
            100% Trusted Organic Food Store
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            At Hero, our mission is to provide you with the freshest, most
            nutritious organic foods available. We believe in the power of
            healthy eating and its impact on your well-being. Our goal is to
            make organic food accessible to everyone, while also supporting
            sustainable farming practices that protect our planet.
          </p>
          <div className="flex flex-wrap gap-8 mt-4">
            {ADVANTAGES.map((advantage, index) => (
              <div key={index}>
                <div className="flex items-center gap-4 mt-4 w-auto">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 p-3 rounded-full">
                    <Image
                      src={advantage.icon}
                      alt={advantage.title}
                      width={36}
                      height={36}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#002603]">
                      {advantage.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {advantage.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-24">
        <div className="flex flex-col items-start justify-center w-full md:max-w-2xl p-8">
          <h1 className="text-4xl font-bold">
            100% Trusted Organic Food Store
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Welcome to Hero, your trusted source for fresh, organic, and
            sustainably sourced foods. We are committed to providing the highest
            quality products while supporting local farmers and promoting
            healthy living. Discover our wide selection and experience the
            difference of truly organic food.
          </p>
        </div>
        <div className="w-full md:w-auto flex justify-center">
          <Image
            src="/about/about-f3.png"
            alt="About Image"
            width={500}
            height={500}
            className="rounded-md w-full max-w-xs md:max-w-none"
            loading="lazy"
          />
        </div>
      </div>
      <Footer />
    </main>
  )
}
