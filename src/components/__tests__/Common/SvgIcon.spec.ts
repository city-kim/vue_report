import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { iconList } from '@/constants/iconList'

import SvgIcon from '@/components/Common/SvgIcon.vue'

const singleRow = Object.entries(iconList).find(([, value]) => value.length === 1)
const multyRow = Object.entries(iconList).find(([, value]) => value.length > 1)

describe('SvgIcon는 constants의 iconList가 정의된 경우에만 테스트한다', () => {

  if (singleRow) {
    it('아이콘이 한개의 배열을 가진경우', async () => {
      const iconName = singleRow[0] as keyof typeof iconList
      const wrapper = mount(SvgIcon, {
        props: {
          name: iconName,
          width: '1rem',
          height: '1rem',
        }
      })
  
      const paths = wrapper.findAll('path')
      expect(paths.length).toBe(1)
      expect(paths[0].attributes('d')).toBe(singleRow[1][0])
    })
  }

  if (multyRow) {
    it('아이콘이 n개의 배열을 가진경우', async () => {
      const iconName = multyRow[0] as keyof typeof iconList
      const wrapper = mount(SvgIcon, {
        props: {
          name: iconName,
          width: '1rem',
          height: '1rem',
        }
      })
      const paths = wrapper.findAll('path')
      expect(paths.length).toBe(multyRow[1].length)
      for (let i=0; i<paths.length; i++) {
        expect(paths[i].attributes('d')).toBe(multyRow[1][i])
      }
    })
  }

  if (singleRow || multyRow) {
    // 둘중 하나가 있는경우
    it('넓이 속성이 있을경우 해당값을 사용한다', async () => {
      const row = singleRow || multyRow
      const width = '5rem'
      const wrapper = mount(SvgIcon, {
        props: {
          name: (row?.[0]) as keyof typeof iconList,
          width: width,
          height: '1rem',
        }
      })
  
      const svgElement = wrapper.find('svg')
      expect(svgElement.attributes('width')).toBe(width)
    })

    it('넓이 속성이 있을경우 해당값을 사용한다', async () => {
      const row = singleRow || multyRow
      const height = '5rem'
      const wrapper = mount(SvgIcon, {
        props: {
          name: (row?.[0]) as keyof typeof iconList,
          width: '1rem',
          height: height,
        }
      })
  
      const svgElement = wrapper.find('svg')
      expect(svgElement.attributes('height')).toBe(height)
    })
  }

})
