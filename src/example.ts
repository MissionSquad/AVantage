import { AVantage } from './index'

type GenericObject = { [key: string]: any };

const formatApiResponse = async (data: GenericObject): Promise<GenericObject> => {
  const formatKey = (key: string): string => {
    return key
      .replace(/^\d+\.\s+/, '') // Remove numbered prefix (e.g., "01. ", "1. ")
      .toLowerCase() // Convert to lowercase
      .replace(/[()]/g, '') // Remove parentheses
      .replace(/\s+/g, '_'); // Replace spaces with underscores
  };

  const isTimeSeriesData = (key: string): boolean => {
    return key.toLowerCase().includes('time series');
  };

  const formatTimeSeriesData = (data: GenericObject): any[] => {
    return Object.entries(data).map(([timestamp, values]) => ({
      timestamp,
      ...Object.entries(values as GenericObject).reduce((acc, [key, value]) => ({
        ...acc,
        [formatKey(key)]: value
      }), {})
    }));
  };

  const formatObject = (obj: GenericObject): GenericObject => {
    const formatted: GenericObject = {};

    for (const [key, value] of Object.entries(obj)) {
      const formattedKey = formatKey(key);
      
      if (isTimeSeriesData(key) && typeof value === 'object') {
        // Handle time series data specially
        formatted[formattedKey] = formatTimeSeriesData(value);
      } else if (value && typeof value === 'object') {
        // Recursively format nested objects
        formatted[formattedKey] = formatObject(value);
      } else {
        formatted[formattedKey] = value;
      }
    }

    return formatted;
  };

  return formatObject(data);
};

// Example usage with different API response formats
const examples = [
  // Example 1: Global Quote
  {
    "Global Quote": {
      "01. symbol": "IBM",
      "02. open": "227.2400",
      "03. high": "229.1100",
      "04. low": "226.6700",
      "05. price": "229.0000",
      "06. volume": "3138952",
      "07. latest trading day": "2024-12-03",
      "08. previous close": "227.3900",
      "09. change": "1.6100",
      "10. change percent": "0.7080%"
    }
  },
  // Example 2: Time Series
  {
    "Time Series (5min)": {
      "2024-01-03 20:00:00": {
        "1. open": "142.0800",
        "2. high": "142.0800",
        "3. low": "142.0800",
        "4. close": "142.0800",
        "5. volume": "200"
      },
      "2024-01-03 19:55:00": {
        "1. open": "142.1000",
        "2. high": "142.1000",
        "3. low": "142.0800",
        "4. close": "142.0800",
        "5. volume": "300"
      }
    }
  }
];

// Test the function with different examples
(async () => {
  // for (const example of examples) {
  //   console.log('Original:', JSON.stringify(example, null, 2));
  //   const formatted = await formatApiResponse(example);
  //   console.log('Formatted:', JSON.stringify(formatted, null, 2));
  //   console.log('---');
  // }
  const av = new AVantage()
  const data = await av.coreStock.quote({ symbol: 'CRM' })
  console.log(data)
})();
