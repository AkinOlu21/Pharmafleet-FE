import React, { useContext} from 'react'
import './ProductItems.css'
import { assets } from '../../assets/assets'
import { PharmaContext } from '../../Context/PharmaContext'

const ProductItems = ({id, name, price, description, image}) => {

const{cartItems,addToCart,removeFromCart} = useContext(PharmaContext)

  return (
    <div className='prod-item'>

        <div className="prod-item-img-container">
            <img className='prod-item-image' src={image} alt="" />
            {!cartItems[id]
            ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon}/>
            :<div className='prod-item-counter' >
              <img onClick={()=>removeFromCart(id)} src={assets.remove_icon} alt="" />
              <p>{cartItems[id]}</p>
              <img onClick={()=>addToCart(id)} src={assets.add_icon}/>
            </div>
              
            }
        </div>
        <div className="prod-item-info">
            <div className="prod-item-name-rating">
                <p>{name}</p>
                <img src=""alt="" />
            </div>
            <p className="prod-item-desc">{description}</p>
            <p className="prod-item-price">${price}</p>
        </div>
    </div>
  )
}

export default ProductItems