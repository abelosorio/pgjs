export type Options = {
  isSubQuery?: boolean
}

export default function toSql(sql: string, options?: Options): string {
  // Don't add semicolon if:
  // 1. It's a subquery
  // 2. The query already ends with a semicolon
  const shouldAddSemicolon =
    !options?.isSubQuery &&
    !sql.trimEnd().endsWith(';')

  return sql + (shouldAddSemicolon ? ';' : '')
}
