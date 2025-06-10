import { Footer } from '@hero/components/footer'
import { Navbar } from '@hero/components/ui/navbar'
import { ContactForm } from '@hero/components/contact-form'
import Image from 'next/image'

export default function Contact() {
  return (
    <main className="flex flex-col items-center mt-40 overflow-hidden">
      <Navbar />
      <div className="w-full max-w-[90vw] md:max-w-3/4 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          Can’t Help Hearing from You!
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700 text-center md:text-left">
          We would be glad if you want to take your time to fill out this
          following form and share any inquiries about the site. You can also
          contact us via call or email using the information below.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-8 mt-8 md:mt-12 w-full max-w-[90vw] md:max-w-3/4 mb-8 md:mb-12 px-4">
        <div className="flex flex-col items-center justify-center gap-6 flex-1 md:max-w-2xl p-4 md:p-8 shadow-sm rounded-xl bg-white h-full">
          <div className="flex flex-col items-center">
            <Image
              src="/services/service-xx7.svg"
              alt="Contact Us"
              width={48}
              height={48}
            />
            <p className="mt-4 text-base md:text-lg text-gray-700 text-center">
              Hero@gmail.com
            </p>
          </div>
          <hr className="border-t border-neutral-200 w-full" />
          <div className="flex flex-col items-center">
            <Image
              src="/services/phone-xx8.svg"
              alt="Contact Us"
              width={48}
              height={48}
            />
            <div className="flex flex-col gap-1 items-center mt-4">
              <p className="text-base md:text-lg text-center">(219) 555-0114</p>
              <p className="text-base md:text-lg text-center">
                Monday - Friday
              </p>
              <p className="text-base md:text-lg text-center">
                9:00 - 5:00 GMT
              </p>
            </div>
          </div>
        </div>{' '}
        <ContactForm />
      </div>
      <Footer />
    </main>
  )
}
