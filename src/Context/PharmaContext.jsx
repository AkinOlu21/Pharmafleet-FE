import { createContext, useEffect, useState } from "react";
export const PharmaContext = createContext(null) //Creating context api
import axios from "axios";
const PharmaContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const [token,setToken] = useState("");
    const url = "http://localhost:4000";
    const [product_type,setProductType] = useState([])




    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
            
        }
    }




    const removeFromCart = async (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
    }


   const getTotalCartAmount = () =>{
    let totalAmount = 0;
    for(const item in cartItems)
        {
            if (cartItems[item]>0){

                let itemInfo = product_type.find((product)=>product._id === item);
                //totalAmount += itemInfo.price * cartItems[item];
                
                 // Ensure itemInfo is defined and has a price property
            if (itemInfo && itemInfo.price) {
                totalAmount += itemInfo.price * cartItems[item];
            } else {
                console.warn(`Product with ID ${item} not found or has no price.`);
            }

            }
        }
        return totalAmount;
   }
   
   
   


    const fetchProductType = async () => {
        const response = await axios.get(url+"/api/product/list");
        setProductType(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }


   //preventing logout from happening when refresh button is hit
useEffect(()=>{
    async function loadData() {
        await fetchProductType();
         if (localStorage.getItem("token"))
            {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
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
    url,
    
}

return (
    <PharmaContext.Provider value={contextValue}>
        {props.children}
    </PharmaContext.Provider>
)

}

export default PharmaContextProvider