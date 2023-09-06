import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getCssVar } from '@/util/color' // './yourFileName'을 실제 파일 경로로 바꿔주세요.

describe('getCssVar', () => {
  
  // DOM에 임시 CSS 변수 추가
  beforeEach(() => {
    document.documentElement.style.setProperty('--test-color', '#123456')
  })

  it('CSS 변수를 이름으로 검색해야 합니다', () => {
    expect(getCssVar('test-color')).toBe('#123456')
  })

  it('"--" 접두사가 누락된 경우에도 CSS 변수를 검색해야 함', () => {
    expect(getCssVar('--test-color')).toBe('#123456')
  })

  it('존재하지 않는 CSS 변수에 대해 빈 문자열을 반환해야 함', () => {
    expect(getCssVar('non-existent-var')).toBe('')
  })

  // 임시 CSS 변수 제거
  afterEach(() => {
    document.documentElement.style.removeProperty('--test-color')
  })
})