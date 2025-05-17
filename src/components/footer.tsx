import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@hero/constants/footer";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center min-w-screen pb-10 bg-[#1A1A1A]">
      <section className="w-full p-8 bg-[#F2F2F2]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full md:max-w-3/4 mx-auto gap-4 md:gap-0">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <Image src="/leaf-x3.svg" alt="Leaf Icon" width={36} height={36} />
            <h2 className="text-3xl font-medium">Hero</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold">Subcribe our Newsletter</h3>
              <p className="text-sm text-neutral-400">
                Lorem Ipsum is simply dummy text of the printing.
              </p>
            </div>
            <div className="relative w-full max-w-xs p-5 md:p-0">
              <Input
                className="bg-white rounded-full pr-28 placeholder:text-neutral-400 w-full"
                placeholder="Your email address"
              />
              <Button className="absolute top-1/2 right-0 -translate-y-1/2 bg-[#00B207] text-white rounded-full px-4 py-2 font-regular hover:bg-[#00b206bb] transition">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full md:max-w-3/4 px-8 py-12 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-0">
          <div className="flex flex-col gap-4 max-w-lg md:max-w-sm mb-8 md:mb-0">
            <h3 className="text-xl font-semibold">About Hero</h3>
            <p className="text-sm text-neutral-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industries standard dummy text
              ever since the 1500s.
            </p>
            <div className="flex gap-2 items-center">
              <span>(219) 555-0114</span>
              <span className="text-neutral-400">or</span>
              <span>hero@gmail.com</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 md:gap-16 w-full md:w-auto">
            {FOOTER_LINKS.map((section) => (
              <nav key={section.title}>
                <h4 className="text-lg font-semibold mb-2">{section.title}</h4>
                <ul className="space-y-1 text-neutral-400">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="hover:text-white transition"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <hr className="my-8 mt-16 border-t border-neutral-700" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 order-2 md:order-1">
            {SOCIAL_LINKS.map((social) => (
              <Link key={social.label} href={social.href}>
                <social.icon />
              </Link>
            ))}
          </div>
          <p className="text-sm text-neutral-400 text-center flex-1 order-1 md:order-2">
            &copy; {new Date().getFullYear()} Hero. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
