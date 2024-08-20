import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PharmaContext } from '../../Context/PharmaContext';
import MapComponent from '../../components/Map/Map';
import './Prescription.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWtpbjEyMyIsImEiOiJjbHp0cjN0cGUyOXBhMmpxd2Y2cWlkaDJ0In0.R__WzzC1T6RqiGGD7a6fSw';

const Prescription = () => {
  const { token, url } = useContext(PharmaContext);
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
    phone: "",
    medication: "",
    licenseNumber: "",
    collectionType: "Delivery",
    Note: "",
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

  const createPrescription = async (event) => {
    event.preventDefault();

  // Check for required fields
  const requiredFields = ['medication', 'licenseNumber', 'collectionType', 'address', 'city', 'county', 'country', 'postcode'];
  const missingFields = requiredFields.filter(field => !data[field]);

  if (missingFields.length > 0) {
  alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
  return;
  }

  if (!coordinates.latitude || !coordinates.longitude) {
  alert('Please ensure a valid address is entered and geocoded');
  return;
  }

    let prescriptionData = {
      ...data,
      address: {
        address: data.address,
        city: data.city,
        county: data.county,
        country: data.country,
        postcode: data.postcode,
      },
      coordinates: coordinates
    };

    try {
      let response = await axios.post(`${url}/api/prescription/create`, prescriptionData, { headers: { token } });
      if (response.data.success) {
        navigate('/prescriptionsuccess');
      } else {
        console.error('Server responded with an error:', response.data);
        alert(`An error occurred while creating the prescription: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error creating prescription:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        alert(`Server error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        alert('No response received from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
  return (
    <form onSubmit={createPrescription} className="prescription-form">
      <h2 className="form-title">Create New Prescription</h2>
      
      <div className="form-section">
        <div className="input-group">
          <label htmlFor="firstName" className="input-label">First Name</label>
          <input id="firstName" name="firstName" value={data.firstName} onChange={onChangeHandler} required className="input-field" />
        </div>
        <div className="input-group">
          <label htmlFor="lastName" className="input-label">Last Name</label>
          <input id="lastName" name="lastName" value={data.lastName} onChange={onChangeHandler} required className="input-field" />
        </div>
      </div>

      <div className="form-section">
        <div className="input-group">
          <label htmlFor="email" className="input-label">Email</label>
          <input id="email" name="email" type="email" value={data.email} onChange={onChangeHandler} required className="input-field" />
        </div>
        <div className="input-group">
          <label htmlFor="phone" className="input-label">Phone</label>
          <input id="phone" name="phone" value={data.phone} onChange={onChangeHandler} required className="input-field" />
        </div>
      </div>

      <div className="form-section">
        <div className="input-group">
          <label htmlFor="address" className="input-label">Address</label>
          <input id="address" name="address" value={data.address} onChange={onChangeHandler} required className="input-field" />
        </div>
      </div>

      <div className="form-section">
        <div className="input-group">
          <label htmlFor="city" className="input-label">City</label>
          <input id="city" name="city" value={data.city} onChange={onChangeHandler} required className="input-field" />
        </div>
        <div className="input-group">
          <label htmlFor="county" className="input-label">County</label>
          <input id="county" name="county" value={data.county} onChange={onChangeHandler} required className="input-field" />
        </div>
      </div>

      <div className="form-section">
        <div className="input-group">
          <label htmlFor="postcode" className="input-label">Postcode</label>
          <input id="postcode" name="postcode" value={data.postcode} onChange={onChangeHandler} required className="input-field" />
        </div>
        <div className="input-group">
          <label htmlFor="country" className="input-label">Country</label>
          <input id="country" name="country" value={data.country} onChange={onChangeHandler} required className="input-field" />
        </div>
      </div>

      <div className="form-section">
        <div className="input-group">
          <label htmlFor="medication" className="input-label">Medication</label>
          <input id="medication" name="medication" value={data.medication} onChange={onChangeHandler} required className="input-field" />
        </div>
        <div className="input-group">
          <label htmlFor="licenseNumber" className="input-label">Doctor's License Number</label>
          <input id="licenseNumber" name="licenseNumber" value={data.licenseNumber} onChange={onChangeHandler} required className="input-field" />
        </div>
      </div>

      <div className="form-section">
      <label htmlFor='Note' >Add a note "(N/A if not adding a note)" </label>
      <textarea className='input-field' name="Note" value={data.Note} onChange={onChangeHandler}  />
      </div>
      
      <div className="form-section">
        <div className="input-group">
          <label htmlFor="collectionType" className="input-label">Collection Type</label>
          <select id="collectionType" name="collectionType" value={data.collectionType} onChange={onChangeHandler} className="select-field">
            <option value="Delivery">Delivery</option>
            <option value="Collect">Collect</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-button">Create Prescription</button>

      {submittedAddress && coordinates.latitude && coordinates.longitude && (
        <div className="map-container">
          <h3>Delivery Address:</h3>
          <p>{submittedAddress}</p>
          <MapComponent 
            latitude={coordinates.latitude} 
            longitude={coordinates.longitude} 
            mapboxToken={MAPBOX_TOKEN} 
          />
        </div>
      )}
    </form>
  );
};
export default Prescription;