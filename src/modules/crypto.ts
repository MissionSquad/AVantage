import { CryptoIntradayParams, CryptoIntradayTimeSeries, CryptoTimeSeries, CryptoTimeSeriesParams, RealtimeCurrencyExchangeRate } from '../types/crypto';
import { Api } from '../utils/api'

export class Crypto {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async exchangeRates(fromCurrency: string, toCurrency: string) {
    const params: Record<string, string> = {
      from_currency: fromCurrency,
      to_currency: toCurrency
    }

    return this.api.call<RealtimeCurrencyExchangeRate>('CURRENCY_EXCHANGE_RATE', params)
  }

  async intraday({
    symbol,
    market,
    interval,
    outputsize = 'compact',
    datatype = 'json'
  }: CryptoIntradayParams) {
    const params: Record<string, string> = {
      symbol,
      market,
      interval,
      outputsize,
      datatype
    }

    return this.api.call<CryptoIntradayTimeSeries>('CRYPTO_INTRADAY', params);
  }

  async daily({
    symbol,
    market,
    datatype = 'json'
  }: CryptoTimeSeriesParams) {
    const params: Record<string, string> = {
      symbol,
      market,
      datatype
    }

    return this.api.call<CryptoTimeSeries>('DIGITAL_CURRENCY_DAILY', params);
  }

  async weekly({
    symbol,
    market,
    datatype = 'json'
  }: CryptoTimeSeriesParams) {
    const params: Record<string, string> = {
      symbol,
      market,
      datatype
    }

    return this.api.call<CryptoTimeSeries>('DIGITAL_CURRENCY_WEEKLY', params);
  }

  async monthly({
    symbol,
    market,
    datatype = 'json'
  }: CryptoTimeSeriesParams) {
    const params: Record<string, string> = {
      symbol,
      market,
      datatype
    }

    return this.api.call<CryptoTimeSeries>('DIGITAL_CURRENCY_MONTHLY', params);
  }
}
