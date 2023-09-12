import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import dataTableVue from '@/components/dataTable.vue'
import PercentWithIcon from '@/components/percentWithIcon.vue'

describe('DataTable.vue', () => {
  
  const tableData = {
    title: 'TEST TITLE',
    columns: [
      { key: 'category', title: '카테고리' },
      { key: 'views', title: '조회수', sortable: true},
      { key: 'revenue', title: '수익', sortable: true},
      { key: 'sales', title: '판매량', component: 'PercentWithIcon', sortable: true},
    ],
    rows: [
      {
        category: { image: '/image/character/astronaut_cat.jpeg', text: ['Lorem ipsum dolor sit amet', 'consectetur adipiscing elit']},
        views: { text: [935, 'lorem ipsum'] },
        revenue: { text: [345] },
        sales: { text: [-123] },
      },
      {
        category: { image: '/image/character/astronaut_cat.jpeg', text: ['Lorem ipsum dolor sit amet', 'consectetur adipiscing elit']},
        views: { text: [5600, 'lorem ipsum'] },
        revenue: { text: [345] },
        sales: { text: [-123] },
      }
    ]
  }
  const wrapper = mount(dataTableVue, {
    props: { data: tableData }
  })
  
  const rows = wrapper.findAll('tbody tr')
  const cells = rows[0].findAll('td')

  it('타이틀이 올바르게 표시되는지 확인', () => {
    expect(wrapper.find('h2').text()).toBe('TEST TITLE')
  })

  it('thead가 올바르게 표시되는지 확인', () => {
    const headers = wrapper.findAll('thead th')
    expect(headers.length).toBe(4)
    expect(headers[0].text()).toBe('카테고리')
    expect(headers[1].text()).toBe('조회수')
    expect(headers[2].text()).toBe('수익')
    expect(headers[3].text()).toBe('판매량')
  })

  it('tbody가 올바르게 표시되는지 확인', () => {
    expect(rows.length).toBe(2) // 2개의 로우 데이터가 있는 것을 확인
  })

  it ('이미지가 전달되면 이미지가 표시되는지 인', () => {
    const image = cells[0].find('figure img')
    expect(image.attributes('src')).toBe('/image/character/astronaut_cat.jpeg')
  })

  it ('텍스트가 전달된경우 0번째 index만 p로 출력하고 나머지는 small로 출력', () => {
    const texts = cells[0].findAll('p, small')
    expect(texts.length).toBe(2)
    expect(texts[0].text()).toBe('Lorem ipsum dolor sit amet')
    expect(texts[1].text()).toBe('consectetur adipiscing elit')
  })

  it ('이미지 없이 텍스트만 전달되면 div 내에 p와 small로 출력', () => {
    const div = cells[1].find('div')
    const texts = div.findAll('p, small')
    expect(texts.length).toBe(2)
    expect(texts[0].text()).toBe('935')
    expect(texts[1].text()).toBe('lorem ipsum')
  })

  it ('컴포넌트가 명시되어있으면 컴포넌트 출력확인', () => {
    const div = cells[3].find('div')
    const percentWithIconComponent = div.findComponent(PercentWithIcon)
    expect(percentWithIconComponent.exists()).toBe(true)
    expect(percentWithIconComponent.props('percent')).toBe(-123)

    // dataTable은 항상 toFixed의 값을 1로 설정한다
    expect(percentWithIconComponent.find('.component-percentage p').text()).toBe('123.0%')
  })

  it ('selectbox의 value를 변경시 정렬기능이 수행되는지 테스트', async () => {
    const beforeViews = wrapper.findAll('tbody tr td:nth-child(2)')
    expect(beforeViews[0].find('p').text()).toBe('935')
    expect(beforeViews[1].find('p').text()).toBe('5600')

    await wrapper.find('section select').setValue('views')

    const afterViews = wrapper.findAll('tbody tr td:nth-child(2)')
    expect(afterViews[0].find('p').text()).toBe('5600')
    expect(afterViews[1].find('p').text()).toBe('935')
  })

})