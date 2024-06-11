import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-content">

            <div className="footer-content-left">
                <img  src={assets.Pharmafleet_logo} alt="" />
                <p>dummy text</p>
                <div className="footer-social-icons">
                    <img src={assets.X_icon} alt="" />
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.insta_icon} alt="" />
                </div>
            </div>

             <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>


            <div className="footer-content-right">
                <h2>Get In touch</h2>
                <ul>
                    <li>07376157493</li>
                    <li>contactus@pharmafleet.com</li>
                </ul>
            </div>

           


        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 PharmaFleet.con - All Rights Reserved.</p>
    </div>
  )
}

export default Footer