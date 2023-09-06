import { describe, it, expect } from 'vitest'
import { getPercent, getRate } from '@/util/number_converter'

describe('getPercent', () => {
  it('argument가 누락된 경우 0을 반환한다', () => {
    expect(getPercent(100)).toBe(0)
    expect(getPercent(undefined, 50)).toBe(0)
    expect(getPercent()).toBe(0)
  })

  it('from이 높은경우 감소된 수치를 반환', () => {
    expect(getPercent(100, 200)).toBe(-50) // 100에서 200으로 50% 감소
  })

  it('from이 낮을경우 증가된 수치를 반환', () => {
    expect(getPercent(200, 100)).toBe(100) // 200에서 100으로 100% 증가
  })
})

describe('getRate', () => {
  it('argument가 누락된 경우 0을 반환한다', () => {
    expect(getRate(50)).toBe(0)
    expect(getRate(undefined, 100)).toBe(0)
    expect(getRate()).toBe(0)
  })

  it('대상이 되는 값과 총합이 있을경우 비율을 반환한다', () => {
    expect(getRate(25, 100)).toBe(25) // 대상이 25이고 총 100일경우 25% 차지
    expect(getRate(10, 50)).toBe(20) // 대상이 10이고 총 50일 경우 20% 차지
    expect(getRate(50, 10)).toBe(500) // 대상이 50이고 총 10일 경우 500% 차지
  })
})
