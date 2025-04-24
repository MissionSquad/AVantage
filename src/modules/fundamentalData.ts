import { BalanceSheet, CashFlow, CompanyOverview, Dividends, Earnings, EarningsCalendarItem, EarningsCalendarParams, ETFProfile, IncomeStatement, IPOCalendarItem, ListingStatus, ListingStatusParams, Splits } from '../types/fundamentalData'
import { Api } from '../utils/api'

export class FundamentalData {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async companyOverview(symbol: string) {
    return this.api.call<CompanyOverview>('OVERVIEW', { symbol }, true);
  }

  async etfProfile(symbol: string) {
    return this.api.call<ETFProfile>('ETF_PROFILE', { symbol });
  }

  async dividends(symbol: string) {
    return this.api.call<Dividends>('DIVIDENDS', { symbol });
  }

  async splits(symbol: string) {
    return this.api.call<Splits>('SPLITS', { symbol });
  }

  async incomeStatement(symbol: string) {
    return this.api.call<IncomeStatement>('INCOME_STATEMENT', { symbol }, true);
  }

  async balanceSheet(symbol: string) {
    return this.api.call<BalanceSheet>('BALANCE_SHEET', { symbol }, true);
  }

  async cashFlow(symbol: string) {
    return this.api.call<CashFlow>('CASH_FLOW', { symbol }, true);
  }

  async earnings(symbol: string) {
    return this.api.call<Earnings>('EARNINGS', { symbol }, true);
  }

  async listingStatus({
    symbol,
    date,
    state = 'active'
  }: ListingStatusParams = {}) {
    const params: Record<string, string> = {
      state
    };

    if (date) {
      params.date = date;
    }

    const { data } = await this.api.callCSV<ListingStatus[]>('LISTING_STATUS', params);
    const mapped = (data ?? []).map(({delistingdate, ...i}) => ({
      ...i,
      delistingdate: delistingdate === 'null' ? null : delistingdate
    }))
    const response = symbol != null && symbol.trim() !== ''
      ? mapped.filter(i => i.symbol === symbol)
      : mapped
    return {
      data: response
    }
  }

  // This API returns a list of company earnings expected in the next 3, 6, or 12 months.
  async earningsCalendar({
    symbol,
    horizon = '3month'
  }: EarningsCalendarParams = {}) {
    const params: Record<string, string> = {
      horizon
    };

    if (symbol) {
      params.symbol = symbol;
    }

    return this.api.callCSV<EarningsCalendarItem[]>('EARNINGS_CALENDAR', params);
  }

  // This API returns a list of IPOs expected in the next 3 months.
  async ipoCalendar() {
    return this.api.callCSV<IPOCalendarItem[]>('IPO_CALENDAR', {});
  }
}
