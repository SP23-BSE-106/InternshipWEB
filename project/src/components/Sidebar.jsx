import { HomeIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function Sidebar() {
  const [playlists, setPlaylists] = useState([])

  return (
    <aside className="w-64 hidden md:flex flex-col justify-between bg-[#121212] p-4 border-r border-white/10">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <button className="flex items-center gap-3 hover:text-white text-gray-200">
            <HomeIcon className="h-6 w-6" />
            <span className="text-base font-semibold">Home</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-6">
          <button className="flex items-center gap-3 hover:text-white text-gray-200">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <span className="text-base font-semibold">Search</span>
          </button>
        </div>

        <h3 className="text-sm uppercase text-gray-400 tracking-wider mb-2">Your Library</h3>

        <button
          onClick={() => setPlaylists(p => [...p, `Playlist ${p.length + 1}`])}
          className="flex items-center gap-2 text-white hover:text-green-400 mb-3"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create playlist</span>
        </button>

        <div className="space-y-2">
          {playlists.length === 0 && (
            <div className="rounded-md bg-white/5 px-3 py-3 text-sm text-gray-300">
              Create your first playlist — it’s easy!
            </div>
          )}
          {playlists.map((pl, i) => (
            <div key={i} className="text-gray-300 hover:text-white cursor-pointer">
              {pl}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-400 space-y-1">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:text-white">Legal</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Cookies</a>
          <a href="#" className="hover:text-white">About Ads</a>
          <a href="#" className="hover:text-white">Accessibility</a>
        </div>
        <div className="mt-2 border border-white/20 rounded-full px-3 py-1 w-fit">English</div>
      </div>
    </aside>
  )
}
