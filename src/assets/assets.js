import Pharmafleet_logo from './Pharma fleet logo.jpg'

import search_icon from './search.svg'
import basket_icon from './basket.svg'
import add_icon from './addicon.svg'
import remove_icon from './removeicon.svg'
import facebook_icon from './facebookicon.svg'
import insta_icon from './instaicon.svg'
import X_icon from './Xicon.svg'
import cross_icon from './Crossicon.svg'
import profile from './profile.svg'
import orderbag from './OrderBag.svg'
import logout from './Logout.svg'

import header_bg from './Delivery header image.webp'
import playstore from './PlayStore.png'
import appstore from './Appstore2.png'

import product1 from './hayfever.jpg'
import product2 from './vitamins.jpeg'
import product3 from './supplements.jpeg'
import product4 from './painmed.jpg'
import product5 from './firstaid.jpg'
import product6 from './diabetes.jpeg'
import product7 from './eyecare.jpg'
import product8 from './heartburn.jpg'


import product_type1 from './PT_cetrizine.png'
import product_type2 from './PT_folicacid.jpeg'
import product_type3 from './PT_ashwagandha.jpeg'
import product_type4 from './PT_paracetamol.jpeg'
import product_type5 from './PT_plasters.png'
import product_type6 from './PT_metformin.jpeg'
import product_type7 from './PT_eyedrops.jpeg'
import product_type8 from './PT_gaviscon.jpeg'



export const assets = {
    Pharmafleet_logo,
    search_icon,
    basket_icon,
    add_icon,
    remove_icon,
    facebook_icon,
    insta_icon,
    X_icon,
    cross_icon,
    header_bg,
    playstore,
    appstore,
    profile,
    orderbag,
    logout
}

export const product_list = [
    {
        product_name: "Allergy and Havfever",
        product_image: product1
    },

    {
        product_name: "Vitamins",
        product_image: product2
    },

    {
        product_name: "Supplements",
        product_image: product3
    },

    {
        product_name: "Pain",
        product_image: product4
    },
    
    {
        product_name: "First Aid",
        product_image: product5
    },
    
    {
        product_name: "Diabetes",
        product_image: product6
    },
    
    {
        product_name: "Eyecare",
        product_image: product7
    },
    
    {
        product_name: "Heartburn and Indigestion",
        product_image: product8
    },
  
]

export const product_type = [
    {
        _id: "1",
        name: "Cetrizine",
        image: product_type1,
        price: 10,
        description: "hayfever tablet",
        category: "Allergy and Havfever"
    },

    {
        _id: "2",
        name: "Folic Acid",
        image: product_type2,
        price: 10,
        description: "vitamins for you",
        category: "Vitamins"
    },

    {
        _id: "3",
        name: "Ashwagandha ",
        image: product_type3,
        price: 10,
        description: "supplement your dietary needs",
        category: "Supplements"
    },

    {
        _id: "4",
        name: "Paracetamol",
        image: product_type4,
        price: 10,
        description: "Pain relief",
        category: "Pain"
    },

    {
        _id: "5",
        name: "Plasters",
        image: product_type5,
        price: 10,
        description: "First aid product",
        category: "First Aid"
    },

    {
        _id: "6",
        name: "Metformin",
        image: product_type6,
        price: 10,
        description: "The proposed wonder drug for diabetic patients",
        category: "Diabetes"
    },

    {
        _id: "7",
        name: "Eyedrops",
        image: product_type7,
        price: 10,
        description: "Eyedrops for those teary eyes",
        category: "Eyecare"
    },

    {
        _id: "8",
        name: "Gaviscon",
        image: product_type8,
        price: 10,
        description: "Reduce those tummyaches",
        category: "Heartburn and Indigestion"
    }

]