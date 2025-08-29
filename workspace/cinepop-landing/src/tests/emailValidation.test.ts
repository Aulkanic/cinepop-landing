import { describe, it, expect } from 'vitest'
import { isValidEmail } from '../components/EmailCapture'

describe('email validation', () => {
  it('accepts typical email', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
  })
  it('rejects invalid email', () => {
    expect(isValidEmail('not-an-email')).toBe(false)
  })
})

