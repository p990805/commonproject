import './App.css'
import Header from "./components/Header"
import MainPage from './pages/MainPage'
import Footer from"./components/Footer"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Individual from './components/signup/IndividualSignup'
import Institution from './components/signup/InstitutionSignup'


import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup/individual" element={<Individual />} />
        <Route path="/signup/institution" element={<Institution />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
