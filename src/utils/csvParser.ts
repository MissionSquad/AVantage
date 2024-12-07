import Papa from 'papaparse';
import { AxiosResponse } from 'axios';

// Generic type for parsed CSV data
export interface ParsedCSVData<T> {
  data: T[];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

// Configuration options for the parser
export interface CSVParserOptions {
  header?: boolean;
  skipEmptyLines?: boolean | 'greedy';
  delimiter?: string;
  dynamicTyping?: boolean;
  transformHeader?: (header: string) => string;
}

// Default parser options
const defaultOptions: CSVParserOptions = {
  header: true,
  skipEmptyLines: 'greedy',
  delimiter: ',',
  dynamicTyping: true,
  transformHeader: (header: string) => header.trim().toLowerCase(),
};

/**
 * Parses CSV data from an Axios response into a structured format
 * @param response - Axios response containing CSV data
 * @param options - CSV parsing options
 * @returns Promise with parsed CSV data
 */
export async function parseCSVResponse<T>(
  response: AxiosResponse<string>,
  options: CSVParserOptions = {}
): Promise<ParsedCSVData<T>> {
  // Merge default options with provided options
  const parserOptions: CSVParserOptions = {
    ...defaultOptions,
    ...options,
  };

  return new Promise((resolve, reject) => {
    try {
      // Parse the CSV data
      const result = Papa.parse<T>(response.data, {
        ...parserOptions,
        error: (error: Error) => {
          if ('type' in error && 'code' in error) { // Check if it's actually a Papa.ParseError
            reject(new Error(`CSV parsing error (Type: ${error.type}, Code: ${error.code}): ${error.message}`));
          } else {
            reject(error); // Handle base Error cases
          }
        },
        complete: (results: Papa.ParseResult<T>) => {
          resolve({
            data: results.data,
            errors: results.errors,
            meta: results.meta,
          });
        },
      });
    } catch (error) {
      reject(new Error(`Unexpected error parsing CSV: ${(error as any).message}`));
    }
  });
}

/**
 * Example usage with a type definition:
 *
 * interface UserData {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * // In your API call:
 * const response = await axios.get<string>('api/users/export');
 * const parsed = await parseCSVResponse<UserData>(response);
 */