import Link from "next/link";

export default function Home() {
  return (
    <main className="pt-4 px-4 h-full w-full">
      <div className="bg-black">
        <h1 className="text-white text-4xl font-bold p-4">Orderly</h1>
      </div>
      <div className="min-h-[calc(100vh-100px)] w-full flex flex-col items-center justify-center gap-y-6">
        <h1 className="font-bold text-5xl">Welcome!</h1>
        <p className="w-full lg:max-w-3xl text-center text-lg">
          <strong>Orderly</strong> is an E-commerce Management System designed
          to bring harmony and efficiency to your business operations:{" "}
          <strong>
            content and product management, order management, inventory
            management, and accounting.
          </strong>{" "}
          With Orderly, your business, in perfect order, is no longer a dream,
          it's your new reality.
        </p>
        <Link
          href="/signin"
          className="border py-2 px-4 font-medium rounded-md border-neutral-300 hover:border-black transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
