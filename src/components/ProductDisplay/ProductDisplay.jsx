import React, { useContext } from 'react'
import './ProductDisplay.css'
import { PharmaContext } from '../../Context/PharmaContext'

const ProductDisplay = ({category}) => {

const {product_type} = useContext(PharmaContext)

  return (
    <div className='prod-display' id='prod-display'>

        <h2>Produts near you</h2>
        <div className="prod-display-list">
            {product_type.map((item,index)=>{
                return
            })}
        </div>

    </div>
  )
}

export default ProductDisplay