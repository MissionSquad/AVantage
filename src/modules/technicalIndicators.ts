import { Api } from '../utils/api'

interface CommonIndicatorParams {
  symbol: string;
  interval: string;
  datatype?: 'json' | 'csv';
  month?: string; // Optional month parameter for intraday intervals (YYYY-MM format)
}

interface TimeSeriesIndicatorParams extends CommonIndicatorParams {
  time_period: string;
  series_type: string;
}

interface FastSlowIndicatorParams extends CommonIndicatorParams {
  fastperiod?: string;
  slowperiod?: string;
}

interface MamaIndicatorParams extends CommonIndicatorParams {
  fastlimit?: string;
  slowlimit?: string;
  series_type: string;
}

export class TechnicalIndicators {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  private getParams(params: Record<string, string | undefined>): Record<string, string> {
    return Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== undefined)
    ) as Record<string, string>;
  }

  // Group 1: Basic Moving Averages
  async sma({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('SMA', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async ema({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('EMA', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async wma({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('WMA', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async dema({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('DEMA', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async tema({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('TEMA', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async trima({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('TRIMA', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async kama({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('KAMA', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  // Group 2: Volume Indicators
  async ad({symbol, interval, month, datatype = 'json'}: CommonIndicatorParams) {
    return this.api.call('AD', this.getParams({ symbol, interval, month, datatype }));
  }

  async adosc({symbol, interval, fastperiod = '3', slowperiod = '10', month, datatype = 'json'}: FastSlowIndicatorParams) {
    return this.api.call('ADOSC', this.getParams({ symbol, interval, fastperiod, slowperiod, month, datatype }));
  }

  async obv({symbol, interval, month, datatype = 'json'}: CommonIndicatorParams) {
    return this.api.call('OBV', this.getParams({ symbol, interval, month, datatype }));
  }

  // Group 3: Hilbert Transform Indicators
  async htTrendline({symbol, interval, series_type, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'time_period'>) {
    return this.api.call('HT_TRENDLINE', this.getParams({ symbol, interval, series_type, month, datatype }));
  }

  async htSine({symbol, interval, series_type, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'time_period'>) {
    return this.api.call('HT_SINE', this.getParams({ symbol, interval, series_type, month, datatype }));
  }

  async htTrendmode({symbol, interval, series_type, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'time_period'>) {
    return this.api.call('HT_TRENDMODE', this.getParams({ symbol, interval, series_type, month, datatype }));
  }

  async htDcperiod({symbol, interval, series_type, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'time_period'>) {
    return this.api.call('HT_DCPERIOD', this.getParams({ symbol, interval, series_type, month, datatype }));
  }

  async htDcphase({symbol, interval, series_type, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'time_period'>) {
    return this.api.call('HT_DCPHASE', this.getParams({ symbol, interval, series_type, month, datatype }));
  }

  async htPhasor({symbol, interval, series_type, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'time_period'>) {
    return this.api.call('HT_PHASOR', this.getParams({ symbol, interval, series_type, month, datatype }));
  }

  // Group 4: MAMA Indicator
  async mama({symbol, interval, series_type, fastlimit = '0.01', slowlimit = '0.01', month, datatype = 'json'}: MamaIndicatorParams) {
    return this.api.call('MAMA', this.getParams({ symbol, interval, series_type, fastlimit, slowlimit, month, datatype }));
  }

  // Group 5: T3 and NATR
  async t3({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('T3', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async natr({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('NATR', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  // Group 6: VWAP (Premium)
  async vwap({symbol, interval, month, datatype = 'json'}: CommonIndicatorParams) {
    if (!interval.includes('min')) {
      throw new Error('VWAP only supports intraday intervals');
    }
    return this.api.call('VWAP', this.getParams({ symbol, interval, month, datatype }));
  }

  // Existing methods with updated parameter handling
  async rocr({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('ROCR', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async aroon({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('AROON', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async aroonosc({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('AROONOSC', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async mfi({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('MFI', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async trix({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('TRIX', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async ultosc({symbol, interval, month, datatype = 'json'}: CommonIndicatorParams) {
    return this.api.call('ULTOSC', this.getParams({ symbol, interval, month, datatype }));
  }

  async dx({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('DX', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async minusDI({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('MINUS_DI', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async plusDI({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('PLUS_DI', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async minusDM({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('MINUS_DM', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async plusDM({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('PLUS_DM', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async bbands({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('BBANDS', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async midpoint({symbol, interval, time_period, series_type, month, datatype = 'json'}: TimeSeriesIndicatorParams) {
    return this.api.call('MIDPOINT', this.getParams({ symbol, interval, time_period, series_type, month, datatype }));
  }

  async midprice({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('MIDPRICE', this.getParams({ symbol, interval, time_period, month, datatype }));
  }

  async sar({symbol, interval, month, datatype = 'json'}: CommonIndicatorParams) {
    return this.api.call('SAR', this.getParams({ symbol, interval, month, datatype }));
  }

  async trange({symbol, interval, month, datatype = 'json'}: CommonIndicatorParams) {
    return this.api.call('TRANGE', this.getParams({ symbol, interval, month, datatype }));
  }

  async atr({symbol, interval, time_period, month, datatype = 'json'}: Omit<TimeSeriesIndicatorParams, 'series_type'>) {
    return this.api.call('ATR', this.getParams({ symbol, interval, time_period, month, datatype }));
  }
}
