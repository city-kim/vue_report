import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import percentWithIcon from '@/components/percentWithIcon.vue'
import iconVue from '@/components/svgIcon.vue'

describe('percentWithIcon', () => {

  it('퍼센트가 양수일 경우', async () => {
    const wrapper = mount(percentWithIcon, {
      props: {
        base: 100,
        compare: 150,
      }
    })

    expect(wrapper.classes()).toContain('up') // up 클래스가 있는지 확인
    const icon = wrapper.getComponent(iconVue)
    expect(icon.props('name')).toBe('caret_up_fill') // up 아이콘인지 확인
    expect(wrapper.text()).toContain('50') // 150은 100보다 50%가 더 큼
  })

  it('퍼센트가 음수일 경우', async () => {
    const wrapper = mount(percentWithIcon, {
      props: {
        base: 100,
        compare: 50,
      }
    })

    expect(wrapper.classes()).toContain('down') // down 클래스가 있는지 확인
    const icon = wrapper.getComponent(iconVue)
    expect(icon.props('name')).toBe('caret_down_fill') // down 아이콘인지 확인
    expect(wrapper.text()).toContain('50') // 50은 100보다 50%가 더 작음
  })

  it('퍼센트가 소수점이 있는경우 소수점이 표시되는지 확인', async () => {
    const wrapper = mount(percentWithIcon, {
      props: {
        percent: 25.123
      }
    })
    expect(wrapper.text()).toContain('25.12') // 소수점일경우 기본값인 fixed(2)로 표시
  })
  
  it('toFixed가 전달되면 해당 값 만큼만 표시하는지 확인', async () => {
    const wrapper = mount(percentWithIcon, {
      props: {
        percent: 33.3333333,
        toFixed: 1,
      }
    })
    expect(wrapper.text()).toContain('33.3') // 전달된 toFixed값 만큼만 표시
  })

})