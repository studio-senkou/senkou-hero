import { Footer } from '@hero/components/footer'
import { Partners } from '@hero/components/partners'
import { Services } from '@hero/components/services'
import { Testimonials } from '@hero/components/testimonials'
import { Button } from '@hero/components/ui/button'
import { LandingJumbotron } from '@hero/components/jumbotron'
import { Navbar } from '@hero/components/ui/navbar'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import { ProductCard } from '@hero/components/product'
import { getBestSellingProducts, getProducts } from '@hero/lib/products'

export default async function Home() {
  const products = await getProducts()
  const bestSellingProducts = getBestSellingProducts()

  console.log({ bestSellingProducts })

  return (
    <div className="overflow-hidden transition-all duration-500 ease-in-out">
      <Navbar />
      <div className="mt-24">
        <LandingJumbotron />
        <Services className="mt-8 lg:max-w-3/5 lg:relative lg:top-1/2 lg:left-1/2 lg:-translate-1/2 lg:shadow-lg lg:rounded-lg" />
      </div>

      <Partners className="mt-20" />

      <div className="flex flex-col items-center justify-center mt-20 w-full">
        <h2 className="text-3xl font-bold text-center mb-5">
          Features Products
        </h2>

        <section className="flex items-start gap-4 lg:max-w-3/4 w-full mx-auto overflow-x-auto px-4">
          {Array.from({ length: 7 }, (_, index) => (
            <ProductCard
              key={index}
              product={{
                id: '1',
                title: 'Organic Avocado',
                price: 2.99,
                unit: '500mg',
                discount: 5,
                images: [
                  'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
                ],
                description: 'Fresh organic avocado from local farms.',
                category: ['Fruits'],
              }}
            />
          ))}
        </section>

        <section className="flex flex-col sm:flex-row sm:justify-start items-stretch flex-wrap gap-4 w-full lg:max-w-3/4 mx-auto mt-8 px-4">
          <div className="flex flex-col gap-4 flex-1 min-w-60">
            <h3 className="text-xl font-semibold">Hot Deals</h3>
            {Array.from({ length: 3 }, (_, index) => (
              <ProductCard
                key={index}
                direction="row"
                className="min-w-60"
                product={{
                  id: '1',
                  title: 'Organic Avocado',
                  price: 2.99,
                  unit: '500mg',
                  discount: 5,
                  images: [
                    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
                  ],
                  description: 'Fresh organic avocado from local farms.',
                  category: ['Fruits'],
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4 flex-1 min-w-60">
            <h3 className="text-xl font-semibold">Hot Deals</h3>
            {Array.from({ length: 3 }, (_, index) => (
              <ProductCard
                key={index}
                direction="row"
                className="min-w-60"
                product={{
                  id: '1',
                  title: 'Organic Avocado',
                  price: 2.99,
                  unit: '500mg',
                  discount: 5,
                  images: [
                    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
                  ],
                  description: 'Fresh organic avocado from local farms.',
                  category: ['Fruits'],
                }}
              />
            ))}
          </div>
        </section>
      </div>

      <div className="min-w-screen bg-[#F0F5F1] p-4 md:p-16 mt-20">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
          <div className="relative flex-shrink-0 flex justify-center items-center mt-12 md:mt-0">
            <div className="relative z-10 flex flex-col-reverse md:flex-row items-start gap-4 justify-center">
              <Image
                src="/featured-x2.png"
                alt="Featured Products"
                width={180}
                height={300}
              />
              <Image
                src="/featured-x1.png"
                alt="Featured Products"
                width={300}
                height={350}
              />
            </div>

            <Image
              src="/leaf-blur-x1.png"
              alt="Object Leaf"
              className="absolute -top-14 left-20 z-0"
              width={120}
              height={120}
            />

            <Image
              src="/leaf-x2.png"
              alt="Object Leaf"
              className="absolute -bottom-1 -left-10 z-20"
              width={100}
              height={100}
            />
          </div>

          <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start py-2 md:px-4 m-2 flex-1 min-w-0 max-w-lg">
            <h3 className="flex flex-col text-3xl font-bold items-center lg:items-start">
              <span>100% Trusted</span>
              <span>Organic Food Store</span>
            </h3>
            <div className="flex flex-col gap-6 items-center justify-center mt-8 w-full md:max-w-xl">
              <div className="flex gap-2 items-start justify-center">
                <span className="w-6 h-6 rounded-full text-white bg-[#00B207] flex items-center justify-center mr-2 aspect-square">
                  <Check size={16} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-left">
                    Healthy & natural food for lovers of healthy food.
                  </h3>
                  <p className="text-xs text-gray-400 text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start justify-center">
                <span className="w-6 h-6 rounded-full text-white bg-[#00B207] flex items-center justify-center mr-2 aspect-square">
                  <Check size={16} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-left">
                    Every day fresh and quality products for you.
                  </h3>
                  <p className="text-xs text-gray-400 text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
            </div>
            <Button className="flex items-center max-w-fit rounded-full bg-[#00B207] mt-5 text-md font-normal hover:bg-[#00b206bb] text-white px-4 py-2">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Testimonials className="my-20" />
      <Footer />
    </div>
  )
}
