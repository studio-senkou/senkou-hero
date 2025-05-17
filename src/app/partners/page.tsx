import { Navbar } from "@hero/components/ui/navbar";

export default function Partners() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold">Our Partners</h1>
      <p className="mt-4 text-lg text-center">
        We are proud to collaborate with a diverse range of partners who share
        our commitment to excellence.
      </p>
    </div>
  );
}
