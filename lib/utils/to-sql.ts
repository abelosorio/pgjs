export type Options = {
  isSubQuery?: boolean
}

export default function toSql (sql: string, options?: Options): string {
  return sql + (!options?.isSubQuery ? ';' : '')
}
