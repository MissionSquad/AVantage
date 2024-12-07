import { AVantage } from '../src/index'
import { Api } from '../src/utils/api'
import { CoreStock } from '../src/modules/coreStock'

const AV_API_KEY = process.env.API_KEY ?? ''

jest.mock('../src/utils/api')

describe('Avantage', () => {
  beforeEach(() => {
    (Api as jest.Mock).mockImplementation((apiKey: string) => ({
      baseUrl: 'https://www.alphavantage.co/query',
      call: jest.fn().mockResolvedValue({})
    }))
  })

  it('should return the correct base URL', () => {
    const avantage = new AVantage(AV_API_KEY)
    expect(avantage.baseUrl).toBe('https://www.alphavantage.co/query')
  })
})

describe('CoreStock', () => {
  let api: jest.Mocked<Api>
  let coreStock: CoreStock

  beforeEach(() => {
    api = new Api(AV_API_KEY) as jest.Mocked<Api>
    api.call = jest.fn().mockResolvedValue({})
    coreStock = new CoreStock(api)
  })

  describe('intraday', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.intraday({ symbol: 'IBM', interval: '5min' })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_INTRADAY', {
        symbol: 'IBM',
        interval: '5min',
        adjusted: 'true',
        extended_hours: 'true',
        outputsize: 'compact',
        datatype: 'json'
      })
    })

    it('should include month parameter when provided', async () => {
      await coreStock.intraday({
        symbol: 'IBM',
        interval: '5min',
        month: '2023-07'
      })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_INTRADAY', {
        symbol: 'IBM',
        interval: '5min',
        adjusted: 'true',
        extended_hours: 'true',
        outputsize: 'compact',
        datatype: 'json',
        month: '2023-07'
      })
    })
  })

  describe('daily', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.daily({ symbol: 'IBM' })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_DAILY', {
        symbol: 'IBM',
        outputsize: 'compact',
        datatype: 'json'
      })
    })

    it('should respect custom parameters', async () => {
      await coreStock.daily({
        symbol: 'IBM',
        outputsize: 'full',
        datatype: 'csv'
      })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_DAILY', {
        symbol: 'IBM',
        outputsize: 'full',
        datatype: 'csv'
      })
    })
  })

  describe('dailyAdjusted', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.dailyAdjusted({ symbol: 'IBM' })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_DAILY_ADJUSTED', {
        symbol: 'IBM',
        outputsize: 'compact',
        datatype: 'json'
      })
    })
  })

  describe('weekly', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.weekly({ symbol: 'IBM' })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_WEEKLY', {
        symbol: 'IBM',
        datatype: 'json'
      })
    })
  })

  describe('weeklyAdjusted', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.weeklyAdjusted({ symbol: 'IBM' })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_WEEKLY_ADJUSTED', {
        symbol: 'IBM',
        datatype: 'json'
      })
    })
  })

  describe('monthly', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.monthly({ symbol: 'IBM' })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_MONTHLY', {
        symbol: 'IBM',
        datatype: 'json'
      })
    })
  })

  describe('monthlyAdjusted', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.monthlyAdjusted({ symbol: 'IBM' })

      expect(api.call).toHaveBeenCalledWith('TIME_SERIES_MONTHLY_ADJUSTED', {
        symbol: 'IBM',
        datatype: 'json'
      })
    })
  })

  describe('quote', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.quote({ symbol: 'IBM' })

      expect(api.call).toHaveBeenCalledWith('GLOBAL_QUOTE', {
        symbol: 'IBM',
        datatype: 'json'
      })
    })
  })

  describe('bulkQuotes', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.bulkQuotes({ symbols: ['IBM', 'AAPL'] })

      expect(api.call).toHaveBeenCalledWith('REALTIME_BULK_QUOTES', {
        symbol: 'IBM,AAPL',
        datatype: 'json'
      })
    })

    it('should limit symbols to 100', async () => {
      const symbols = Array(150).fill('IBM')
      await coreStock.bulkQuotes({ symbols })

      const calledParams = (api.call as jest.Mock).mock.calls[0][1]
      expect(calledParams.symbol.split(',').length).toBe(100)
    })
  })

  describe('search', () => {
    it('should call api with correct default parameters', async () => {
      await coreStock.search({ keywords: 'IBM' })

      expect(api.call).toHaveBeenCalledWith('SYMBOL_SEARCH', {
        keywords: 'IBM',
        datatype: 'json'
      })
    })
  })

  describe('error handling', () => {
    it('should propagate api errors', async () => {
      const error = new Error('API Error')
      api.call.mockRejectedValueOnce(error)

      await expect(coreStock.daily({ symbol: 'IBM' })).rejects.toThrow('API Error')
    })
  })
})
