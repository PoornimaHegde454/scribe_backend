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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!search.trim()) return
    navigate(`/search?q=${encodeURIComponent(search.trim())}`)
    setSearch('')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-black/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 lg:px-0">
        <Link
          to="/"
          className="text-lg font-semibold tracking-[0.3em] text-white hover:text-red-400"
        >
          CINE<span className="text-sky-400">PULSE</span>
        </Link>
        <nav className="hidden gap-8 text-sm font-semibold text-white/70 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `uppercase tracking-[0.2em] transition ${
                  isActive ? 'text-white' : 'hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <form
          onSubmit={handleSubmit}
          className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/70 lg:flex"
        >
          <FiSearch className="text-white/50" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="bg-transparent text-white placeholder:text-white/40 focus:outline-none"
            placeholder="Search the multiverse"
          />
        </form>
        <button
          type="button"
          onClick={() => navigate('/search')}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/80 md:hidden"
        >
          Search
        </button>
      </div>
    </header>
  )
}

