import { Entertainer } from '../types/Entertainer';
import { EntertainerBookingSummary } from '../types/EntertainerBookingSummary';

interface FetchEntertainersResponse {
  entertainers: Entertainer[];
}

const API_URL = 'https://localhost:5000/Entertainer';

export const fetchEntertainers =
  async (): Promise<FetchEntertainersResponse> => {
    try {
      const response = await fetch(`${API_URL}/AllEntertainers`);
      if (!response.ok) {
        throw new Error('Failed to fetch entertainers');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching entertainers:', error);
      throw error;
    }
  };

export const fetchEntertainerBookings = async (): Promise<
  EntertainerBookingSummary[]
> => {
  const response = await fetch(`${API_URL}/EntertainerInfo`);
  if (!response.ok) {
    throw new Error('Failed to fetch entertainer bookings');
  }
  return await response.json();
};

export const fetchEntertainerDetails = async (
  entertainerID: number
): Promise<Entertainer> => {
  const response = await fetch(
    `${API_URL}/EntertainerDetails/${entertainerID}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch entertainer details');
  }
  return await response.json();
};

export const deleteEntertainer = async (id: number) => {
  const response = await fetch(`https://localhost:5000/Entertainer/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete entertainer');
  }
};

export const updateEntertainer = async (id: number, data: Entertainer) => {
  const response = await fetch(`https://localhost:5000/Entertainer/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update entertainer');
  }
};

export const addEntertainer = async (
  data: Omit<Entertainer, 'entertainerID'>
) => {
  const res = await fetch(`https://localhost:5000/Entertainer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to add entertainer');
  }

  return await res.json(); // optional
};
