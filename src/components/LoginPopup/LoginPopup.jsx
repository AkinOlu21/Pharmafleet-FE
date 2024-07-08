import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { PharmaContext } from '../../Context/PharmaContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(PharmaContext)


    const [currState,setCurrState] = useState("Login")

    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

const onChangeHandler = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
}


    const onLogin = async (event) =>{
        event.preventDefault()
        let newURL = url;
        if(currState==="Login"){
            newURL += "/api/user/login"
        }
        else{
            newURL += "/api/user/register"
        }
        const response  = await axios.post(newURL,data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        } else{
            alert(response.data.message)
        }

    }

    useEffect(()=>{
        console.log(data);
    },[data])

  return (
    <div className='Login-Popup'>
        <form onSubmit={onLogin} className='login-pop-container'>
            <div className="login-pop-title">
                <h2>{currState}</h2>
                <img  onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-pop-inputs">
                {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name'  required />}

                <input name='email'onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required /> 
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your Password' required />       
                </div>
                <button type='submit' >{currState==="Sign Up"?"Create accoount":"Login"}</button>
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