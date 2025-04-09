// @ts-nocheck
// TEMPLATE FILE - DO NOT COMPILE
// This is a template file for creating new SQL clauses.
// It contains example code that won't compile and should be ignored by linters.
// Copy this file and modify it for your specific clause implementation.

// Template for a SQL clause (e.g., WITH, WHERE, FROM, etc.)
import { SqlExecutable } from '../../lib/types/subquery'
import { Options, default as toSql } from '../../lib/utils/to-sql'

// 1. Types
export type ClauseOptions = {
  // Add clause-specific options here
}

export type Clause = {
  // Add clause-specific properties here
  toSql: (options?: Options) => string
}

// 2. Builder function
export function clauseName (param: string) {
  return {
    // Add builder methods here that return the clause
    method: (subquery: SqlExecutable, options?: ClauseOptions): Clause => {
      return {
        // Add clause implementation here
        toSql: (options?: Options) => {
          const sql = `CLAUSE ${param}`
          return toSql(sql, options)
        }
      }
    }
  }
}

// 3. Usage example:
/*
const query = clauseName('param')
  .method(subquery, { option: true })
  .toSql()
*/ 
