import { AVantage } from '../index';

const validateCoreStockResponses = async () => {
  const av = new AVantage();

  try {
    const response = await av.crypto.exchangeRates('CRM', 'USD')
    console.log(JSON.stringify(response, null, 2))
    // console.log((response ?? { data: []}).data)
  } catch (error) {
    console.error('Error:', error);
  }
};

validateCoreStockResponses();
