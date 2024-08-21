import React, { useContext, useState, useEffect } from 'react';
import './MyPrescriptionOrders.css';
import { PharmaContext } from '../../Context/PharmaContext';
import axios from 'axios';

const MyPrescriptionOrders = () => {
    const { url, token } = useContext(PharmaContext);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);




    const fetchPrescriptionOrders = async () => {

        try {
            setLoading(true);
            const response = await axios.get(url+"/api/prescription/userprescriptions",{headers:{token}});
            if (response.data.success) {
                setPrescriptions(response.data.data);
                console.log(response.data.data);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching prescription orders:", error);
            setError("An error occurred while fetching your prescriptions");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (token) {
             fetchPrescriptionOrders();
        }

       
    }, [token]);

    if (loading) return <p>Loading prescriptions...</p>;
    if (error) return <p>Error:  {error} </p>;

    return (
        <div>
            <h1>My Prescription Orders</h1>
            {prescriptions.length === 0 ? (
                <p>No prescription orders found.</p>
            ) : (
                prescriptions.map(prescription => (
                    <div key={prescription._id} className="prescription-item">
                        <h3>Prescription for {prescription.firstName} {prescription.lastName}</h3>
                        <p>Medication: {prescription.medication}</p>
                        <p>Status: {prescription.status}</p>
                        <p>Request: {prescription.request}</p>
                        {prescription.Dosage && <p>Dosage: {prescription.Dosage}</p>}
                        {prescription.Note && <p>Note: {prescription.Note}</p>}
                        <p>Collection Type: {prescription.collectionType}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyPrescriptionOrders;