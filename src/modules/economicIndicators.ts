import { CPIParams, DataTypeParam, FederalFundsRateParams, RealGDPParams, RealGDPPerCapitaParams, TreasuryYieldParams } from '../types/economicIndicators'
import { ItemValues } from '../types/general'
import { Api } from '../utils/api'

export class EconomicIndicators {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async realGDP({
    interval = 'annual',
    datatype = 'json'
  }: RealGDPParams = {}) {
    const params: Record<string, string> = {
      datatype
    }

    if (interval) {
      params.interval = interval;
    }

    return this.api.call<ItemValues>('REAL_GDP', params);
  }

  async realGDPPerCapita({
    datatype = 'json'
  }: RealGDPPerCapitaParams = {}) {
    return this.api.call<ItemValues>('REAL_GDP_PER_CAPITA', {
      datatype
    });
  }

  async treasuryYield({
    interval = 'monthly',
    maturity = '10year',
    datatype = 'json'
  }: TreasuryYieldParams = {}) {
    const params: Record<string, string> = {
      datatype
    }

    if (interval) {
      params.interval = interval;
    }

    if (maturity) {
      params.maturity = maturity;
    }

    return this.api.call<ItemValues>('TREASURY_YIELD', params);
  }

  async federalFundsRate({
    interval = 'monthly',
    datatype = 'json'
  }: FederalFundsRateParams = {}) {
    const params: Record<string, string> = {
      datatype
    }

    if (interval) {
      params.interval = interval;
    }

    return this.api.call<ItemValues>('FEDERAL_FUNDS_RATE', params);
  }

  async cpi({
    interval = 'monthly',
    datatype = 'json'
  }: CPIParams = {}) {
    const params: Record<string, string> = {
      datatype
    }

    if (interval) {
      params.interval = interval;
    }

    return this.api.call<ItemValues>('CPI', params);
  }

  async inflation({
    datatype = 'json'
  }: DataTypeParam = {}) {
    return this.api.call<ItemValues>('INFLATION', {
      datatype
    });
  }

  async retailSales({
    datatype = 'json'
  }: DataTypeParam = {}) {
    return this.api.call<ItemValues>('RETAIL_SALES', {
      datatype
    });
  }

  async durableGoodsOrders({
    datatype = 'json'
  }: DataTypeParam = {}) {
    return this.api.call<ItemValues>('DURABLES', {
      datatype
    });
  }

  async unemploymentRate({
    datatype = 'json'
  }: DataTypeParam = {}) {
    return this.api.call<ItemValues>('UNEMPLOYMENT', {
      datatype
    });
  }

  async nonfarmPayroll({
    datatype = 'json'
  }: DataTypeParam = {}) {
    return this.api.call<ItemValues>('NONFARM_PAYROLL', {
      datatype
    });
  }
}
