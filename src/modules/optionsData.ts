import { Api } from '../utils/api'

interface RealtimeOptionsParams {
  symbol: string;
  contract?: string;
  datatype?: 'json' | 'csv';
}

interface HistoricalOptionsParams {
  symbol: string;
  date?: string;
  datatype?: 'json' | 'csv';
}

export class OptionsData {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async realtimeOptions({
    symbol,
    contract,
    datatype = 'json'
  }: RealtimeOptionsParams) {
    const params: Record<string, string> = {
      symbol,
      datatype
    }

    if (contract) {
      params.contract = contract;
    }

    return this.api.call('REALTIME_OPTIONS', params, false, true);
  }

  async historicalOptions({
    symbol,
    date,
    datatype = 'json'
  }: HistoricalOptionsParams) {
    const params: Record<string, string> = {
      symbol,
      datatype
    }

    if (date) {
      params.date = date;
    }

    return this.api.call('HISTORICAL_OPTIONS', params, false, true);
  }
}
