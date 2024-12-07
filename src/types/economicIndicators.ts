import { Datatype } from './general'

export type DailyWeeklyMonthly = 'daily' | 'weekly' | 'monthly'

export interface RealGDPParams {
  interval?: 'annual' | 'quarterly'
  datatype?: Datatype
}

export interface RealGDPPerCapitaParams {
  datatype?: Datatype
}

export interface TreasuryYieldParams {
  interval?: DailyWeeklyMonthly
  maturity?: '3month' | '2year' | '5year' | '7year' | '10year' | '30year'
  datatype?: Datatype
}

export interface FederalFundsRateParams {
  interval?: DailyWeeklyMonthly
  datatype?: Datatype
}

export interface CPIParams {
  interval?: 'monthly' | 'semiannual'
  datatype?: Datatype
}

export interface DataTypeParam {
  datatype?: Datatype
}