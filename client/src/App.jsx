import React from 'react'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import Members_Admin from './pages/admin/members/ManageMembers.jsx'

import Projects_Admin from './pages/admin/projects/ManageProjects.jsx'
import AddProject from './pages/admin/projects/AddProject.jsx'
import ProjectViewPage from './pages/admin/projects/ProjectViewPage.jsx'
import EditProject from './pages/admin/projects/EditProject.jsx'

import Events_Admin from './pages/admin/events/ManageEvents.jsx'
import Reports_Admin from './pages/admin/reports/Reports.jsx'
import Files_Admin from './pages/admin/files/FileManager.jsx'
import HomePage from './pages/public/Home.jsx'
import About_Us from './pages/public/AboutUS.jsx'
import ContactUs from './pages/public/Contact_Us.jsx'
import Login from './pages/auth/Login.jsx'
import Events from './pages/public/Events.jsx'
import AddEventPage from './pages/admin/events/AddEvent.jsx'
import EditEventPage from './pages/admin/events/EditEvent.jsx'
import EventViewPage from './pages/admin/events/EventViewPage.jsx'
import Projects from './pages/public/Projects.jsx'
import Members from './pages/public/Members.jsx'
import AddMember from './pages/admin/members/AddNewMember.jsx'
import EditMemberPage from './pages/admin/members/UpdateMember.jsx'

import FacultyDashboard from './pages/faculty/Dashboard.jsx'
import Reports_Faculty from './pages/faculty/reports/ViewReports.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element = {<HomePage/>} />
        <Route path="/about" element = {<About_Us/>} />
        <Route path="/events" element = {<Events/>} />
        <Route path="/projects" element = {<Projects/>} />
        <Route path="/members" element = {<Members/>} />
        <Route path="/contact-us" element = {<ContactUs/>} />
        <Route path="/login" element = {<Login/>} />



        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/members" element={<Members_Admin />} />
        <Route path="/admin/add-member" element={<AddMember />} />
        <Route path="/admin/members/edit/:id" element={<EditMemberPage />} />

        <Route path="/admin/projects" element={<Projects_Admin />} />
        <Route path="/admin/add-project" element={<AddProject />} />
        <Route path="/admin/view-project/:id" element={<ProjectViewPage />} />
        <Route path="/admin/edit-project/:id" element={<EditProject />} />

        <Route path="/admin/events" element={<Events_Admin />} />
        <Route path="/admin/add-event" element={<AddEventPage />} />
        <Route path="/admin/edit-event/:id" element={<EditEventPage />} />
        <Route path="/admin/view-event/:id" element={<EventViewPage />} />


        <Route path="/admin/reports" element={<Reports_Admin />} />
        <Route path="/admin/files" element={<Files_Admin />} />

        <Route path="/faculty" element = {<FacultyDashboard/>} />
        <Route path="/faculty/reports" element = {<Reports_Faculty/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App