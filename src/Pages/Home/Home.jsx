import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreProducts from '../../components/ExploreProducts/ExploreProducts'
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'

const Home = () => {

  const [category,setCategory] = useState("All") //passing this state variable as a prop in explore products component


  return (
    <div>
        <Header/>
        <ExploreProducts category={category} setCategory={setCategory}/>
        <ProductDisplay category={category}/>
    </div>
  )
}

export default Home