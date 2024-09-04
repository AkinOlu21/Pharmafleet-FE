import React, { useContext } from 'react'
import './ProductDisplay.css'
import { PharmaContext } from '../../Context/PharmaContext'
import ProductItems from '../Product/ProductItems'

const ProductDisplay = ({category}) => {

const {product_type} = useContext(PharmaContext)

  return (
    <div className='prod-display' id='prod-display'>

        <h2>PRODUCTS FOR YOU </h2>
        <div className="prod-display-list">
            {product_type.map((item,index)=>{
              if (category==="All" || category===item.category) {
              
                return <ProductItems key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />

              }
            })}
        </div>

    </div>
  )
}

export default ProductDisplay