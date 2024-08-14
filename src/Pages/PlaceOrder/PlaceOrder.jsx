import React, { useContext, useEffect, useState, useCallback } from 'react';
import './PlaceOrder.css';
import { PharmaContext } from '../../Context/PharmaContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../../components/Map/Map';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWtpbjEyMyIsImEiOiJjbHp0cjN0cGUyOXBhMmpxd2Y2cWlkaDJ0In0.R__WzzC1T6RqiGGD7a6fSw';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, product_type, cartItems, url } = useContext(PharmaContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    county: "",
    country: "",
    postcode: "",
    phone: ""
  });

  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [submittedAddress, setSubmittedAddress] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const updateMapCoordinates = async (fullAddress) => {
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(fullAddress)}.json?access_token=${MAPBOX_TOKEN}`);
      if (response.data.features.length > 0) {
        const [longitude, latitude] = response.data.features[0].geometry.coordinates;
        setCoordinates({ latitude, longitude });
        setSubmittedAddress(fullAddress);
      }
    } catch (error) {
      console.error('Error updating map coordinates:', error);
    }
  };

  const debouncedUpdateMap = useCallback(debounce(updateMapCoordinates, 300), []);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));

    if (['address', 'city', 'county', 'postcode', 'country'].includes(name)) {
      const updatedData = { ...data, [name]: value };
      const fullAddress = `${updatedData.address} ${updatedData.city} ${updatedData.county} ${updatedData.postcode} ${updatedData.country}`;
      debouncedUpdateMap(fullAddress);
    }
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = product_type
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({ ...item, quantity: cartItems[item._id] }));

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2.5,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("An error occurred while placing the order");
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert("An error occurred while placing the order");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' />
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
              <b>£{getTotalCartAmount() + 2.5}</b>
            </div>
          </div>
          <button type='submit'>Proceed to Payment</button>
        </div>
        {submittedAddress && coordinates.latitude && coordinates.longitude && (
          <div>
            <h3>Delivery Address:</h3>
            <p>{submittedAddress}</p>
            <MapComponent 
              latitude={coordinates.latitude} 
              longitude={coordinates.longitude} 
              mapboxToken={MAPBOX_TOKEN} 
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default PlaceOrder;