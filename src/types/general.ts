export type MinuteIntervals = '1min' | '5min' | '15min' | '30min' | '60min'
export type OutputSize = 'compact' | 'full'
export type Datatype = 'json' | 'csv'

export interface ItemValues {
  name: string
  interval: string
  unit: string
  data: { date: string; value: number }[]
}

export interface OHLC {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
}

export interface OHLCV extends OHLC {
  volume: string
}