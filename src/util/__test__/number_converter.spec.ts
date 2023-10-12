import { describe, it, expect } from 'vitest'
import { getPercent, getRate, decreaseByPercent, numberExpression} from '@/util/number_converter'

describe('getPercent', () => {

  it('from이 높은경우 감소된 수치를 반환', () => {
    expect(getPercent(100, 200)).toBe(-50) // 100에서 200으로 50% 감소
  })

  it('from이 낮을경우 증가된 수치를 반환', () => {
    expect(getPercent(200, 100)).toBe(100) // 200에서 100으로 100% 증가
  })
  
})

describe('getRate', () => {

  it('대상이 되는 값과 총합이 있을경우 비율을 반환한다', () => {
    expect(getRate(25, 100)).toBe(25) // 대상이 25이고 총 100일경우 25% 차지
    expect(getRate(10, 50)).toBe(20) // 대상이 10이고 총 50일 경우 20% 차지
    expect(getRate(50, 10)).toBe(500) // 대상이 50이고 총 10일 경우 500% 차지
  })
})

describe('decreaseByPercent', () => {

  it('대상이 되는 값과 감소할 퍼센트가 있을경우 감소된 값을 반환한다', () => {
    expect(decreaseByPercent(100, 50)).toBe(50) // 100에서 50% 감소할 경우 50
    expect(decreaseByPercent(50, 10)).toBe(45) // 50에서 10% 감소할 경우 45
    expect(decreaseByPercent(10, 50)).toBe(5) // 10에서 50% 감소할 경우 5
  })
})

describe('numberExpression', () => {
  it ('NaN이 전달되면 0을 반환한다', () => {
    expect(numberExpression(NaN)).toBe(0)
  })
  
  it ('전달되는 숫자가 999 이상인경우 콤마를 찍어서 반환한다', () => {
    expect(numberExpression(1000.000)).toBe('1,000') // 1000은 콤마를 찍어서 반환
    expect(numberExpression(100000000)).toBe('100,000,000') // 3자리마다 콤마를 찍어서 반환
  })

  it ('전달되는 숫자가 100 이하인경우 소수점 1자리까지 반환한다', () => {
    expect(numberExpression(10.123, 1)).toBe('10.1')
    expect(numberExpression(99.99999, 2)).toBe('100.00')
    expect(numberExpression(1.111111111, 3)).toBe('1.111')
  })

  it ('그 외는 내림된 숫자를 반환한다', () => {
    expect(numberExpression(100)).toBe('100')
    expect(numberExpression(12.333)).toBe('12')
    expect(numberExpression(999.999999)).toBe('999')
  })
})