import { Empire } from "../types";

const API_BASE_URL = '/api';

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface HealthResponse {
  status: string;
  version?: string;
  uptime?: number;
}

export interface OddsResponse {
  odds: number;
  calculationTime?: number;
}

/**
 * Calculates the odds of success for the Millennium Falcon's mission
 * @param empire - The Empire configuration including countdown and bounty hunters
 * @returns A promise that resolves to the success probability (0-100)
 * @throws ApiError if the request fails
 */
export const calculateOdds = async (empire: Empire): Promise<number> => {
  try {
    const response = await fetch(`${API_BASE_URL}/odds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ empire }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiError(
        error.message || `HTTP error! status: ${response.status}`,
        response.status,
        error.code || 'UNKNOWN_ERROR'
      );
    }

    const { data } = await response.json() as { data: OddsResponse };
    return data.odds;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      'Failed to calculate odds',
      500,
      'CALCULATION_ERROR'
    );
  }
};

/**
 * Checks the health status of the API
 * @returns A promise that resolves to the health status
 * @throws ApiError if the request fails
 */
export const getHealth = async (): Promise<ApiResponse<HealthResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new ApiError(
        error.message || `HTTP error! status: ${response.status}`,
        response.status,
        error.code || 'UNKNOWN_ERROR'
      );
    }

    const data = await response.json() as HealthResponse;
    return { data };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    return {
      data: { status: 'error' },
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};
