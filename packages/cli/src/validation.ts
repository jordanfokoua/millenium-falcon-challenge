import { Empire, MillenniumFalcon } from 'core';

export class ValidationError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateFileFormat(filePath: string): void {
  if (!filePath.endsWith('.json')) {
    throw new ValidationError(
      `Invalid file format: ${filePath}. Expected a .json file.`,
      'INVALID_FILE_FORMAT'
    );
  }
}

export function validateJson(content: string, filePath: string): any {
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new ValidationError(
      `Invalid JSON in file: ${filePath}. ${error instanceof Error ? error.message : 'Unknown error'}`,
      'INVALID_JSON'
    );
  }
}

export function validateMillenniumFalcon(data: any): MillenniumFalcon {
  const requiredFields = ['autonomy', 'departure', 'arrival', 'routes_db'];
  const missingFields = requiredFields.filter(field => !(field in data));

  if (missingFields.length > 0) {
    throw new ValidationError(
      `Missing required fields in millennium-falcon.json: ${missingFields.join(', ')}`,
      'INVALID_SCHEMA'
    );
  }

  if (typeof data.autonomy !== 'number' || data.autonomy < 0) {
    throw new ValidationError(
      'autonomy must be a positive number',
      'INVALID_SCHEMA'
    );
  }

  if (typeof data.departure !== 'string' || !data.departure) {
    throw new ValidationError(
      'departure must be a non-empty string',
      'INVALID_SCHEMA'
    );
  }

  if (typeof data.arrival !== 'string' || !data.arrival) {
    throw new ValidationError(
      'arrival must be a non-empty string',
      'INVALID_SCHEMA'
    );
  }

  if (typeof data.routes_db !== 'string' || !data.routes_db) {
    throw new ValidationError(
      'routes_db must be a non-empty string',
      'INVALID_SCHEMA'
    );
  }

  return data as MillenniumFalcon;
}

export function validateEmpire(data: any): Empire {
  const requiredFields = ['countdown', 'bounty_hunters'];
  const missingFields = requiredFields.filter(field => !(field in data));

  if (missingFields.length > 0) {
    throw new ValidationError(
      `Missing required fields in empire.json: ${missingFields.join(', ')}`,
      'INVALID_SCHEMA'
    );
  }

  if (typeof data.countdown !== 'number' || data.countdown < 0) {
    throw new ValidationError(
      'countdown must be a positive number',
      'INVALID_SCHEMA'
    );
  }

  if (!Array.isArray(data.bounty_hunters)) {
    throw new ValidationError(
      'bounty_hunters must be an array',
      'INVALID_SCHEMA'
    );
  }

  for (const hunter of data.bounty_hunters) {
    if (typeof hunter.planet !== 'string' || !hunter.planet) {
      throw new ValidationError(
        'Each bounty hunter must have a non-empty planet string',
        'INVALID_SCHEMA'
      );
    }
    if (typeof hunter.day !== 'number' || hunter.day < 0) {
      throw new ValidationError(
        'Each bounty hunter must have a positive day number',
        'INVALID_SCHEMA'
      );
    }
  }

  return data as Empire;
} 