import { useEffect, useMemo, useState } from "react"
import Sidebar from "../components/Sidebar.jsx"
import Topbar from "../components/Topbar.jsx"
import AlbumCard from "../components/AlbumCard.jsx"
import ArtistAvatar from "../components/ArtistAvatar.jsx"

export default function Home() {
  const API = useMemo(() => import.meta.env.VITE_API_URL || "http://localhost:4000", [])
  const [trending, setTrending] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        setLoading(true)
        const [a, b] = await Promise.all([
          fetch(`${API}/browse/trending`).then(r => r.json()),
          fetch(`${API}/browse/popular-artists`).then(r => r.json()),
        ])
        if (!cancelled) {
          setTrending(a || [])
          setArtists(b || [])
        }
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [API])

  return (
    <div className="flex h-screen bg-black text-white">
      {/* LEFT: Sidebar */}
      <Sidebar />

      {/* RIGHT: Main */}
      <main className="flex-1 bg-gradient-to-b from-[#1c1c1c] to-black overflow-y-auto">
        <Topbar />

        <div className="px-6 pb-16">
          {error && (
            <div className="mb-6 rounded-md bg-red-500/20 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Trending songs */}
          <section className="mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trending songs</h2>
              <a className="text-sm text-gray-300 hover:text-white" href="#">
                Show all
              </a>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {(loading ? Array.from({ length: 5 }) : trending).map((item, i) => (
                <AlbumCard
                  key={item?.id || i}
                  title={item?.title}
                  subtitle={item?.artists?.join(", ")}
                  coverUrl={item?.coverUrl}
                  loading={loading}
                />
              ))}
            </div>
          </section>

          {/* Popular artists */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Popular artists</h2>
              <a className="text-sm text-gray-300 hover:text-white" href="#">
                Show all
              </a>
            </div>

            <div className="mt-4 flex gap-6 overflow-x-auto pb-2">
              {(loading ? Array.from({ length: 8 }) : artists).map((a, i) => (
                <ArtistAvatar
                  key={a?.id || i}
                  name={a?.name}
                  avatarUrl={a?.avatarUrl}
                  loading={loading}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
