import { Footer } from '@hero/components/footer'
import { Navbar } from '@hero/components/ui/navbar'
import { getPartners } from '@hero/lib/partners'
import Image from 'next/image'

export default async function Partners() {
  const partners = await getPartners()

  return (
    <div className="flex flex-col items-center justify-center w-full mt-32">
      <Navbar />

      <div className="w-full max-w-[90vw] md:max-w-3/4 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Hero Partner
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700 text-center">
          Welcome to Hero, your trusted source for fresh, organic, and
          sustainably sourced foods. We are committed to providing the highest
          quality products while supporting local farmers and promoting healthy
          living. Discover our wide selection and experience the difference of
          truly organic food.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-24 justify-center max-w-4xl w-full">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="relative flex flex-col items-center justify-center w-72 p-12 cursor-pointer mt-8 border border-neutral-200 rounded-lg group"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={150}
              height={100}
              className="object-contain transition-opacity duration-300 group-hover:opacity-0"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-2xl font-semibold">{partner.name}</h2>
              <p className="text-sm mt-3 text-neutral-400">
                {partner.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}
