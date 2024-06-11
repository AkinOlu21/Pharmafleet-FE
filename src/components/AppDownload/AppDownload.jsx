import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='appdownload'>
        <p>For Better Experience Download <br/> PharmaFleet App</p>
        <div className="app-platforms">
            <img src={assets.playstore} alt="" />
            <img src={assets.appstore} alt="" />
        </div>
    </div>
  )
}

export default AppDownload