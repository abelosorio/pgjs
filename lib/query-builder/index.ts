import QueryBuilder from './query-builder'

import WithToSql from './mixins/with-to-sql'

const Extended = WithToSql(QueryBuilder)

export default Extended
