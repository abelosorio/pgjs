import { ResolverInput } from '../../types/resolver-input'

export interface WhereClause {
  toSql: () => string
  getParams: () => any[] | undefined
}

export type WhereResolver = (
  condition: string,
  params?: any[]
) => WhereClause

export default function where({ sql }: ResolverInput): WhereResolver {
  return function (condition, params) {
    return {
      toSql: () => sql + ` WHERE ${condition};`,
      getParams: () => params
    }
  }
}
