import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import PassReset from './components/PassReset'
import ForgotPass from './components/ForgotPass'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-pass' element={<ForgotPass />} />
        <Route path='/set-password/:token' element={<PassReset />} /> 
        <Route path='/' element={<Home />} />

      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
