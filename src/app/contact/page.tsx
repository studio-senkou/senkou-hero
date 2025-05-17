import { Navbar } from "@hero/components/ui/navbar";

export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p className="mt-4 text-lg text-center">
        If you have any questions or inquiries, feel free to reach out to us.
      </p>
    </div>
  );
}
