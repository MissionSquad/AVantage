import { BulkQuotesParams, Daily, DailyAdjusted, DailyAdjustedParams, DailyParams, GlobalQuote, Intraday, IntradayParams, Monthly, MonthlyAdjusted, MonthlyAdjustedParams, MonthlyParams, QuoteParams, SearchParams, SearchResults, Weekly, WeeklyAdjusted, WeeklyAdjustedParams, WeeklyParams } from '../types/coreStock'
import { Api } from '../utils/api'

export class CoreStock {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async intraday({
    symbol,
    interval,
    adjusted = true,
    extended_hours = true,
    month,
    outputsize = 'compact',
    datatype = 'json'
  }: IntradayParams) {
    const params: Record<string, string> = {
      symbol,
      interval,
      adjusted: adjusted.toString(),
      extended_hours: extended_hours.toString(),
      outputsize,
      datatype
    };

    // Only add month parameter if it's provided
    if (month) {
      params.month = month;
    }

    return this.api.call<Intraday>('TIME_SERIES_INTRADAY', params);
  }

  async daily({
    symbol,
    outputsize = 'compact',
    datatype = 'json'
  }: DailyParams) {
    const params: Record<string, string> = {
      symbol,
      outputsize,
      datatype
    };

    return this.api.call<Daily>('TIME_SERIES_DAILY', params);
  }

  async dailyAdjusted({
    symbol,
    outputsize = 'compact',
    datatype = 'json'
  }: DailyAdjustedParams) {
    const params: Record<string, string> = {
      symbol,
      outputsize,
      datatype
    };

    return this.api.call<DailyAdjusted>('TIME_SERIES_DAILY_ADJUSTED', params);
  }

  async weekly({
    symbol,
    datatype = 'json'
  }: WeeklyParams) {
    const params: Record<string, string> = {
      symbol,
      datatype
    };

    return this.api.call<Weekly>('TIME_SERIES_WEEKLY', params);
  }

  async weeklyAdjusted({
    symbol,
    datatype = 'json'
  }: WeeklyAdjustedParams) {
    const params: Record<string, string> = {
      symbol,
      datatype
    };

    return this.api.call<WeeklyAdjusted>('TIME_SERIES_WEEKLY_ADJUSTED', params);
  }

  async monthly({
    symbol,
    datatype = 'json'
  }: MonthlyParams) {
    const params: Record<string, string> = {
      symbol,
      datatype
    };

    return this.api.call<Monthly>('TIME_SERIES_MONTHLY', params);
  }

  async monthlyAdjusted({
    symbol,
    datatype = 'json'
  }: MonthlyAdjustedParams) {
    const params: Record<string, string> = {
      symbol,
      datatype
    };

    return this.api.call<MonthlyAdjusted>('TIME_SERIES_MONTHLY_ADJUSTED', params);
  }

  async quote({
    symbol,
    datatype = 'json'
  }: QuoteParams) {
    const params: Record<string, string> = {
      symbol,
      datatype
    };

    return this.api.call<GlobalQuote>('GLOBAL_QUOTE', params);
  }

  async bulkQuotes({
    symbols,
    datatype = 'json'
  }: BulkQuotesParams) {
    // Ensure we don't exceed 100 symbols limit
    const limitedSymbols = symbols.slice(0, 100);
    
    const params: Record<string, string> = {
      symbol: limitedSymbols.join(','),
      datatype
    };

    return this.api.call('REALTIME_BULK_QUOTES', params, false, true);
  }

  async search({
    keywords,
    datatype = 'json'
  }: SearchParams) {
    const params: Record<string, string> = {
      keywords,
      datatype
    };

    return this.api.call<SearchResults>('SYMBOL_SEARCH', params);
  }
}
