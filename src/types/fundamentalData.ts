export interface ListingStatusParams {
  symbol?: string;
  date?: string;
  state?: 'active' | 'delisted';
}

export interface EarningsCalendarParams {
  symbol?: string;
  horizon?: '3month' | '6month' | '12month';
}

export interface CompanyOverview {
  symbol: string;
  assetType: string;
  name: string;
  description: string;
  CIK: number;
  exchange: string;
  currency: string;
  country: string;
  sector: string;
  industry: string;
  address: string;
  officialSite: string;
  fiscalYearEnd: string;
  latestQuarter: string;
  marketCapitalization: string;
  EBITDA: number;
  PERatio: number;
  PEGRatio: number;
  bookValue: number;
  dividendPerShare: number;
  dividendYield: number;
  EPS: number;
  revenuePerShareTTM: number;
  profitMargin: number;
  operatingMarginTTM: number;
  returnOnAssetsTTM: number;
  returnOnEquityTTM: number;
  revenueTTM: number;
  grossProfitTTM: number;
  dilutedEPSTTM: number;
  quarterlyEarningsGrowthYOY: number;
  quarterlyRevenueGrowthYOY: number;
  analystTargetPrice: number;
  trailingPE: number;
  forwardPE: number;
  priceToSalesRatioTTM: number;
  priceToBookRatio: number;
  EVToRevenue: number;
  EVToEBITDA: number;
  beta: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  fiftyDayMovingAverage: number;
  twoHundredDayMovingAverage: number;
  sharesOutstanding: number;
  sharesFloat: number;
  sharesShort: number;
  sharesShortPriorMonth: number;
  shortRatio: number;
  shortPercentOutstanding: number;
  shortPercentFloat: number;
  lag1Volume: number;
  averageVolume: number;
  avgVolume: number;
  marketCap: number;
  price: number;
  lastDividendValue: number;
  setEPSDate: Date;
  nextEarningsDate: Date;
  mostRecentQuarter: string;
  payoutRatio: number;
  dividendDate: Date;
  exDividendDate: Date;
  lastSplitFactor: string;
  lastSplitDate: Date;
}

export interface ETFProfile {
  net_assets: number;
  net_expense_ratio: number;
  portfolio_turnover: number;
  dividend_yield: number;
  inception_date: string;
  leveraged: 'YES' | 'NO';
  asset_allocation: {
    domestic_equities: number;
    foreign_equities: number;
    bond: number;
    cash: number;
    other: number;
  };
  sectors: { sector: string; weight: number }[];
  holdings: { symbol: string; description: string; weight: number }[];
}

export interface Dividends {
  symbol: string;
  data: {
    ex_dividend_date: string;
    declaration_date: string;
    record_date: string;
    payment_date: string;
    amount: number;
  }[];
}

export interface Splits {
  symbol: string;
  data: {
    effective_date: string;
    split_factor: number;
  }[];
}

export interface IncomeReport {
  fiscalDateEnding: string;
  reportedCurrency: string;
  grossProfit: number;
  totalRevenue: number;
  costOfRevenue: number;
  costofGoodsAndServicesSold: number;
  operatingIncome: number;
  sellingGeneralAndAdministrative: number;
  researchAndDevelopment: number;
  operatingExpenses: number;
  investmentIncomeNet: number;
  netInterestIncome: number;
  interestIncome: number;
  interestExpense: number;
  nonInterestIncome: number;
  otherNonOperatingIncome: number;
  depreciation: number;
  depreciationAndAmortization: number;
  incomeBeforeTax: number;
  incomeTaxExpense: number;
  interestAndDebtExpense: number;
  netIncomeFromContinuingOperations: number;
  comprehensiveIncomeNetOfTax: number;
  ebit: number;
  ebitda: number;
  netIncome: number;
}

export interface IncomeStatement {
  symbol: string;
  annualReports: IncomeReport[];
  quarterlyReports: IncomeReport[];
}

export interface BalanceReport {
  fiscalDateEnding: string
  reportedCurrency: string
  totalAssets: number
  totalCurrentAssets: number
  cashAndCashEquivalentsAtCarryingValue: number
  cashAndShortTermInvestments: number
  inventory: number
  currentNetReceivables: number
  totalNonCurrentAssets: number
  propertyPlantEquipmentNet: number
  accumulatedDepreciationAmortizationPPE: number
  intangibleAssets: number
  intangibleAssetsExcludingGoodwill: number
  goodwill: number
  investments: number
  longTermInvestments: number
  shortTermInvestments: number
  otherCurrentAssets: number
  otherNonCurrentAssets: number
  totalLiabilities: number
  totalCurrentLiabilities: number
  currentAccountsPayable: number
  deferredRevenue: number
  currentDebt: number
  shortTermDebt: number
  totalNonCurrentLiabilities: number
  capitalLeaseObligations: number
  longTermDebt: number
  currentLongTermDebt: number
  longTermDebtNoncurrent: number
  shortLongTermDebtTotal: number
  otherCurrentLiabilities: number
  otherNonCurrentLiabilities: number
  totalShareholderEquity: number
  treasuryStock: number
  retainedEarnings: number
  commonStock: number
  commonStockSharesOutstanding: number
}

export interface BalanceSheet {
  symbol: string;
  annualReports: BalanceReport[];
  quarterlyReports: BalanceReport[];
}

export interface CashReport {
  fiscalDateEnding: string
  reportedCurrency: string
  operatingCashflow: number
  paymentsForOperatingActivities: number
  proceedsFromOperatingActivities: number
  changeInOperatingLiabilities: number
  changeInOperatingAssets: number
  depreciationDepletionAndAmortization: number
  capitalExpenditures: number
  changeInReceivables: number
  changeInInventory: number
  profitLoss: number
  cashflowFromInvestment: number
  cashflowFromFinancing: number
  proceedsFromRepaymentsOfShortTermDebt: number
  paymentsForRepurchaseOfCommonStock: number
  paymentsForRepurchaseOfEquity: number
  paymentsForRepurchaseOfPreferredStock: number
  dividendPayout: number
  dividendPayoutCommonStock: number
  dividendPayoutPreferredStock: number
  proceedsFromIssuanceOfCommonStock: number
  proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet: number
  proceedsFromIssuanceOfPreferredStock: number
  proceedsFromRepurchaseOfEquity: number
  proceedsFromSaleOfTreasuryStock: number
  changeInCashAndCashEquivalents: number
  changeInExchangeRate: number
  netIncome: number
}

export interface CashFlow {
  symbol: string;
  annualReports: CashReport[];
  quarterlyReports: CashReport[];
}

export interface AnnualEarningsReport {
  fiscalDateEnding: string
  reportedEPS: number
}

export interface QuarterlyEarningsReport {
  fiscalDateEnding: string
  reportedDate: string
  reportedEPS: number
  estimatedEPS: number
  surprise: number
  surprisePercentage: number
  reportTime: string
}

export interface Earnings {
  symbol: string
  annualEarnings: AnnualEarningsReport[]
  quarterlyEarnings: QuarterlyEarningsReport[]
}

export interface ListingStatus {
  symbol: string
  name: string
  exchange: string
  assettype: string
  ipodate: string
  delistingdate: string | null
  status: string
}

export interface EarningsCalendarItem {
  symbol: string
  name: string
  reportdate: string
  fiscaldateending: string
  estimate: number | null
  currency: string
}

export interface IPOCalendarItem {
  symbol: string
  name: string
  ipodate: string
  pricerangelow: number
  pricerangehigh: number
  currency: string
  exchange: string
}
