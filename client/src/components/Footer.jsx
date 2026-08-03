export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl text-white font-black">
            Shree SS Travel
          </h2>

          <p className="mt-4">
            Making every journey memorable with trusted travel services.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">
            Company
          </h3>

          <p>About</p>
          <p>Packages</p>
          <p>Contact</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">
            Support
          </h3>

          <p>Help Center</p>
          <p>Privacy Policy</p>
          <p>Terms</p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">
            Contact
          </h3>

          <p>Jaipur, Rajasthan</p>
          <p>+91 XXXXX XXXXX</p>
          <p>info@shreesstravel.com</p>
        </div>

      </div>

    </footer>
  );
}