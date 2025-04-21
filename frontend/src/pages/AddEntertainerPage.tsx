import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { addEntertainer } from '../api/EntertainersAPI';
import Header from '../components/Header';

function AddEntertainerPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Entertainer, 'entertainerID'>>({
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: new Date().toISOString().split('T')[0], // Default to today
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addEntertainer(formData);
      navigate('/entertainers');
    } catch (error) {
      console.error('Failed to add entertainer:', error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Add New Entertainer</h1>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>
                {labelMap[key] || key}:
              </label>
              <input
                type={key === 'dateEntered' ? 'date' : 'text'}
                name={key}
                value={value}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
                required={key !== 'entWebPage' && key !== 'entEMailAddress'}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add Entertainer
          </button>
        </form>
      </div>
    </>
  );
}

export default AddEntertainerPage;
