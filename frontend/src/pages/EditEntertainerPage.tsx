import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import {
  fetchEntertainerDetails,
  updateEntertainer,
} from '../api/EntertainersAPI';
import Header from '../components/Header';

function EditEntertainerPage() {
  const { entertainerID } = useParams<{ entertainerID: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Entertainer | null>(null);

  useEffect(() => {
    if (entertainerID) {
      loadData(entertainerID);
    }
  }, [entertainerID]);

  const labelMap: { [key: string]: string } = {
    entStageName: 'Stage Name',
    entSSN: 'SSN',
    entStreetAddress: 'Street Address',
    entCity: 'City',
    entState: 'State',
    entZipCode: 'Zip Code',
    entPhoneNumber: 'Phone Number',
    entWebPage: 'Web Page',
    entEMailAddress: 'Email Address',
    dateEntered: 'Date Entered',
  };

  const loadData = async (id: string) => {
    const data = await fetchEntertainerDetails(parseInt(id));
    setFormData(data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    try {
      await updateEntertainer(formData.entertainerID, formData);
      navigate(`/entertainerDetails/${formData.entertainerID}`);
    } catch (err) {
      console.error('Failed to update entertainer:', err);
    }
  };

  if (!formData) return <p>Loading entertainer info...</p>;

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Edit Entertainer</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          {Object.entries(formData).map(
            ([key, value]) =>
              !['entertainerID', 'engagements'].includes(key) && (
                <div key={key} style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '4px' }}>
                    {labelMap[key] || key}:
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
              )
          )}
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}

export default EditEntertainerPage;
