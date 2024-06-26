import { createClient, ResponseJSON } from '@clickhouse/client-web'
import { ParsedUrlQueryInput, stringify } from 'querystring'

import { AutoRouter } from 'itty-router'

// TODO: figure out how to initialize to support both the Clickhouse web and/or node API as well as GET via fetch
// for a lighter weight solution that's also CDN cacheable 

export function sql(strings: TemplateStringsArray) {
  return (queryParams: ParsedUrlQueryInput) => {
    const params: ParsedUrlQueryInput = {
      query: strings[0]
    }
    Object.entries(queryParams).map(([key, value]) => { 
      if (typeof(value) === 'string') params['param_' + key] = value.replaceAll('_', ' ')
    })
    return fetch(process.env.endpoint + stringify(params)).then((res) => res.json()) as Promise<ResponseJSON<any>>
    // return clickhouse.query({
    //   query: strings[0],
    //   format: 'JSON',
    //   query_params: params,
    //   clickhouse_settings: {
    //     max_estimated_execution_time: 90000,
    //     timeout_overflow_mode: 'break',
    //   }
    // }).then((res) => res.json())
  }
}


const api = AutoRouter()







.get('/:vin/listings', ({ vin, query: { limit = 100, offset = 0 } }) => sql` 
  
SELECT 
  *,
  min(date) as firstSeen,
  max(date) as lastSeen,
  min(price) as minPrice,
  max(price) as maxPrice,
  avg(price) as avgPrice,
  min(mileage) as minMileage,
  max(mileage) as maxMileage,
  avg(mileage) as avgMileage,
  count(*) as count
FROM listings 
WHERE vin = {vin: String = WP0AF2A99KS165242}
GROUP BY vin
LIMIT {limit: Number}
OFFSET {offset: Number}

`({ vin, limit, offset }))








