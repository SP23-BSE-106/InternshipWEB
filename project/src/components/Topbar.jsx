import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-10 bg-gradient-to-b from-black/60 to-transparent backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="flex justify-end items-center gap-4 px-6 py-4">
        <a href="#" className="text-gray-300 hover:text-white">Premium</a>
        <a href="#" className="text-gray-300 hover:text-white">Support</a>
        <a href="#" className="text-gray-300 hover:text-white">Download</a>
        <div className="h-6 w-px bg-white/20" />
        <Link
          to="/auth"
          className="rounded-full bg-white text-black px-4 py-1.5 font-bold hover:scale-[1.02] transition"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
