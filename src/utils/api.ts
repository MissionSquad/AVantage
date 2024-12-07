import axios from 'axios';
import { parseCSVResponse } from './csvParser';

type GenericObject = { [key: string]: any };
const timeIntervals = ['1min', '5min', '15min', '30min', '60min']
const keysToSkip = ['CIK', 'EBITDA', 'PERatio', 'PEGRatio', 'EPS', 'EVToRevenue', 'EVToEBITDA']

async function formatApiResponse<T extends GenericObject>(data: GenericObject, uncapitalize: boolean = false): Promise<GenericObject> {
  const formatKey = (key: string): string => {
    if (uncapitalize) {
      if (keysToSkip.includes(key)) {
        return key;
      }
      return key.charAt(0).toLowerCase() + key.slice(1);
    }
    return key
      .replace(/^\d+\.\s+/, '') // Remove numbered prefix (e.g., "01. ", "1. ")
      .toLowerCase() // Convert to lowercase
      .replace(/\([^)]*\)/g, match => { // Handle parentheses content
        const content = match.slice(1, -1); // Remove the parentheses
        return timeIntervals.includes(content.toLowerCase()) ? '' : content;
      })
      .trim()
      .replace(/\s+/g, '_'); // Replace spaces with underscores
  };

  const isTimeSeriesData = (key: string): boolean => {
    return key.toLowerCase().includes('time series');
  };

  const convertToNumber = (value: any): any => {
    if (typeof value === 'string') {
      // Only match strings that are purely numbers (integer or float)
      const numberPattern = /^-?\d+\.?\d*$/;
      if (numberPattern.test(value)) {
        const parsed = parseFloat(value);
        return !isNaN(parsed) ? parsed : value;
      }
      if (value === 'None' || value === 'none') {
        return 0
      }
    }
    return value;
  }

  const isNumericKeyObject = (obj: GenericObject): boolean => {
    if (typeof obj !== 'object' || obj === null) return false;
    const keys = Object.keys(obj);
    return keys.length > 0 && keys.every(key => /^\d+$/.test(key));
  };

  const convertNumericKeyObjectToArray = (obj: GenericObject): any[] => {
    return Object.entries(obj)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([_, value]) => value);
  };

  const formatTimeSeriesData = (data: GenericObject): any[] => {
    return Object.entries(data).map(([timestamp, values]) => ({
      timestamp,
      ...Object.entries(values as GenericObject).reduce((acc, [key, value]) => ({
        ...acc,
        [formatKey(key)]: convertToNumber(value)
      }), {})
    }));
  };

  const formatObject = (obj: GenericObject): GenericObject => {
    if (isNumericKeyObject(obj)) {
      return convertNumericKeyObjectToArray(obj).map(value => 
        typeof value === 'object' ? formatObject(value) : convertToNumber(value)
      );
    }

    const formatted: GenericObject = {};

    for (const [key, value] of Object.entries(obj)) {
      const formattedKey = formatKey(key);
      
      if (isTimeSeriesData(key) && typeof value === 'object') {
        // Handle time series data specially
        formatted['time_series'] = formatTimeSeriesData(value);
      } else if (value && typeof value === 'object') {
        // Recursively format nested objects
        formatted[formattedKey] = formatObject(value);
      } else {
        formatted[formattedKey] = convertToNumber(value);
      }
    }

    return formatted;
  };

  return formatObject(data);
};

export class Api {
  private apiKey: string
  private premiumEnabled: boolean
  public baseUrl: string

  constructor(apiKey: string, premiumEnabled: boolean = false, baseUrl: string = 'https://www.alphavantage.co/query') {
    this.apiKey = apiKey
    this.premiumEnabled = premiumEnabled
    this.baseUrl = baseUrl
  }

  async call<T extends GenericObject>(functionName: string, params: Record<string, string>, uncapitalize: boolean = false, isPremium: boolean = false): Promise<{ error?: boolean; reason?: string; data?: T }> {
    if (isPremium && !this.premiumEnabled) {
      return {
        error: true,
        reason: 'Premium API subscription required.'
      }
    }
    try {
      const queryParams = {
        function: functionName,
        ...params,
        apikey: this.apiKey
      };

      const response = await axios.get(this.baseUrl, {
        params: queryParams
      });

      const data = response.data;

      if (!data || Object.keys(data).length === 0) {
        return {
          error: true,
          reason: 'Empty response received from API'
        }
      }

      // Format the response data
      const formattedData: T = (await formatApiResponse(data, uncapitalize)) as T;
      return { data: formattedData };

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: true,
          reason: error.response?.data?.message || error.message || 'An error occurred during the API call'
        };
      }
      return {
        error: true,
        reason: error instanceof Error ? error.message : 'An unexpected error occurred during the API call'
      };
    }
  }

  async callCSV<T>(functionName: string, params: Record<string, string>, ): Promise<{ error?: boolean; reason?: string; data?: T }> {
    try {
      const queryParams = {
        function: functionName,
        ...params,
        apikey: this.apiKey
      };

      const response = await axios.get(this.baseUrl, {
        params: queryParams,
        // Ensure we get the raw CSV string
        responseType: 'text'
      });

      const { data } = await parseCSVResponse(response);
      return { data: data != null ? data as T : undefined }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          error: true,
          reason: error.response?.data?.message || error.message || 'An error occurred during the API call'
        };
      }
      return {
        error: true,
        reason: error instanceof Error ? error.message : 'An unexpected error occurred during the API call'
      };
    }
  }
}
