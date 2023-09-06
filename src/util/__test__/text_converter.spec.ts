import { describe, it, expect } from 'vitest'
import { hexToRGBA } from '@/util/text_converter'

describe('hexToRGBA', () => {
  it ('hexcode를 rgba로 변환한다', () => {
    expect(hexToRGBA('#000000')).toBe('rgba(0, 0, 0, 1)')
    expect(hexToRGBA('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)')
  })

  it ('투명도가 0이라면 0을 1이라면 1을 반환한다', () => {
    expect(hexToRGBA('#000000', 1)).toBe('rgba(0, 0, 0, 1)')
    expect(hexToRGBA('#000000', 0)).toBe('rgba(0, 0, 0, 0)')
  })
})