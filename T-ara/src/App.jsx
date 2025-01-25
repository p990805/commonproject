import './App.css'
import Header from "./components/Header"
import MainPage from './pages/MainPage'
import Footer from"./components/Footer"


import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
