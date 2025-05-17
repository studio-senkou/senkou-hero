import { Navbar } from "@hero/components/ui/navbar";

export default function Products() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold">Products</h1>
      <p className="mt-4 text-lg text-center">
        Explore our wide range of products designed to meet your needs.
      </p>
    </div>
  );
}
