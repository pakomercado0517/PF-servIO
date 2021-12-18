import './App.css';
// Router-dom
import { Route, Routes } from 'react-router-dom';
import ProfessionalSpecificActivity from "./components/ProfessionalSpecificActivity";
import Home from './pages/Home';
import NavBar from './components/NavBar';
import ProfileClient from './pages/ProfileClient';
import ProfileProfessional from './pages/ProfileProfessional';
import Register from './pages/Register';
import Login  from './components/Login';
import Nosotros from './pages/Nosotros.jsx';
import HomeProfessional from './components/HomeProfessional';
import { ProfessionalOfferToClientNeed } from './components/ProfessionalOfferToClientNeed';
import { ProfessionalServiceOffer } from './components/ProfessionalServiceOffer';
import EditPodeddional from './pages/EditPodeddional';
import Cart from './components/Cart';

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
        <Route exact path="/cart/" element={<Cart />} />
        <Route exact path="/homeprofessional" element={<HomeProfessional />} />
        <Route exact path="/editProfessional" element={<EditPodeddional />} />

        {/* tests */}
        <Route
          exact
          path="/offerprofessional"
          element={<ProfessionalOfferToClientNeed />}
        />
        <Route
          exact
          path="/ProfessionalServiceOffer"
          element={<ProfessionalServiceOffer />}
        />
        <Route
          exact
          path="/TecnicalsActivities/:id"
          element={<ProfessionalSpecificActivity />}
        />
      </Routes>
    </>
  );
}

export default App;
