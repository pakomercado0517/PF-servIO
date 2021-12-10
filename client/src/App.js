import './App.css';

import { Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import ProfileClient from './pages/ProfileClient';
import ProfileProfessional from './pages/ProfileProfessional';
import Register from './pages/Register';
import Login  from './components/Login';
import Nosotros from './pages/Nosotros.jsx';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/idClient" element={<ProfileClient />} />
      <Route exact path="/professional/:id" element={<ProfileProfessional />} />
      <Route exact path="/clients/idClient" element={<ProfileClient />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/nosotros" element={<Nosotros />} />
      {/* <Route exact path="/" element={<Home />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/" element={<Home />} /> */}

      <Route exact path="/login" element={<Login />} />
      
    </Routes>
  );
}

export default App;

