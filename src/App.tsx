import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminPage } from '@/pages/AdminPage'
import { PublicPortfolioPage } from '@/pages/PublicPortfolioPage'

function App() {
  const basename = import.meta.env.BASE_URL === './' ? '/' : import.meta.env.BASE_URL

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<PublicPortfolioPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
