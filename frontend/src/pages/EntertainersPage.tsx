import { useEffect, useState } from 'react';
import { fetchEntertainerBookings } from '../api/EntertainersAPI';
import { EntertainerBookingSummary } from '../types/EntertainerBookingSummary';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function EntertainersPage() {
  const navigate = useNavigate();
  const [entertainers, setEntertainers] = useState<EntertainerBookingSummary[]>(
    []
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchEntertainerBookings();
        setEntertainers(data);
      } catch (err) {
        console.error('Error loading bookings:', err);
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1 style={{ marginBottom: '20px' }}>Entertainers</h1>

        {entertainers.length > 0 ? (
          entertainers.map((entertainer) => (
            <div
              key={entertainer.entertainerID}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '16px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div>
                <h3 style={{ margin: '0 0 10px 0' }}>
                  {entertainer.entStageName}
                </h3>
                <div style={{ lineHeight: '1.6' }}>
                  <div>
                    <strong>Number of Bookings:</strong>{' '}
                    {entertainer.bookingCount}
                  </div>
                  <div>
                    <strong>Most Recent Booking Date:</strong>{' '}
                    {entertainer.mostRecentBookingDate
                      ? new Date(
                          entertainer.mostRecentBookingDate
                        ).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'No Bookings'}
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/entertainerDetails/${entertainer.entertainerID}`)
                }
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  alignSelf: 'start',
                }}
              >
                Details
              </button>
            </div>
          ))
        ) : (
          <p>No entertainers found.</p>
        )}

        <button
          onClick={() => navigate('/addEntertainer')}
          className="btn btn-primary"
        >
          Add Entertainer
        </button>
      </div>
    </>
  );
}

export default EntertainersPage;
