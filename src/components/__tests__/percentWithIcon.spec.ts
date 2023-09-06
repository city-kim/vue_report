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

})