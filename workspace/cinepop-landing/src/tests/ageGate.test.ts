import { describe, it, expect, beforeEach } from 'vitest'
import { isAgeConfirmed, setAgeConfirmed } from '../lib/age-gate'

describe('age gate persistence', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('defaults to not confirmed', () => {
    expect(isAgeConfirmed()).toBe(false)
  })
  it('persists confirmation', () => {
    setAgeConfirmed(true)
    expect(isAgeConfirmed()).toBe(true)
  })
})

