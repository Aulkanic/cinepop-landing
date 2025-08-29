import { describe, it, expect, vi } from 'vitest'
import { computeRemaining } from '../components/CountdownTimer'

describe('computeRemaining', () => {
  it('computes correct parts for 1d 1h 1m 1s', () => {
    const now = Date.now()
    vi.setSystemTime(new Date(now))
    const target = now + (24*3600 + 3600 + 60 + 1) * 1000
    const res = computeRemaining(target)
    expect(res).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 })
  })
})

