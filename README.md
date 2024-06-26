# @graphdl/clickhouse


``` typescript
import { sql } from '@graphdl/clickhouse'

api

  .get('/:vin/values', ({ vin }) => sql` SELECT * FROM values WHERE vin = ${vin: String} `({ vin }))

  .get('/:vin/listings', ({ vin, query: { limit = 100, offset = 0} }) => sql` 
  
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

  ```
