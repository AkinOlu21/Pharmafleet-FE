import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreProducts from '../../components/ExploreProducts/ExploreProducts'

const Home = () => {

  const [category,setCategory] = useState("All")


  return (
    <div>
        <Header/>
        <ExploreProducts/>
    </div>
  )
}

export default Home