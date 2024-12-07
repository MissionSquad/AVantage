import 'dotenv/config'
import { Api } from './utils/api'
import { AlphaIntelligence } from './modules/alphaIntelligence'
import { CoreStock } from './modules/coreStock'
import { OptionsData } from './modules/optionsData'
import { FundamentalData } from './modules/fundamentalData'
import { Forex } from './modules/forex'
import { Crypto } from './modules/crypto'
import { Commodities } from './modules/commodities'
import { EconomicIndicators } from './modules/economicIndicators'
import { TechnicalIndicators } from './modules/technicalIndicators'

const AV_API_KEY = process.env.AV_API_KEY ?? ''
const PREMEIUM_ENABLED = /true/i.test(process.env.PREMIUM ?? 'false')

export class AVantage {
  private api: Api
  public coreStock: CoreStock
  public optionsData: OptionsData
  public alphaIntelligence: AlphaIntelligence
  public fundamentalData: FundamentalData
  public forex: Forex
  public crypto: Crypto
  public commodities: Commodities
  public economicIndicators: EconomicIndicators
  public technicalIndicators: TechnicalIndicators

  constructor(apiKey?: string) {
    this.api = new Api(apiKey ?? AV_API_KEY, PREMEIUM_ENABLED)
    this.coreStock = new CoreStock(this.api)
    this.optionsData = new OptionsData(this.api)
    this.alphaIntelligence = new AlphaIntelligence(this.api)
    this.fundamentalData = new FundamentalData(this.api)
    this.forex = new Forex(this.api)
    this.crypto = new Crypto(this.api)
    this.commodities = new Commodities(this.api)
    this.economicIndicators = new EconomicIndicators(this.api)
    this.technicalIndicators = new TechnicalIndicators(this.api)
  }

  get baseUrl() {
    return this.api.baseUrl
  }
}