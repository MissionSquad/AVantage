import { ItemValues } from '../types/general'
import { Api } from '../utils/api'

interface DailyWeeklyMonthlyParams {
  interval?: 'daily' | 'weekly' | 'monthly';
  datatype?: 'json' | 'csv';
}

interface MonthlyQuarterlyAnnualParams {
  interval?: 'monthly' | 'quarterly' | 'annual';
  datatype?: 'json' | 'csv';
}

export class Commodities {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async wtiCrudeOil(params: DailyWeeklyMonthlyParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('WTI', apiParams);
  }

  async brentCrudeOil(params: DailyWeeklyMonthlyParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('BRENT', apiParams);
  }

  async naturalGas(params: DailyWeeklyMonthlyParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('NATURAL_GAS', apiParams);
  }

  async copper(params: MonthlyQuarterlyAnnualParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('COPPER', apiParams);
  }

  async aluminum(params: MonthlyQuarterlyAnnualParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('ALUMINUM', apiParams);
  }

  async wheat(params: MonthlyQuarterlyAnnualParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('WHEAT', apiParams);
  }

  async corn(params: MonthlyQuarterlyAnnualParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('CORN', apiParams);
  }

  async cotton(params: MonthlyQuarterlyAnnualParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('COTTON', apiParams);
  }

  async sugar(params: MonthlyQuarterlyAnnualParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('SUGAR', apiParams);
  }

  async coffee(params: MonthlyQuarterlyAnnualParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('COFFEE', apiParams);
  }

  async globalIndex(params: MonthlyQuarterlyAnnualParams = {}) {
    const apiParams: Record<string, string> = {
      ...(params.interval && { interval: params.interval }),
      ...(params.datatype && { datatype: params.datatype })
    };

    return this.api.call<ItemValues>('ALL_COMMODITIES', apiParams);
  }
}
