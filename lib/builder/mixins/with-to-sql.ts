import type { Constructor } from './types'
import type QueryBuilder from '../query-builder'

export default function WithToSql<TBase extends Constructor<QueryBuilder>>(Base: TBase) {
  return class extends Base {
    fieldsToString (): string {
      if (this.fields.length === 0) return '*'

      return this.fields.join(', ')
    }

    toSql (): string {
      let sql = `SELECT ${this.fieldsToString()}`

      sql += ` FROM ${this.table}`
      sql += (this as any).getWhereClause()
      sql += ';'

      return sql
    }
  }
}
