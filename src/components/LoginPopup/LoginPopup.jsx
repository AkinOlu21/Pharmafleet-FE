import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {

    const [currState,setCurrState] = useState("Login")

  return (
    <div className='Login-Popup'>
        <form className='login-pop-container'>
            <div className="login-pop-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-pop-inputs">
                {currState==="Login"?<></>:<input type="text" placeholder='Your name'  required />}
                {currState==="Login"?<></>:<input type="text" placeholder='Your name'  required />}

                <input type="email" placeholder='Your Email' required /> 
                <input type="password" placeholder='Your Password' required />       
                </div>
                <button>{currState==="Sign Up"?"Create accoount":"Login"}</button>
                <div className="login-pop-condition">
                    <input type="checkbox" required />
                    <p>By continuing you agree to the terms and of use and privacy Policy.</p>
                </div>
                {currState==="Login"
                ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")} >Click Here</span></p>
                :<p>Already Have an account? <span onClick={()=>setCurrState("Login")} >Login Here</span></p>


                }
        </form>
    </div>
  )
}

export default LoginPopup