export interface NewsSentimentsParams {
  tickersList?: string[];
  topics?: string;
  time_from?: string;
  time_to?: string;
  sort?: 'LATEST' | 'EARLIEST' | 'RELEVANCE';
  limit?: number;
}

export type WindowIntervals = '1min' | '5min' | '15min' | '30min' | '60min' | 'DAILY' | 'WEEKLY' | 'MONTHLY'

export type OHLCKey = 'open' | 'high' | 'low' | 'close'

export interface FixedWindowAnalyticsParams {
  symbols: string[];
  range: string;
  interval: WindowIntervals
  calculations: string[];
  ohlc?: OHLCKey
}

export interface SlidingWindowAnalyticsParams {
  symbols: string[];
  range: string;
  interval: WindowIntervals
  window_size: number;
  calculations: string[];
  ohlc?: OHLCKey
}

export interface Topic {
  topic: string
  relevance_score: number
}

export interface TickerSentiment {
  ticker: string
  relevance_score: number
  ticker_sentiment_score: number
  ticker_sentiment_label: string
}

export interface NewsSentiment {
  title: string
  url: string
  time_published: string
  authors: string[]
  summary: string
  banner_image: string
  source: string
  category_within_source: string
  topics: Topic[]
  overall_sentiment_score: number
  overall_sentiment_label: string
  ticker_sentiment: TickerSentiment[]
}

export interface TopTicker {
  ticker: string
  price: number
  change_amount: number
  change_percentage: string
  volume: number
}

export interface TopGainersLosers {
  metadata: string
  last_updated: string
  top_gainers: TopTicker[]
  top_losers: TopTicker[]
  most_actively_traded: TopTicker[]
}

export interface InsiderTransaction {
  transaction_date: string
  ticker: string
  executive: string
  executive_title: string
  security_type: string
  acquisition_or_disposal: string
  shares: number
  share_price: number
}

export interface InsiderTransactions {
  data: InsiderTransaction[]
}