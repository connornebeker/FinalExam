import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchEntertainerDetails,
  deleteEntertainer,
} from '../api/EntertainersAPI';
import { Entertainer } from '../types/Entertainer';
import Header from '../components/Header';

function EntertainersDetailsPage() {
  const { entertainerID } = useParams<{ entertainerID: string }>();
  const [entertainerDetails, setEntertainerDetails] =
    useState<Entertainer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (entertainerID) {
      loadEntertainerDetails(entertainerID);
    }
  }, [entertainerID]);

  const loadEntertainerDetails = async (id: string) => {
    try {
      const response = await fetchEntertainerDetails(parseInt(id));
      if (response) {
        setEntertainerDetails(response);
      } else {
        console.error('No entertainer details found');
      }
    } catch (error) {
      console.error('Error fetching entertainer details:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/editEntertainer/${entertainerID}`);
  };

  const handleDelete = async () => {
    if (!entertainerID) return;

    const confirm = window.confirm(
      'Are you sure you want to delete this entertainer?'
    );
    if (!confirm) return;

    try {
      await deleteEntertainer(parseInt(entertainerID));
      navigate('/entertainers');
    } catch (err) {
      console.error('Failed to delete entertainer:', err);
    }
  };

  if (!entertainerDetails) return <p>Loading entertainer details...</p>;

  return (
    <>
      <Header />
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>
          🎭 Oddly Personal Entertainer Details
        </h1>

        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            width: '100%',
            maxWidth: '600px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            {entertainerDetails.entStageName}
          </h2>
          <div style={{ lineHeight: '1.6' }}>
            <div>
              <strong>SSN:</strong> {entertainerDetails.entSSN}
            </div>
            <div>
              <strong>Street Address:</strong>{' '}
              {entertainerDetails.entStreetAddress}
            </div>
            <div>
              <strong>City:</strong> {entertainerDetails.entCity}
            </div>
            <div>
              <strong>State:</strong> {entertainerDetails.entState}
            </div>
            <div>
              <strong>Zip Code:</strong> {entertainerDetails.entZipCode}
            </div>
            <div>
              <strong>Phone Number:</strong> {entertainerDetails.entPhoneNumber}
            </div>
            <div>
              <strong>Email Address:</strong>{' '}
              {entertainerDetails.entEMailAddress?.trim()
                ? entertainerDetails.entEMailAddress
                : 'Unknown'}
            </div>
            <div>
              <strong>Web Page:</strong>{' '}
              {entertainerDetails.entWebPage?.trim() ? (
                <a
                  href={entertainerDetails.entWebPage}
                  target="_blank"
                  rel="noreferrer"
                >
                  {entertainerDetails.entWebPage}
                </a>
              ) : (
                'Unknown'
              )}
            </div>
            <div>
              <strong>Date Entered:</strong>{' '}
              {new Date(entertainerDetails.dateEntered).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleEdit}
            style={{
              marginRight: '10px',
              padding: '10px 16px',
              backgroundColor: '#ffc107',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#000',
            }}
          >
            ✏️ Edit
          </button>

          <button
            onClick={handleDelete}
            style={{
              padding: '10px 16px',
              backgroundColor: '#dc3545',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#fff',
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default EntertainersDetailsPage;
