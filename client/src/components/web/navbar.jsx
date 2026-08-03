import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <h1 className="text-3xl font-black text-blue-700">
          Shree SS Travel
        </h1>

        <ul className="hidden md:flex gap-10 font-medium">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Destinations</li>
          <li className="hover:text-blue-600 cursor-pointer">Packages</li>
          <li className="hover:text-blue-600 cursor-pointer">Services</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>

        <button className="hidden md:block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
          Book Now
        </button>

        <Menu className="md:hidden" />
      </div>
    </nav>
  );
}