import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SkeletonUi from '@/components/Common/Skeleton/SkeletonUi.vue'

describe('prop이 전달된경우 올바르게 style이 완성되는지 확인', () => {

  describe('props.width가 전달된 경우', () => {
    it('전달된경우', () => {
      const wrapper = shallowMount(SkeletonUi, {
        props: {
          width: '1rem'
        }
      })
      expect(wrapper.find('span').attributes().style).toContain('width: 1rem')
    })

    it('없다면 100%이다', () => {
      const wrapper = shallowMount(SkeletonUi)
      expect(wrapper.find('span').attributes().style).toContain('width: 100%')
    })
  })

  describe('props.height가 전달된 경우', () => {
    it('전달된경우', () => {
      const wrapper = shallowMount(SkeletonUi, {
        props: {
          height: '50%'
        }
      })
      expect(wrapper.find('span').attributes().style).toContain('height: 50%')
    })

    it('없다면 1rem이다', () => {
      const wrapper = shallowMount(SkeletonUi)
      expect(wrapper.find('span').attributes().style).toContain('height: 1rem')
    })
  })
  
  it('min-height는 전달된 값으로만 설정된다', () => {
    const wrapper = shallowMount(SkeletonUi, {
      props: {
        minHiehgt: '5rem'
      }
    })
    expect(wrapper.find('span').attributes().style).toContain('min-height: 5rem')
  })
  
  it('radius는 전달된 값으로만 설정된다', () => {
    const wrapper = shallowMount(SkeletonUi, {
      props: {
        radius: '4rem'
      }
    })
    expect(wrapper.find('span').attributes().style).toContain('border-radius: 4rem')
  })
})