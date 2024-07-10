import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { PharmaContext } from '../../Context/PharmaContext'
import axios from 'axios'

const PlaceOrder = () => {

const {getTotalCartAmount,token,product_type,cartItems,url} = useContext(PharmaContext)

const [data,setData] = useState({
  firstName:"",
  lastName:"",
  email:"",
  address:"",
  city:"",
  county:"",
  country:"",
  postcode:"",
  phone:""
})

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  useEffect (() => {
    console.log(data);
  },[data])

  //creating user place order feature
  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    product_type.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }    
      
    })
    console.log(orderItems);//generated order data
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2.5,
    }

    //sent the order data to the order api
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

    //checking if response from order api is true    
    if (response.data.success) {
      //user is sent to the session url for stripe payment checkout
      const {session_url} = response.data;
      window.location.replace(session_url);
    } 
    else {
      alert("an error occured")
    }
    
    

  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last  name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder='Address'/>
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='county' onChange={onChangeHandler} value={data.county} type="text" placeholder='County' />
        </div>
        <div className="multi-fields">
          <input required name='postcode' onChange={onChangeHandler} value={data.postcode} type="text" placeholder='PostCode' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Mobile number' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>£{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>£{2.5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>£{getTotalCartAmount()+2.5}</b>
            </div>   
             
          </div>            
          <button type='submit'>Proceed to Payment</button>
      
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder