import { ForexDaily, ForexDailyParams, ForexExchangeRate, ForexIntraday, ForexIntradayParams, ForexWeeklyMonthly, ForexWeeklyMonthlyParams } from '../types/forex'
import { Api } from '../utils/api'

export class Forex {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async exchangeRates(fromCurrency: string, toCurrency: string) {
    const params: Record<string, string> = {
      from_currency: fromCurrency,
      to_currency: toCurrency
    }

    return this.api.call<ForexExchangeRate>('CURRENCY_EXCHANGE_RATE', params)
  }

  async intraday({
    from_symbol,
    to_symbol,
    interval,
    outputsize = 'compact',
    datatype = 'json'
  }: ForexIntradayParams) {
    const params: Record<string, string> = {
      from_symbol,
      to_symbol,
      interval,
      outputsize,
      datatype
    }

    return this.api.call<ForexIntraday>('FX_INTRADAY', params)
  }

  async daily({
    from_symbol,
    to_symbol,
    outputsize = 'compact',
    datatype = 'json'
  }: ForexDailyParams) {
    const params: Record<string, string> = {
      from_symbol,
      to_symbol,
      outputsize,
      datatype
    }

    return this.api.call<ForexDaily>('FX_DAILY', params)
  }

  async weekly({
    from_symbol,
    to_symbol,
    datatype = 'json'
  }: ForexWeeklyMonthlyParams) {
    const params: Record<string, string> = {
      from_symbol,
      to_symbol,
      datatype
    }

    return this.api.call<ForexWeeklyMonthly>('FX_WEEKLY', params)
  }

  async monthly({
    from_symbol,
    to_symbol,
    datatype = 'json'
  }: ForexWeeklyMonthlyParams) {
    const params: Record<string, string> = {
      from_symbol,
      to_symbol,
      datatype
    }

    return this.api.call<ForexWeeklyMonthly>('FX_MONTHLY', params)
  }
}
