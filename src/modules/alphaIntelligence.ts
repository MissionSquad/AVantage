import { FixedWindowAnalyticsParams, InsiderTransactions, NewsSentiments, NewsSentimentsParams, SlidingWindowAnalyticsParams, TopGainersLosers } from '../types/alphaIntelligence'
import { Api } from '../utils/api'

export class AlphaIntelligence {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async newsSentiments({
    tickersList,
    topics,
    time_from,
    time_to,
    sort = 'LATEST',
    limit = 50
  }: NewsSentimentsParams = {}) {
    const tickers = (tickersList ?? []).join(',')
    const params: Record<string, string> = {
      ...(tickers && { tickers }),
      ...(topics && { topics }),
      ...(time_from && { time_from }),
      ...(time_to && { time_to }),
      sort,
      limit: limit.toString()
    };

    return this.api.call<NewsSentiments>('NEWS_SENTIMENT', params);
  }

  async topGainersLosers() {
    return this.api.call<TopGainersLosers>('TOP_GAINERS_LOSERS', {});
  }

  async insiderTransactions(symbol: string) {
    const params: Record<string, string> = {
      symbol
    };

    return this.api.call<InsiderTransactions>('INSIDER_TRANSACTIONS', params);
  }

  async fixedWindowAnalytics({
    symbols,
    range,
    interval,
    calculations,
    ohlc = 'close'
  }: FixedWindowAnalyticsParams) {
    const params: Record<string, string> = {
      symbols: symbols.join(','),
      range,
      interval,
      calculations: calculations.join(','),
      ohlc
    };

    return this.api.call('ANALYTICS_FIXED_WINDOW', params);
  }

  async slidingWindowAnalytics({
    symbols,
    range,
    interval,
    window_size,
    calculations,
    ohlc = 'close'
  }: SlidingWindowAnalyticsParams) {
    const params: Record<string, string> = {
      symbols: symbols.join(','),
      range,
      interval,
      window_size: window_size.toString(),
      calculations: calculations.join(','),
      ohlc
    };

    return this.api.call('ANALYTICS_SLIDING_WINDOW', params);
  }
}
