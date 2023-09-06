import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import titleWithSubtitle from '@/components/titleWithSubtitle.vue'

describe('titleWithSubtitle', () => {

  it('제목과 부제목이 전달된경우', async () => {
    const title = '테스트 제목'
    const subtitle = '테스트 부제목'
    const wrapper = mount(titleWithSubtitle, {
      props: {
        title: title,
        subtitle: subtitle,
      }
    })
    expect(wrapper.find('h3').text()).toBe(subtitle)
    expect(wrapper.find('h2').text()).toBe(title)
  })

})