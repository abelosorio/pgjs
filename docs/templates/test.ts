// @ts-nocheck
// TEMPLATE FILE - DO NOT COMPILE
// This is a template file for creating tests for SQL clauses.
// It contains example code that won't compile and should be ignored by linters.
// Copy this file and modify it for your specific clause tests.

// Template for testing a SQL clause
import { describe, it, expect } from '@jest/globals'
import { clauseName } from '../../lib/clauses/clause-name'
import { selectBuilder } from '../../lib/commands/select'

describe('clauseName', () => {
  // Test basic functionality
  it('should generate correct SQL for basic usage', () => {
    const subquery = selectBuilder().from('users')
    const query = clauseName('test')
      .method(subquery)
      .toSql()
    
    expect(query).toBe('CLAUSE test (SELECT * FROM users)')
  })
  
  // Test with options
  it('should handle options correctly', () => {
    const subquery = selectBuilder().from('users')
    const query = clauseName('test')
      .method(subquery, { option: true })
      .toSql()
    
    expect(query).toBe('CLAUSE test OPTION (SELECT * FROM users)')
  })
  
  // Test error cases
  it('should throw error for invalid input', () => {
    expect(() => {
      clauseName('')
    }).toThrow('Invalid parameter')
  })
  
  // Test edge cases
  it('should handle empty subquery', () => {
    const subquery = selectBuilder()
    const query = clauseName('test')
      .method(subquery)
      .toSql()
    
    expect(query).toBe('CLAUSE test (SELECT *)')
  })
}) 
