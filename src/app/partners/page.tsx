import { Footer } from '@hero/components/footer'
import { Navbar } from '@hero/components/ui/navbar'
import { getClients } from '@hero/lib/clients'
import Image from 'next/image'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function Partners() {
  const partners = await getClients()

  return (
    <div className="flex flex-col items-center justify-center w-full mt-40 overflow-hidden">
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
        {partners.map((partner) =>
          !partner.organization_name && !partner.organization_image ? null : (
            <div
              key={partner.id}
              className="relative flex flex-col items-center justify-center w-72 p-12 cursor-pointer mt-8 border border-neutral-200 rounded-lg group"
            >
              {partner.organization_image &&
              process.env.NEXT_PUBLIC_SUPABASE_S3 ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_S3}/clients/${partner.organization_image}`}
                  alt={
                    partner.organization_name ??
                    partner.client_name ??
                    'Partner Image'
                  }
                  width={150}
                  height={100}
                  className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
              ) : (
                <div className="flex items-center justify-center w-[150px] h-[100px]  text-neutral-800 text-3xl text-center font-bold object-contain transition-opacity duration-300 group-hover:opacity-0 rounded-lg">
                  {partner.organization_name}
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-start justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="text-2xl font-semibold">
                  {partner.organization_name}
                </h2>
                <p className="text-sm mt-3 text-neutral-400">
                  {/* {partner.description} */}
                  Description
                </p>
              </div>
            </div>
          ),
        )}
      </div>

      <Footer />
    </div>
  )
}
