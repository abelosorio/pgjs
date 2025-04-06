import type QueryBuilder from '../queryBuilder/query-builder'
import type { Constructor } from './types'

export default function WithWhere<TBase extends Constructor<QueryBuilder>>(Base: TBase) {
  return class extends Base {
    private _whereClause: string | null = null
    private _params: any[] = []

    where(condition: string, ...params: any[]): this {
      this._whereClause = condition
      this._params = params

      return this
    }

    getWhereClause(): string {
      return this._whereClause ? ` WHERE ${this._whereClause}` : ''
    }

    getParams(): any[] {
      return this._params
    }
  }
}
