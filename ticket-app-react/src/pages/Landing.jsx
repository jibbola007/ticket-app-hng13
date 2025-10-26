import { Link } from "react-router-dom";
import wave from "/shared-assets/wave.svg"; // Make sure this file exists!

export default function Landing() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center py-24 px-6 max-w-1440 mx-auto">
        {/* Decorative Circle */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-300 rounded-full opacity-30 blur-3xl"></div>

        {/* Title + Subtitle */}
        <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">
          TicketFlow
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
          Seamlessly manage, track, and resolve your support tickets — all in one
          smart workspace.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/auth/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
          >
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl shadow transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Wave SVG Footer Decoration */}
      <img
        src={wave}
        alt=""
        className="absolute bottom-0 left-0 w-full select-none pointer-events-none"
      />

      {/* Footer */}
      <footer className="relative z-10 bg-blue-900 text-white py-6 text-center text-sm">
        © {new Date().getFullYear()} TicketFlow. All rights reserved.
      </footer>
    </main>
  );
}
