import QueryBuilder from './queryBuilder/query-builder'

import WithToSql from './mixins/with-to-sql'
import WithWhere from './mixins/with-where'

const Extended = WithToSql(WithWhere(QueryBuilder))

export default Extended
