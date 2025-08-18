export default function ArtistAvatar({ name, avatarUrl, loading }) {
  if (loading) {
    return (
      <div className="flex-shrink-0 w-32 text-center">
        <div className="w-32 h-32 rounded-full bg-white/10 animate-pulse mb-3" />
        <div className="h-4 bg-white/10 rounded mx-auto w-20" />
      </div>
    )
  }

  return (
    <div className="flex-shrink-0 w-32 text-center">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10 mb-3">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>
      <p className="text-sm font-medium truncate">{name}</p>
    </div>
  )
}
