import { Datatype, MinuteIntervals, OHLCV, OutputSize } from './general'

// inputs

export interface IntradayParams {
  symbol: string;
  interval: MinuteIntervals;
  adjusted?: boolean;
  extended_hours?: boolean;
  month?: string;
  outputsize?: OutputSize
  datatype?: Datatype
}

export interface DailyParams {
  symbol: string;
  outputsize?: OutputSize
  datatype?: Datatype
}

export interface DailyAdjustedParams {
  symbol: string;
  outputsize?: OutputSize
  datatype?: Datatype
}

export interface WeeklyParams {
  symbol: string;
  datatype?: Datatype
}

export interface WeeklyAdjustedParams {
  symbol: string;
  datatype?: Datatype
}

export interface MonthlyParams {
  symbol: string;
  datatype?: Datatype
}

export interface MonthlyAdjustedParams {
  symbol: string;
  datatype?: Datatype
}

export interface QuoteParams {
  symbol: string;
  datatype?: Datatype
}

export interface BulkQuotesParams {
  symbols: string[];
  datatype?: Datatype
}

export interface SearchParams {
  keywords: string;
  datatype?: Datatype
}

// outputs

export interface Metadata {
  information: string
  symbol: string
  last_refreshed: string
  interval: MinuteIntervals
  output_size: OutputSize
  time_zone: string
}

export interface MetadataInterval extends Metadata {
  interval: MinuteIntervals
  output_size: OutputSize
}

export interface OHLCVAdjustedDaily extends OHLCV {
  adjusted_close: number
  split_coefficient: number
  dividend_amount: string
}

export interface OHLCVAdjusted extends OHLCV {
  adjusted_close: number
  dividend_amount: string
}

export interface Intraday {
  meta_data: MetadataInterval
  time_series: OHLCV[]
}

export interface Daily {
  meta_data: MetadataInterval
  time_series: OHLCV[]
}

export interface DailyAdjusted {
  meta_data: MetadataInterval
  time_series: OHLCVAdjustedDaily[]
}

export interface Weekly {
  meta_data: Metadata
  time_series: OHLCV[]
}

export interface WeeklyAdjusted {
  meta_data: Metadata
  time_series: OHLCVAdjusted[]
}

export interface Monthly {
  meta_data: Metadata
  time_series: OHLCV[]
}

export interface MonthlyAdjusted {
  meta_data: Metadata
  time_series: OHLCVAdjusted[]
}

export interface GlobalQuote {
  symbol: string
  open: number
  high: number
  low: number
  price: number
  volume: string
  latest_trading_day: string
  previous_close: number
  change: number
  change_percent: string
}

export interface SearchResult {
  symbol: string
  name: string
  type: string
  region: string
  marketopen: string
  marketclose: string
  timezone: string
  currency: string
  matchscore: number
}

export interface SearchResults {
  bestmatches: SearchResult[]
}