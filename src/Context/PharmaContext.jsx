import { createContext, useEffect, useState } from "react";
import { product_type } from "../assets/assets";
export const PharmaContext = createContext(null) //Creating context api

const PharmaContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [token,setToken] = useState("");





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


   const getTotalCartAmount = () =>{
    let totalAmount = 0
    for(const item in cartItems)
        {
            if (cartItems[item]>0){

                let itemInfo = product_type.find((product)=>product._id === item)
            totalAmount += itemInfo.price* cartItems[item]

            }
        }
        return totalAmount
   }

const contextValue ={ //variable

    product_type,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken
}

return (
    <PharmaContext.Provider value={contextValue}>
        {props.children}
    </PharmaContext.Provider>
)

}

export default PharmaContextProvider