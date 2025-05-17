"use client";

import { Footer } from "@hero/components/footer";
import { Partners } from "@hero/components/partners";
import { Services } from "@hero/components/services";
import { Testimonials } from "@hero/components/testimonials";
import { Button } from "@hero/components/ui/button";
import { LandingJumbotron } from "@hero/components/jumbotron";
import { Navbar } from "@hero/components/ui/navbar";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-hidden transition-all duration-500 ease-in-out">
      <Navbar />
      <div className="relative mt-20">
        <LandingJumbotron />
        <Services className="absolute left-1/2 -translate-1/2 -bottom-24" />
      </div>

      <Partners className="mt-32" />

      <div className="min-w-screen bg-[#F0F5F1] p-16 mt-20">
        <div className="flex gap-8 items-start max-w-6xl mx-auto">
          <div className="relative flex-shrink-0">
            <div className="relative z-10 flex flex-row items-start gap-4">
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

          <div className="flex flex-col items-start justify-center py-2 px-4 m-2 flex-1 min-w-0">
            <h3 className="flex flex-col text-3xl font-bold">
              <span>100% Trusted</span>
              <span>Organic Food Store</span>
            </h3>
            <div className="flex flex-col gap-6 items-start justify-center mt-8 max-w-xl">
              <div className="flex gap-2 items-start">
                <span className="w-6 h-6 rounded-full text-white bg-[#00B207] flex items-center justify-center mr-2 aspect-square">
                  <Check size={16} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">
                    Healthy & natural food for lovers of healthy food.
                  </h3>
                  <p className="text-xs text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <span className="w-6 h-6 rounded-full text-white bg-[#00B207] flex items-center justify-center mr-2 aspect-square">
                  <Check size={16} />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">
                    Every day fresh and quality products for you.
                  </h3>
                  <p className="text-xs text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
            </div>
            <Button className="max-w-fit rounded-full bg-[#00B207] mt-6 text-xs font-normal px-6 py-2">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Testimonials className="mt-20" />
      <Footer />
    </div>
  );
}
