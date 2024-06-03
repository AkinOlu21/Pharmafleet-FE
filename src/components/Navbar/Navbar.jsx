import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'


const Navbar = () => {

  const [menu, setMenu] = useState("home")

  return (
    <div className='navbar' >
    <img src={assets.Pharmafleet_logo} alt="" className="logo" />
    <ul className="nav-menu">
        <li onClick={()=> setMenu("home")} className={menu=== "home"?"active": ""}>Home</li>
        <li onClick={()=> setMenu("menu")} className={menu=== "menu"?"active": ""}>Menu</li>
        <li onClick={()=> setMenu("mobile app")} className={menu=== "mobile app"?"active": ""}>Mobile App</li>
        <li onClick={()=> setMenu("contact us")} className={menu=== "contact us"?"active": ""}>Contact us</li>
    </ul>

    <div className="nav-right">
       <img src={assets.search_icon} alt='search'/>
    
    <div className="nav-search-icon">
        <img src={assets.basket_icon} alt='basket'/>
        <div className="dot"></div>
        </div> 
        <button>Sign in</button>
    </div>
        
        </div>
  )
}

export default Navbar