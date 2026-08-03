import { PlaneTakeoff } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto h-full flex items-center px-6">

        <div className="text-white max-w-3xl">

          <p className="uppercase tracking-[8px] text-yellow-400 mb-3">
            Explore The World
          </p>

          <h1 className="text-6xl font-black leading-tight mb-6">
            Travel Beyond <br /> Your Dreams
          </h1>

          <p className="text-xl text-gray-200 mb-10">
            Discover breathtaking destinations, luxury tours,
            unforgettable adventures, and customized holiday packages.
          </p>

          <div className="flex gap-5">

            <button className="bg-yellow-500 px-8 py-4 rounded-full text-black font-bold flex items-center gap-2">
              <PlaneTakeoff size={20} />
              Explore Tours
            </button>

            <button className="border border-white px-8 py-4 rounded-full">
              Learn More
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}