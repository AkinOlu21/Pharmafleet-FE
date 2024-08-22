import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PharmaContext } from '../../Context/PharmaContext';
import MapComponent from '../../components/Map/Map';
import './DriverPage.css';
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWtpbjEyMyIsImEiOiJjbHp0cjN0cGUyOXBhMmpxd2Y2cWlkaDJ0In0.R__WzzC1T6RqiGGD7a6fSw';

const DriverDashboard = () => {
  const { token, url } = useContext(PharmaContext);
  const [orders, setOrders] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [showPopup, setShowPopup] = useState(false);  


  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${url}/api/driver/orders`, {headers: {token} });
      
      if (response.data.success) {
        setOrders(response.data.data); // Assuming the API returns { success: true, data: [...] }
        console.log(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('An error occurred while fetching orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPrescriptions = async () =>{
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${url}/api/driver/prescriptionorders`,{headers: {token}});
      if (response.data.success) {
        setPrescriptions(response.data.data);
        console.log(response.data.data);
      }
      else {
        console.log("Prescriptions not available");
        setError(response.data.message || 'Failed to fetch prescriptions');
      }
    } catch (error) {
      
      console.error('Error fetching orders:', error);
      setError('An error occurred while fetching the prescription orders. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
    fetchPrescriptions();
  }, [token, url]);

  const handleOrderSelect = (order,prescription) => {
    setSelectedOrder(order,prescription);
    setShowDirections(false);
  };

  

  const handleStartNavigation = () => {
    // Implement logic to start navigation
    console.log('Starting navigation for order:', selectedOrder._id);
    setShowDirections(true);
    // You could open a maps application here or integrate with a navigation API
  };

  const handleEndNavigation = () => { 
    setShowPopup(true);
   }


   const handlePopupClose = (delivered) => {
    setShowPopup(false);
    if(delivered){
      //remove the order from the list
      setOrders(orders.filter(order => order._id !== selectedOrder._id));
      setPrescriptions(prescriptions.filter(prescription => prescription._id !== selectedOrder._id));
      setSelectedOrder(null);
   }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="driver-dashboard">
      <h1>Driver Dashboard</h1>
      <div className="order-list">
        <h2>Pending Orders</h2>
        {orders.length === 0 ? (
          <p>No pending orders at the moment.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-item" onClick={() => handleOrderSelect(order)}>
              <p>Order ID: {order._id}</p>
              <p>Address: {order.address.address}, {order.address.city}, {order.address.country}, {order.address.postcode}</p>
              <p>Customer: {order.address.firstName} {order.address.lastName} {order.address.phone}</p>
              {order.items.map((item,index) => {
                return <p key={index}>Order Items: {item.name} 
                <p key={index}>Order Price: {item.price}</p>
                </p>;
              })}
              <p>Order Items: {order.items.name} {order.items.category} {order.items.price} </p>
            </div>
          ))
        )}
      </div>
      {prescriptions.length === 0 ? (
        <p>No pending prescription orders at the moment.</p>
      ) : (
        <div className="prescription-list">
          {prescriptions.map((prescription) => (
            <div key={prescription._id} className="prescription-item" onClick={() => handleOrderSelect(prescription)}>
              <p>Prescription ID: {prescription._id}</p>
              <p>Customer: {prescription.firstName} {prescription.lastName} </p>
              <p>Medication: {prescription.medication}</p>
              <p>Collection Type: {prescription.collectionType}</p>
              <p>Address: {prescription.address.address} {prescription.address.city} {prescription.address.postcode} </p>

            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="order-details">
          <h2>Selected Order</h2>
          <p>Order ID: {selectedOrder._id}</p>
          <p>Customer: {selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
          <p>Address: {selectedOrder.address.address}, {selectedOrder.address.city}, {selectedOrder.address.postcode}</p>
          {selectedOrder.coordinates && selectedOrder.coordinates.latitude && selectedOrder.coordinates.longitude ? (
            <MapComponent 
              latitude={selectedOrder.coordinates.latitude}
              longitude={selectedOrder.coordinates.longitude}
              mapboxToken={MAPBOX_TOKEN}
              showDirections={showDirections}
            />
          ) : (
            <p>No map coordinates available for this order.</p>
          )}
          {!showDirections ? (
            <button onClick={handleStartNavigation}>
              Start Navigation
            </button>
          ) : (
          <button onClick={handleEndNavigation}>
            End Navigation </button>
          )}
        </div>
      )}
      {showPopup && (
        <div className="popup">
          <h3>Has the Order been delivered</h3>
          <button onClick={() =>handlePopupClose(true)} > Yes </button>
          <button onClick={() => handlePopupClose(false)}> No </button>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;