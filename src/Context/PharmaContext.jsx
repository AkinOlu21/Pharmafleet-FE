import { createContext, useEffect, useState } from "react";
import { product_type } from "../assets/assets";

export const PharmaContext = createContext(null) //Creating context api

const PharmaContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});


    const addToCart = (itemID) => {
        if (!cartItems[itemID]) {
            setCartItems((prev)=>({...prev,[itemID]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemID]:prev[itemID]+1}))
        }
    }




    const removeFromCart = (itemID) => {
        setCartItems((prev)=>({...prev,[itemID]:prev[itemID]-1}))
    }


    useEffect(()=>{
      console.log(cartItems);
    },[cartItems])


const contextValue ={ //variable

    product_type,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart
}

return (
    <PharmaContext.Provider value={contextValue}>
        {props.children}
    </PharmaContext.Provider>
)

}

export default PharmaContextProvider