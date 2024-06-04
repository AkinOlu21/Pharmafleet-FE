import React from 'react'
import './ExploreProducts.css'
import { product_list } from '../../assets/assets'

const ExploreProducts = ({category,setCategory}) => {
  return (
    <div className='explore-products' id='explore-products'>
        <h1>Explore our products</h1>
        <p className='explore-products-text'>Choose from Pharma Fleets diverse range of products</p>
        <div className='explore-products-list' >
            {product_list.map((item, index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.product_name?"All":item.product_name)} key={index} className='explore-products-list-item'> 
                    <img className={category===item.product_name?"active":""} src={item.product_image} alt='products' />
                    <p> {item.product_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreProducts