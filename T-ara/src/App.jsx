import './App.css'
import Header from "./components/Header"
import MainPage from './pages/MainPage'
import Footer from"./components/Footer"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Individual from './components/signup/IndividualSignup'
import Institution from './components/signup/InstitutionSignup'
import SuccessfulSignup from './components/signup/SuccessfulSignup'
import ShelterPage from './pages/ShelterPage'
import LocationsPage from './pages/LocationsPage'
import CommunityPage from './pages/CommunityPage'
import MyPage from './pages/MyPage'



import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/signup/individual" element={<Individual />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/shelters" element={<ShelterPage/>} />
        <Route path="/signup/institution" element={<Institution />} />
        <Route path="/signup/successfulsignup" element={<SuccessfulSignup />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
