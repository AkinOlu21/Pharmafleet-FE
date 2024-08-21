import React, { useState, useContext } from 'react';
import axios from 'axios';
import './PrescriptionAction.css';
import { PharmaContext } from '../../Context/PharmaContext';   

const PrescriptionAction = ({ prescription, onActionComplete }) => {
  const [action, setAction] = useState(null);
  const [note, setNote] = useState('');
  const [dosage, setDosage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleActionSelect = (selectedAction) => {
    setAction(selectedAction);
    setNote('');
    setDosage('');
    setError(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('API URL:', apiUrl); // Log the API URL
      const url = `${apiUrl}/api/prescription/${prescription._id}/${action}`;
      console.log('Full request URL:', url); // Log the full URL

      const data = action === 'accept' ? { Note: note, Dosage: dosage } : { Note: note };
      const response = await axios.patch(url, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (response.data.success) {
        onActionComplete(response.data.prescription);
      } else {
        setError(response.data.message || 'Operation failed. Please try again.');
      }
    } catch (err) {
      console.error('Error in prescription action:', err);
      if (err.response) {
        setError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response received from server. Please check your connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };




  /*const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Token:', token); // Log the token
      console.log('API URL:', url);
      const fullUrl = `${url}/api/prescription/${prescription._id}/${action}`;
      console.log('Full request URL:', fullUrl);

      const data = action === 'accept' ? { Note: note, Dosage: dosage } : { Note: note };
      const response = await axios.patch(fullUrl, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        onActionComplete(response.data.prescription);
      } else {
        setError(response.data.message || 'Operation failed. Please try again.');
      }
    } catch (err) {
      console.error('Error in prescription action:', err);
      if (err.response) {
        console.log('Error response:', err.response.data);
        setError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response received from server. Please check your connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };*/





  return (
    <div className="prescription-action">
      {!action && (
        <div className="action-buttons">
          <button onClick={() => handleActionSelect('accept')}>Accept Request</button>
          <button onClick={() => handleActionSelect('reject')}>Reject Request</button>
        </div>
      )}

      {action === 'accept' && (
        <div className="accept-form">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter acceptance note"
            required
          />
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder="Enter dosage"
            required
          />
          <button onClick={handleSubmit} disabled={loading || !note || !dosage}>
            {loading ? 'Accepting...' : 'Accept Request'}
          </button>
          <button onClick={() => setAction(null)} className="cancel-button">Cancel</button>
        </div>
      )}

      {action === 'reject' && (
        <div className="reject-form">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Enter rejection note"
            required
          />
          <button onClick={handleSubmit} disabled={loading || !note}>
            {loading ? 'Rejecting...' : 'Reject Request'}
          </button>
          <button onClick={() => setAction(null)} className="cancel-button">Cancel</button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PrescriptionAction;