import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes'
import DoctorPage from './Pages/Doctor/DoctorPage'
import DriverPage from './Pages/Driver/DriverPage'
import Prescription from './Pages/Prescription/Prescription'
import PrescriptionSuccess from './components/PrescriptionSuccess/PrescriptionSuccess'
const App = () => {

const [showLogin,setShowLogin] = useState(false)

  return (
    <> 
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>} 
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>}/>

        <Route element={<ProtectedRoute allowedRoles={['GP']} />}>
        <Route  path='/doctor' element={<DoctorPage/>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['Driver']} />}>
        <Route  path='/driver' element={<DriverPage/>} />
        </Route>
        
        <Route element={<ProtectedRoute allowedRoles={['Customer']} />}>
        <Route  path='/prescription' element={<Prescription/>} />
        <Route path='/prescriptionsuccess' element={<PrescriptionSuccess/>} />
        </Route>

        




      </Routes>
      </div>

      <Footer/>
    </>
   
  )
}

export default App