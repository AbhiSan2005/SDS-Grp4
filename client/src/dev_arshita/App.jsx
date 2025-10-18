import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Sidebar from './components/sideBar';
import HeroContent from './components/heroContent.jsx';
import Background from './components/Background.jsx';
import "./App.css";

function App() {
  return (
    <>
        <Background />
        <Sidebar />
        <HeroContent />
     
    </>
  );
}

export default App;
