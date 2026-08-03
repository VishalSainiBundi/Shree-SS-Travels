const places = [
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Goa",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    title: "Dubai",
  },
  {
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
    title: "Bali",
  },
];

export default function Destinations() {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-black text-center mb-16">
          Popular Destinations
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {places.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src={item.image}
                className="h-80 w-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}