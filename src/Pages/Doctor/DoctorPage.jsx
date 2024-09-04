import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PharmaContext } from '../../Context/PharmaContext';
import PrescriptionAction from '../../components/PrescriptionAction/PrescriptionAction';
import './DoctorPage.css';

const DoctorPage = () => {
  const { token, url } = useContext(PharmaContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/prescription/GPprescriptions`, {
        headers: { token }
      });
      if (response.data.success) {
        setPrescriptions(response.data.data);
        console.log(response.data.data);
      } else {
        setError('Failed to fetch the prescriptions');
        console.log(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while fetching prescriptions');
      console.error(err);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [url, token]);

  const handleActionComplete = (updatedPrescription) => {
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(p =>
        p._id === updatedPrescription._id ? updatedPrescription : p
      )
    );
  };

  if (loading) return <div className="loading">Loading prescriptions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="gp-interface">
      <h1>GP Prescriptions Dashboard</h1>
      <div className="prescriptions-list">
        {prescriptions.length === 0 ? (
          <p>No Prescription Available.</p>
        ) : (
          prescriptions.map(prescription => (
            <div key={prescription._id} className="prescription-item">
              <h3>Prescription for {prescription.firstName} {prescription.lastName}</h3>
              <p>Medication: {prescription.medication}</p>
              <p>Patient: {prescription.patientId.name} ({prescription.patientId.email})</p>
              <p>Date: {new Date(prescription.createdAt).toLocaleDateString()}</p>
              <p>Request Status: {prescription.request}</p>
              <p>Collection Type: {prescription.collectionType}</p>
              {prescription.Note && <p>Note: {prescription.Note}</p>}
              {prescription.Dosage && <p>Dosage: {prescription.Dosage}</p>}
              <div className="address-section">
                <h4>Delivery Address:</h4>
                <p>{prescription.address.address}</p>
                <p>{prescription.address.city}, {prescription.address.postcode}</p>
                <p>{prescription.address.country}</p>
              </div>
              {prescription.request === 'pending' && (
                <PrescriptionAction
                  prescription={prescription}
                  onActionComplete={handleActionComplete}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorPage;