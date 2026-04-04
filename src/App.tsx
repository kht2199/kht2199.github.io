import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CareerOntologyPage } from '@/pages/CareerOntologyPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { PublicPortfolioPage } from '@/pages/PublicPortfolioPage'

function App() {
  const basename = import.meta.env.BASE_URL === './' ? '/' : import.meta.env.BASE_URL

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<PublicPortfolioPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/notes/career-ontology" element={<CareerOntologyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
