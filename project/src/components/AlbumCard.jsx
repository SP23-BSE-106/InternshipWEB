export default function AlbumCard({ title, subtitle, coverUrl, loading }) {
  if (loading) {
    return (
      <div className="bg-[#181818] p-4 rounded-lg animate-pulse">
        <div className="w-full aspect-square rounded mb-3 bg-white/10" />
        <div className="h-4 bg-white/10 rounded mb-2" />
        <div className="h-3 bg-white/10 rounded w-2/3" />
      </div>
    )
  }

  return (
    <div className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] cursor-pointer transition">
      <div className="w-full aspect-square rounded mb-3 overflow-hidden bg-white/10">
        {coverUrl ? (
          <img src={coverUrl} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      <h3 className="font-semibold truncate">{title}</h3>
      <p className="text-sm text-gray-400 truncate">{subtitle}</p>
    </div>
  )
}
