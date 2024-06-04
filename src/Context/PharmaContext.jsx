import { createContext } from "react";
import { product_type } from "../assets/assets";

export const PharmaContext = createContext(null) //Creating context api

const PharmaContextProvider = (props) => {


const contextValue ={ //variable

    product_type
}

return (
    <PharmaContext.Provider value={contextValue}>
        {props.children}
    </PharmaContext.Provider>
)

}

export default PharmaContextProvider