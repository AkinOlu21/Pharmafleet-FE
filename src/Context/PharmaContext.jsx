import { createContext, useEffect, useState } from "react";
export const PharmaContext = createContext(null) //Creating context api
import axios from "axios";
const PharmaContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [token,setToken] = useState("");
    const url = "http://localhost:4000";
    const [product_type,setProductType] = useState([])




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


    const fetchProductType = async () => {
        const response = await axios.get(url+"/api/product/list");
        setProductType(response.data.data)
    }

   //preventing logout from happening when refresh button is hit
useEffect(()=>{
    async function loadData() {
        await fetchProductType();
         if (localStorage.getItem("token"))
            {
        setToken(localStorage.getItem("token"));
    }
    }
   
    loadData();
},[])

const contextValue ={ //variable

    product_type,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    url
}

return (
    <PharmaContext.Provider value={contextValue}>
        {props.children}
    </PharmaContext.Provider>
)

}

export default PharmaContextProvider