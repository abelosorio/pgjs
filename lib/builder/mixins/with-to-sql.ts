import type QueryBuilder from '../queryBuilder/query-builder'
import type { Constructor } from './types'

export default function WithToSql<TBase extends Constructor<QueryBuilder>>(Base: TBase) {
  return class extends Base {

    toSql(): string {
      let sql = `${this.selectBuildBlock?.toSQL()}`

      sql += ` FROM ${this.table}`
      sql += (this as any).getWhereClause()
      sql += ';'

      return sql
    }
  }
}
