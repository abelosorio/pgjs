import toSql from './instance-methods/to-sql.js'

class QueryBuilder {
  constructor () {
    this.fields = []
    this.table = ''
  }

  fieldsToString () {
    if (this.fields.length === 0) return '*'

    return this.fields.join(', ')
  }

  select (...fields) {
    this.fields = fields

    return this
  }

  from (table) {
    this.table = table

    return this
  }
}

QueryBuilder.prototype.toSql = toSql

export default QueryBuilder
