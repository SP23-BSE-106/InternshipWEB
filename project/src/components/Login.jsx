export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="bg-[#121212] p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Log in</h1>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  )
}
