import React, { useContext, useState, useEffect} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { PharmaContext } from '../../Context/PharmaContext'


const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("home");
  const [userRole, setUserRole] = useState('')

  const {getTotalCartAmount,token,setToken} = useContext(PharmaContext)

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

  useEffect(() => {
const role = localStorage.getItem("User Role")
setUserRole(role)
  },[])

  return (
    <div className='navbar' >
   <Link to={'/'}>
    <img src={assets.Pharmafleet_logo} alt="" className="logo" />
   </Link> 

  {userRole==='Customer'  && (
    <ul className="nav-menu">
        <Link to={'/'} onClick={()=> setMenu("home")} className={menu=== "home"?"active": "" }>Home</Link>
        <a href='#explore-products' onClick={()=> setMenu("products")} className={menu=== "products"?"active": ""}>Products</a>
        <a href='#app-download' onClick={()=> setMenu("mobile app")} className={menu=== "mobile app"?"active": ""}>Mobile App</a>
        <Link to={'/prescription'} onClick={()=> setMenu("prescription")} className={menu=== "prescription"?"active": "" }>Prescription</Link>
        <a  href='#footer' onClick={()=> setMenu("contact us")} className={menu=== "contact us"?"active": ""}>Contact us</a>
    </ul>
  )}
    

    <div className="nav-right">
       { userRole === 'Customer' && (
 <img src={assets.search_icon} alt='search'/>
      )}
    <div className="nav-search-icon">
     { userRole === 'Customer' && (
      <Link to={'/cart'}> <img src={assets.basket_icon} alt='basket'/></Link>)}
  
        <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div> 
        {!token?<button onClick={()=>setShowLogin(true)} >Sign in</button>
        : <div className="nav-profile">
          <img src={assets.profile} alt=''/>
          <ul className='nav-profile-dropdown'>
            { userRole ==='Customer'  && (
              <>
              <li onClick={()=>navigate('/myorders')}> <img src={assets.orderbag} alt="" /><p>orders</p></li>
            <li onClick={()=>navigate('/myprescriptionorders')}> <img src={assets.orderbag} alt="" /><p>Prescription Orders</p></li>
            <hr />
              </>
            )}
            
            <li onClick={logout}><img src={assets.logout} alt="" /><p>Logout</p></li>
          </ul>
        </div> }
        
    </div>
        
        </div>
  )
}

export default Navbar