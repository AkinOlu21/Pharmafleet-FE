import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { PharmaContext } from '../../Context/PharmaContext'


const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("home");

  const {getTotalCartAmount} = useContext(PharmaContext)

  return (
    <div className='navbar' >
   <Link to={'/'}><img src={assets.Pharmafleet_logo} alt="" className="logo" /></Link> 
    <ul className="nav-menu">
        <Link to={'/'} onClick={()=> setMenu("home")} className={menu=== "home"?"active": ""}>Home</Link>
        <a href='#explore-products' onClick={()=> setMenu("products")} className={menu=== "products"?"active": ""}>Products</a>
        <a href='#app-download' onClick={()=> setMenu("mobile app")} className={menu=== "mobile app"?"active": ""}>Mobile App</a>
        <a  href='#footer' onClick={()=> setMenu("contact us")} className={menu=== "contact us"?"active": ""}>Contact us</a>
    </ul>

    <div className="nav-right">
       <img src={assets.search_icon} alt='search'/>
    
    <div className="nav-search-icon">
        <Link to={'/cart'}> <img src={assets.basket_icon} alt='basket'/></Link>
        <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div> 
        <button onClick={()=>setShowLogin(true)} >Sign in</button>
    </div>
        
        </div>
  )
}

export default Navbar