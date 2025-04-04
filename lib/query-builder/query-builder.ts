export default class QueryBuilder {
  fields: string[] = []
  table: string = ''

  select (...fields: string[]): this {
    this.fields = fields

    return this
  }

  from (table: string): this {
    this.table = table

    return this
  }
}
