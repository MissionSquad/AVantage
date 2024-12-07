import { Datatype, MinuteIntervals, OHLC, OutputSize } from './general'

// inputs

export interface ForexIntradayParams {
  from_symbol: string;
  to_symbol: string;
  interval: MinuteIntervals
  outputsize?: OutputSize
  datatype?: Datatype
}

export interface ForexDailyParams {
  from_symbol: string;
  to_symbol: string;
  outputsize?: OutputSize
  datatype?: Datatype
}

export interface ForexWeeklyMonthlyParams {
  from_symbol: string;
  to_symbol: string;
  datatype?: Datatype
}

// outputs

export interface ForexExchangeRate {
  from_currency_code: string;
  from_currency_name: string;
  to_currency_code: string;
  to_currency_name: string;
  exchange_rate: number;
  last_refreshed: string;
  time_zone: string;
  bid_price: number;
  ask_price: number;
}

export interface ForexIntradayMetadata {
  information: string;
  from_symbol: string;
  to_symbol: string;
  last_refreshed: string;
  interval: string;
  output_size: OutputSize;
  time_zone: string;
}

export interface ForexIntraday {
  meta_data: ForexIntradayMetadata
  time_series: OHLC[]
}

export interface ForexDailyMetadata {
  information: string;
  from_symbol: string;
  to_symbol: string;
  output_size: OutputSize;
  last_refreshed: string;
  time_zone: string;
}
export interface ForexDaily {
  meta_data: ForexDailyMetadata
  time_series: OHLC[]
}

export interface ForexWeeklyMonthlyMetadata {
  information: string;
  from_symbol: string;
  to_symbol: string;
  last_refreshed: string;
  time_zone: string;
}

export interface ForexWeeklyMonthly {
  meta_data: ForexWeeklyMonthlyMetadata
  time_series: OHLC[]
}
