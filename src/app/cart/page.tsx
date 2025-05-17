import { Navbar } from "@hero/components/ui/navbar";

export default function Cart() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold">Cart</h1>
      <p className="mt-4 text-lg text-center">
        Your cart is currently empty. Start shopping to fill it up!
      </p>
    </div>
  );
}
