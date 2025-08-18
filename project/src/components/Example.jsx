// 'use client'

// import { useState } from 'react'
// import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import logo from './logo.png'

// const navigation = [
//   { name: 'Product', href: '#' },
//   { name: 'Features', href: '#' },
//   { name: 'Marketplace', href: '#' },
//   { name: 'Company', href: '#' },
// ]

// export default function Example() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   return (
//     <div className="bg-gray-900">
//       <header className="absolute inset-x-0 top-0 z-50">
//         <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
//           <div className="flex lg:flex-1">
//             <a href="#" className="-m-5 p-0  ">
//               <span className="sr-only">Your Company</span>
//               <img
//                 alt="Company Logo"
//                 src={logo}
//                 className="h-30 w-auto "
//               />
//             </a>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(true)}
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
//             >
//               <span className="sr-only">Open main menu</span>
//               <Bars3Icon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
//                 {item.name}
//               </a>
//             ))}
//           </div>
//           <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//             <a href="#" className="text-sm/6 font-semibold text-white">
//               Log in <span aria-hidden="true">&rarr;</span>
//             </a>
//           </div>
//         </nav>
//         <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//           <div className="fixed inset-0 z-50" />
//           <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
//             <div className="flex items-center justify-between">
//               <a href="#" className="-m-1.5 p-1.5">
//                 <span className="sr-only">Your Company</span>
//                 <img
//                   alt="Company Logo"
//                   src={logo}
//                   className="h-8 w-auto"
//                 />
//               </a>
//               <button
//                 type="button"
//                 onClick={() => setMobileMenuOpen(false)}
//                 className="-m-2.5 rounded-md p-2.5 text-gray-200"
//               >
//                 <span className="sr-only">Close menu</span>
//                 <XMarkIcon aria-hidden="true" className="size-6" />
//               </button>
//             </div>
//             <div className="mt-6 flow-root">
//               <div className="-my-6 divide-y divide-white/10">
//                 <div className="space-y-2 py-6">
//                   {navigation.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//                 <div className="py-6">
//                   <a
//                     href="#"
//                     className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
//                   >
//                     Log in
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </DialogPanel>
//         </Dialog>
//       </header>

//       <div className="relative isolate px-6 pt-14 lg:px-8">
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//         >
//           <div
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//             className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
//           />
//         </div>
//         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//           <div className="hidden sm:mb-8 sm:flex sm:justify-center">
//             <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
//               Announcing our next round of funding.{' '}
//               <a href="#" className="font-semibold text-indigo-400">
//                 <span aria-hidden="true" className="absolute inset-0" />
//                 Read more <span aria-hidden="true">&rarr;</span>
//               </a>
//             </div>
//           </div>
//           <div className="text-center">
//             <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
//               Data to enrich your online business
//             </h1>
//             <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
//               Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
//               fugiat veniam occaecat.
//             </p>
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <a
//                 href="#"
//                 className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
//               >
//                 Get started
//               </a>
//               <a href="#" className="text-sm/6 font-semibold text-white">
//                 Learn more <span aria-hidden="true">→</span>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//         >
//           <div
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//             className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { HomeIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function SpotifyClone() {
  const [playlists, setPlaylists] = useState([])

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121212] p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <HomeIcon className="h-6 w-6 text-white" />
            <span className="text-lg font-bold">Home</span>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
            <span className="text-lg font-bold">Search</span>
          </div>

          <h2 className="text-sm uppercase text-gray-400 mt-6 mb-2">Your Library</h2>
          <button
            onClick={() => setPlaylists([...playlists, `Playlist ${playlists.length + 1}`])}
            className="flex items-center space-x-2 text-white hover:text-green-400"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create playlist</span>
          </button>

          <div className="mt-4 space-y-2">
            {playlists.map((pl, i) => (
              <div key={i} className="text-gray-300 hover:text-white cursor-pointer">
                {pl}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Links */}
        <div className="text-xs text-gray-400 space-y-1">
          <a href="#">Legal</a> · <a href="#">Privacy</a> · <a href="#">Cookies</a>
          <div className="mt-2 border rounded-full px-2 py-1 w-fit">English</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-b from-[#1c1c1c] to-black overflow-y-auto p-6">
        {/* Top Navbar */}
        <div className="flex justify-end space-x-4 mb-6">
          <a href="#" className="text-gray-300 hover:text-white">Premium</a>
          <a href="#" className="text-gray-300 hover:text-white">Support</a>
          <a href="#" className="text-gray-300 hover:text-white">Download</a>
          <a href="#" className="bg-white text-black px-4 py-1 rounded-full font-bold">Log in</a>
        </div>

        {/* Trending Songs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Trending songs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {["Thodi Si Daaru", "Regardless", "Gabru!", "Wishes", "Jutti Meri"].map((song, i) => (
              <div key={i} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] cursor-pointer">
                <div className="w-full h-40 bg-gray-700 rounded mb-3"></div>
                <h3 className="font-semibold">{song}</h3>
                <p className="text-sm text-gray-400">Artist name</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Artists */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Popular artists</h2>
          <div className="flex space-x-6 overflow-x-scroll scrollbar-hide">
            {["Pritam", "Afusic", "Atif Aslam", "Shubh", "Anuv Jain"].map((artist, i) => (
              <div key={i} className="flex-shrink-0 text-center">
                <div className="w-32 h-32 rounded-full bg-gray-700 mb-3"></div>
                <p className="text-sm font-medium">{artist}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
