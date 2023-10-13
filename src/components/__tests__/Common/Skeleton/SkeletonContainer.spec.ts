import { describe, it, expect } from 'vitest'
import { shallowMount, mount } from '@vue/test-utils'
import SkeletonContainer from '@/components/Common/Skeleton/SkeletonContainer.vue'

describe('props.isLoading이 true일 경우 props.target에 맞게 출력되는지 확인', () => {
  it('chart', () => {
    const wrapper = mount(SkeletonContainer, {
      props: {
        target: 'chart',
        isLoading: true
      }
    })
    expect(wrapper.find('.skeleton-chart').exists()).toBe(true)
  })
  
  it('contents', () => {
    const wrapper = mount(SkeletonContainer, {
      props: {
        target: 'contents',
        isLoading: true
      }
    })
    expect(wrapper.find('.skeleton-contents').exists()).toBe(true)
  })
})

it('props.isLoading이 false일 경우 로딩이 없어지는지 확인', () => {
  const wrapper = shallowMount(SkeletonContainer, {
    props: {
      target: 'chart',
      isLoading: false
    }
  })
  expect(wrapper.find('.skeleton-chart').exists()).toBe(false)
})

it('props.isError가 true일 경우 에러를 출력하는지 확인', () => {
  const wrapper = shallowMount(SkeletonContainer, {
    props: {
      target: 'chart',
      isError: true
    }
  })
  expect(wrapper.find('.skeleton-container-error').exists()).toBe(true)
})