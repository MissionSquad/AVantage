import { AVantage } from '../index';

const validateCoreStockResponses = async () => {
  const av = new AVantage();

  try {
    const response = await av.coreStock.search({ keywords: 'CRM' })
    // console.log(JSON.stringify(response.data, null, 2))
    console.log((response ?? { data: []}).data)
  } catch (error) {
    console.error('Error:', error);
  }
};

validateCoreStockResponses();
