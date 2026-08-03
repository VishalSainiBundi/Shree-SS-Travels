import {
  Plane,
  Hotel,
  Car,
  Shield,
} from "lucide-react";

const data = [
  {
    icon: Plane,
    title: "Flight Booking",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
  },
  {
    icon: Car,
    title: "Car Rental",
  },
  {
    icon: Shield,
    title: "Travel Insurance",
  },
];

const Services = () => {
  return (
    <section className="bg-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-16">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <Icon
                  size={50}
                  className="mx-auto text-blue-600 mb-6"
                />

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;