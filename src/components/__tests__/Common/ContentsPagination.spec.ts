import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ContentsPagination from '@/components/Common/ContentsPagination.vue'

interface ComponentVm {
  pageData: {
    currentPage: number
    startPage: number
    totalPages: number
    pages: Array<number>
  }
  changePage: (page: number) => void
}

describe('마운트시 전달된 props에 따라 pageData를 생성하는지 확인', () => {
  it ('currentPage는 전달된 값을 사용한다', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 100, currentPage: 1, pageSize: 10, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
    expect(vm.pageData.currentPage).toBe(1)
  })
  
  it ('startPage는 기본 1페이지다', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 100, currentPage: 1, pageSize: 10, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
    expect(vm.pageData.startPage).toBe(1)
  })
  
  it ('아이템이 100개이고 pageSize가 10이면 totalPages는 10이된다', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 100, currentPage: 1, pageSize: 10, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
    expect(vm.pageData.totalPages).toBe(10)
  })
  
  it ('아이템이 123개이고 pageSize가 10이면 totalPages는 올림값이므로 13이된다', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 123, currentPage: 1, pageSize: 10, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
    expect(vm.pageData.totalPages).toBe(13)
  })
  
  it ('totalItems: 123, currentPage: 1, pageSize: 10, maxPages: 5일때 pages는 [1,2,3,4,5]가 된다 ', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 123, currentPage: 1, pageSize: 10, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
    expect(vm.pageData.pages).toEqual([1, 2, 3, 4, 5])
  })
})

describe('currentPage는 항상 중심 또는 좌측에 오도록 pages를 생성하고 totalPage에 가까워질 때만 우측에 오도록 한다', () => {
  it ('maxPages: 5 currentPage: 1', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 200, currentPage: 1, pageSize: 10, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
  
    expect(vm.pageData.pages).toEqual([1, 2, 3, 4, 5])
  })
  
  it ('maxPages: 5 currentPage: 4', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 200, currentPage: 4, pageSize: 10, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
  
    wrapper.setProps({ currentPage: 4 })
    expect(vm.pageData.pages).toEqual([2, 3, 4, 5, 6])
  })

  it ('maxPages: 10 currentPage: 1', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 200, currentPage: 4, pageSize: 10, maxPages: 10,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
  
    wrapper.setProps({ currentPage: 4 })
    expect(vm.pageData.pages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it ('maxPages: 10 currentPage: 7', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 200, currentPage: 7, pageSize: 10, maxPages: 10,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
  
    wrapper.setProps({ currentPage: 4 })
    expect(vm.pageData.pages).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  })
  
  it ('maxPages: 10 currentPage: 20', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 200, currentPage: 20, pageSize: 10, maxPages: 10,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
  
    wrapper.setProps({ currentPage: 4 })
    expect(vm.pageData.pages).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
  })
  
  it ('maxPages: 5 currentPage: 20', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 200, currentPage: 20, pageSize: 10, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm
  
    wrapper.setProps({ currentPage: 4 })
    expect(vm.pageData.pages).toEqual([16, 17, 18, 19, 20])
  })
})

describe('pages 배열의 값이 최소 혹은 최대를 포함한다면 changePage 아이콘을 숨긴다', () => {
  it ('최소 페이지에 가까우면 첫번째 li(changePage 화살표) element를 숨긴다', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 30, currentPage: 1, pageSize: 5, maxPages: 5,}
    })
    expect(wrapper.findAll('.contents-pagination li')[0].attributes().style).toContain('display: none;')
  })

  it ('최대 페이지에 가까우면 마지막 li(changePage 화살표) element를 숨긴다', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 30, currentPage: 6, pageSize: 5, maxPages: 5,}
    })
    expect(wrapper.findAll('.contents-pagination li')[6].attributes().style).toContain('display: none;')
  })
})

describe('changePage 클릭시 부모 컴포넌트에 emit 이벤트를 전달한다', () => {
  it('버튼 클릭시 emit이 올바르게 동작하는지 확인', () => {
    const wrapper = shallowMount(ContentsPagination, {
      props: { totalItems: 30, currentPage: 1, pageSize: 5, maxPages: 5,}
    })
    const vm = wrapper.vm as unknown as ComponentVm

    vm.changePage(2)
    expect(wrapper.emitted().paging[0]).toContain(2)
  })
})