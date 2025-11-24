import { Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { MovieDetailsPage } from './pages/MovieDetailsPage'

const App = () => (
  <AppShell>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
    </Routes>
  </AppShell>
)

export default App
