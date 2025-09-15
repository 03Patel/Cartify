import React from 'react'
import ProductList from './ProductList'
import NavBar from './show/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './show/SignUp'
import Login from './show/Login'

function App() {
  return (
    <BrowserRouter>
      <NavBar /> {/* optional, if you want navbar on all pages */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/createuser" element={<SignUp />} />
        <Route path="/loginuser" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
