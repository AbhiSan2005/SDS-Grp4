import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard.jsx'
import Members from './pages/AdminDashboard/Members.jsx'
import Projects from './pages/AdminDashboard/Projects.jsx'
import Events from './pages/AdminDashboard/Events.jsx'
import Reports from './pages/AdminDashboard/Reports.jsx'
import Files from './pages/AdminDashboard/Files.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/members" element={<Members />} />
        <Route path="/admin-dashboard/projects" element={<Projects />} />
        <Route path="/admin-dashboard/events" element={<Events />} />
        <Route path="/admin-dashboard/reports" element={<Reports />} />
        <Route path="/admin-dashboard/files" element={<Files />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App