import { Navbar } from './Navbar'

type Props = {
  children: React.ReactNode
}

export const AppShell = ({ children }: Props) => (
  <div className="min-h-screen bg-[#050505] text-white">
    <Navbar />
    <main className="mx-auto max-w-6xl px-4 py-8 lg:px-0">{children}</main>
  </div>
)

