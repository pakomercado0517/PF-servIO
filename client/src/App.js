import './App.css';
import { useGlobalStorage } from './hooks/useGlobalStorage';
// Router-dom
import { Route, Routes, Navigate } from 'react-router-dom';
import ProfessionalSpecificActivity from "./pages/ProfessionalSpecificActivity";
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
import DetailsClientNeed from './pages/DetailsClientNeed';
import Cart from './components/Cart';
import EditUser from './pages/EditUser';
import { OffersToSpecificClientsNeeds } from './pages/OffersToSpecificClientsNeeds';
import ServiceHistory from './pages/ServiceHistory';
import { ClientSpecificNeedEdit } from './components/ClientSpecificNeedEdit';
import ProfessionalSpecificActivityEdit from './pages/ProfessionalSpecificActivityEdit';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import ActivateAccount from './pages/ActivateAccount';

function App() {
  const [globalUser,setGlobalUser ] = useGlobalStorage("globalUser", "")
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/nosotros" element={<Nosotros />} />
        <Route exact path="/login" element={globalUser !=='' ? <Navigate to='/'/> : <Login />}/>
        <Route exact path="/activate/:token" element={globalUser !=='' ? <Navigate to='/'/> :<ActivateAccount />} />
        <Route exact path="/forget-password" element={globalUser !=='' ? <Navigate to='/'/> :<ForgetPassword />} />
        <Route exact path="/forget-password/:token" element={globalUser !=='' ? <Navigate to='/'/> :<ResetPassword />} />
        <Route exact path="/register" element={globalUser !=='' ? <Navigate to='/'/> : <Register />} />
        <Route exact path="/clients/:idClient" element={globalUser ==='' ? <Navigate to='/login'/> :<ProfileClient />} />
        <Route exact path="/professional/:id" element={globalUser ==='' ? <Navigate to='/login'/> :<ProfileProfessional />} />
        <Route exact path="/cart/" element={<Cart />} />
        {/* <Route exact path="/homeprofessional" element={<HomeProfessional />} /> */}
        <Route exact path="/editUser" element={globalUser ==='' ? <Navigate to='/login'/> :<EditUser />} />
        <Route exact path="/service-history/:id" element={globalUser ==='' ? <Navigate to='/login'/> : <ServiceHistory />} />
        <Route
          exact path="/ProfessionalServiceOffer"
          element={globalUser === '' ? <Navigate to='/login'/> :<ProfessionalServiceOffer />}
        />
        <Route
          exact path="/ProfessionalOfferToClientNeed/:idClientNeed"
          element={globalUser ==='' ? <Navigate to='/login'/> :<ProfessionalOfferToClientNeed />}
        />
        <Route
          exact path="/professional/:idProfessional/SpecificActivity/:id"
          element={globalUser ==='' ? <Navigate to='/login'/> :<ProfessionalSpecificActivity />}
        />
        <Route
          exact path="/professional/activity/edit/:id"
          element={globalUser ==='' ? <Navigate to='/login'/> :<ProfessionalSpecificActivityEdit />}
        />
        <Route
          exact path="/client/need/:id"
          element={globalUser ==='' ? <Navigate to='/login'/> :<DetailsClientNeed />}
        />
        <Route
          exact path="/client/offerToNeed/:id"
          element={globalUser ==='' ? <Navigate to='/login'/> :<OffersToSpecificClientsNeeds />}
        />
        <Route
          exact path="/client/:userId/edit/:publicationId"
          element={globalUser ==='' ? <Navigate to='/login'/> :<ClientSpecificNeedEdit />}
        />
        
      </Routes>
    </>
  );
}

export default App;
