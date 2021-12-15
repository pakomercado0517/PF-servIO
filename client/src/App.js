import './App.css';

import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import ProfileClient from './pages/ProfileClient';
import ProfileProfessional from './pages/ProfileProfessional';
import Register from './pages/Register';
import Login  from './components/Login';
import Nosotros from './pages/Nosotros.jsx';
import HomeProfessional from './components/HomeProfessional';
import NavBar from './components/NavBar';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/nosotros" element={<Nosotros />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/clients/:idClient" element={<ProfileClient />} />
        <Route exact path="/professional/:id" element={<ProfileProfessional />} />
          
        <Route exact path="/homeprofessional" element={<HomeProfessional />} />
        
      </Routes>
    </>
  );
}

export default App;

