import { Datatype, MinuteIntervals, OHLCV, OutputSize } from './general';

// inputs

export interface CryptoIntradayParams {
  symbol: string;
  market: string;
  interval: MinuteIntervals
  outputsize?: OutputSize
  datatype?: Datatype
}

export interface CryptoTimeSeriesParams {
  symbol: string
  market: string
  datatype?: Datatype
}

// outputs

export interface MetadataCrypto {
  information: string
  digital_currency_code: string
  digital_currency_name: string
  market_code: string
  market_name: string
  last_refreshed: string
  time_zone: string
}

export interface MetadataCryptoIntraday extends MetadataCrypto {
  interval: string
  output_size: string
}

export interface CryptoTimeSeries {
  meta_data: MetadataCrypto
  time_series: OHLCV[]
}

export interface CryptoIntradayTimeSeries {
  meta_data: MetadataCryptoIntraday
  time_series: OHLCV[]
}

export interface RealtimeCurrencyExchangeRate {
  from_currency_code: string
  from_currency_name: string
  to_currency_code: string
  to_currency_name: string
  exchange_rate: number
  last_refreshed: string
  time_zone: string
  bid_price: number
  ask_price: number
}
