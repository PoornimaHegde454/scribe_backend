import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Search', to: '/search' },
]

export const Navbar = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll listener
  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset > 0)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!search.trim()) return
    navigate(`/search?q=${encodeURIComponent(search.trim())}`)
    setSearch('')
  }

  return (
    <header 
      className={`fixed top-0 z-40 w-full transition-colors duration-500 ${
        isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-[#E50914] hover:text-[#ff0a16]"
        >
          CINEPULSE
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition ${
                  isActive ? 'text-white font-bold' : 'text-[#e5e5e5] hover:text-[#b3b3b3]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
            <form
            onSubmit={handleSubmit}
            className={`hidden items-center gap-2 border transition-all duration-300 ${
                search ? 'border-white bg-black/80 px-2' : 'border-transparent px-0'
            } lg:flex`}
            >
            <button type="button" onClick={() => document.getElementById('search-input')?.focus()}>
                <FiSearch className="h-6 w-6 text-white" />
            </button>
            <input
                id="search-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className={`bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none transition-all duration-300 ${
                search ? 'w-64' : 'w-0 focus:w-64'
                }`}
                placeholder="Titles, people, genres"
            />
            </form>
             <button
            type="button"
            onClick={() => navigate('/search')}
            className="text-white lg:hidden"
            >
            <FiSearch className="h-6 w-6" />
            </button>
        </div>
      </div>
    </header>
  )
}

