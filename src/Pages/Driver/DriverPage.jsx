import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PharmaContext } from '../../Context/PharmaContext';
import MapComponent from '../../components/Map/Map';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWtpbjEyMyIsImEiOiJjbHp0cjN0cGUyOXBhMmpxd2Y2cWlkaDJ0In0.R__WzzC1T6RqiGGD7a6fSw';

const DriverDashboard = () => {
  const { token, url } = useContext(PharmaContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDirections, setShowDirections] = useState(false);


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

  useEffect(() => {
    fetchOrders();
  }, [token, url]);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setShowDirections(false);
  };

  const handleStartNavigation = () => {
    // Implement logic to start navigation
    console.log('Starting navigation for order:', selectedOrder._id);
    setShowDirections(true);
    // You could open a maps application here or integrate with a navigation API
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
          {!showDirections && (
            <button onClick={handleStartNavigation}>
              Start Navigation
            </button>
          )}
          
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;