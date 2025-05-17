import { Navbar } from "@hero/components/ui/navbar";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold">About Us</h1>
      <p className="mt-4 text-lg text-center">
        We are a team of passionate individuals dedicated to providing the best
        products and services to our customers.
      </p>
    </div>
  );
}
