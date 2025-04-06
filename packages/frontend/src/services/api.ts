import { Empire } from '../types';

const API_BASE_URL = '/api';

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export const calculateOdds = async (empire: Empire): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/odds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ empire }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data } = await response.json();
  return data.odds;
};

export const getHealth = async (): Promise<ApiResponse<{ status: string }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      data: { status: 'error' },
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
