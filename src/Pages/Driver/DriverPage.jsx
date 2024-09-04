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
    setShowDirections(false);
    
  }
 


  const statusHandler = async (event, prescriptionId) => {
    try {
      const response = await axios.post(`${url}/api/order/prescriptionstatus`, {
        prescriptionId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchPrescriptions();
      }
    } catch (error) {
      console.error("Error updating prescription status:", error);
    }
  };

  const OrderstatusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value
      });
      if (response.data.success) {
        await fetchOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating the order status.");
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
              <p>Address: {order.address.address}</p>
              <p>City: {order.address.city} </p>
              <p>Country: {order.address.country} </p>
              <p>Postcode: {order.address.postcode}</p>
              <p>Customer: {order.address.firstName} {order.address.lastName}</p>
              <p>Customer Mobile Number: {order.address.phone}</p>
                           

              <div className='order-select' >
                <h4>Is the order delivered?</h4>
              <select onChange={(event)=> OrderstatusHandler(event,order._id)} value={order.status} >
                 <option value="">Select</option>
                  <option value="Delivered">Order Delivered</option>
            </select>
                 </div> 
              
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

              <div className='prescription-select' >
                <h4>Is the order delivered?</h4>
              <select onChange={(event)=> statusHandler(event,prescription._id)} value={prescription.status} >
                 <option value="">Select</option>
                  <option value="Delivered">Order Delivered</option>
            </select>
                 </div> 
              

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
          ) :(
            <button onClick={handleEndNavigation}> End Navigation</button>
          )}
        </div>
      )}

          
  
    </div>
  );
};

export default DriverDashboard;