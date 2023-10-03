import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { DateTime } from 'luxon'

import { dateStore } from '@/stores/date'
import { productStore } from '@/stores/product'

const productData = [
  {
    date: '2023-08-04',
    products: [
      { name: 'pr1oduct', count: 10, price: 10000 },
      { name: 'prod2uct', count: 20, price: 20000 },
      { name: 'produc3t', count: 30, price: 30000 },
      { name: 'product4', count: 40, price: 40000 },
  ]},
  {
    date: '2023-08-03',
    products: [
      { name: 'pr1oduct', count: 20, price: 20000 },
      { name: 'prod2uct', count: 30, price: 30000 },
      { name: 'produc3t', count: 40, price: 40000 },
      { name: 'product4', count: 50, price: 50000 },
  ]},
  {
    date: '2023-08-02',
    products: [
      { name: 'pr1oduct', count: 30, price: 30000 },
      { name: 'prod2uct', count: 40, price: 40000 },
      { name: 'produc3t', count: 50, price: 50000 },
      { name: 'product4', count: 60, price: 60000 },
  ]},
  {
    date: '2023-08-01',
    products: [
      { name: 'pr1oduct', count: 40, price: 40000 },
      { name: 'prod2uct', count: 50, price: 50000 },
      { name: 'produc3t', count: 60, price: 60000 },
      { name: 'product4', count: 70, price: 70000 },
  ]},
]

const purchaseData = {
  data: [
    {
      date: '2023-08-04',
      purchasers: [
        { id: 1, payments: 1, revenue: 1000, sales: 2 },
      ]
    },
    {
      date: '2023-08-03',
      purchasers: [
        { id: 1, payments: 2, revenue: 2000, sales: 3 },
        { id: 2, payments: 3, revenue: 3000, sales: 4 },
      ]
    },
    {
      date: '2023-08-02',
      purchasers: [
        { id: 1, payments: 4, revenue: 4000, sales: 5 },
        { id: 2, payments: 5, revenue: 5000, sales: 6 },
        { id: 3, payments: 6, revenue: 6000, sales: 7 },
      ]
    },
    {
      date: '2023-08-01',
      purchasers: [
        { id: 1, payments: 7, revenue: 7000, sales: 8 },
        { id: 2, payments: 8, revenue: 8000, sales: 9 },
        { id: 3, payments: 9, revenue: 9000, sales: 10 },
        { id: 4, payments: 10, revenue: 10000, sales: 11 },
      ]
    },
  ],
  filters: [
    { key: 'category', title: '업체명' },
    { key: 'products', title: '결제횟수', sortable: true },
    { key: 'revenue', title: '결제금액', sortable: true },
    { key: 'sales', title: '증감률', sortable: true, component: 'PercentWithIcon' },
  ]
}

function setData () {
  // store의 기본 데이터 세팅용
  setActivePinia(createPinia())
  const date = dateStore()
  date.changeDate({type: 'before' as 'before'|'after', from: DateTime.fromISO('2023-08-01'), to: DateTime.fromISO('2023-08-02')})
  date.changeDate({type: 'after' as 'before'|'after', from: DateTime.fromISO('2023-08-03'), to: DateTime.fromISO('2023-08-04')})
  const product = productStore()
  product.updateProductData(productData)
  product.updatePurchaseData(purchaseData)
  return {
    product
  }
}

describe('product.baseCount, product.compareCount는 선택된 날짜에 반환한다', () => {
  const store = setData()
  it('product.baseCount는 각각 array와 sum을 반환한다', () => {
    expect(store.product.baseCount.array).toEqual(productData.slice(0, 2))
    expect(store.product.baseCount.sum).toEqual({
      products: [
        { name: 'pr1oduct', count: 30, price: 30000 },
        { name: 'prod2uct', count: 50, price: 50000 },
        { name: 'produc3t', count: 70, price: 70000 },
        { name: 'product4', count: 90, price: 90000 },
      ]
    })
  })

  it('product.compareCount는 각각 array와 sum을 반환한다', () => {
    expect(store.product.compareCount.array).toEqual(productData.slice(2))
    expect(store.product.compareCount.sum).toEqual({
      products: [
        { name: 'pr1oduct', count: 70, price: 70000 },
        { name: 'prod2uct', count: 90, price: 90000 },
        { name: 'produc3t', count: 110, price: 110000 },
        { name: 'product4', count: 130, price: 130000 },
      ]
    })
  })
})

describe('product.salesChartData로 판매량 데이터를 생성한다', () => {
  const store = setData()
  it('product.salesChartData는 product.baseCount의 products값으로 labels와 data로 데이터를 만들어준다', () => {
    expect(store.product.salesChartData.labels).toEqual(['2023-08-04', '2023-08-03'])
    expect(store.product.salesChartData.data).toEqual([
      { label: 'pr1oduct', data: [10, 20] },
      { label: 'prod2uct', data: [20, 30] },
      { label: 'produc3t', data: [30, 40] },
      { label: 'product4', data: [40, 50] },
    ])
  })
})

describe('product.tableData로 테이블 데이터를 생성한다', () => {
  const store = setData()
  console.log(store.product.tableData)
  it('product.tableData의 columns는 purchaseData.filters 데이터로 설정한다', () => {
    expect(store.product.tableData.columns).toEqual(purchaseData.filters)
  })

  it ('product.tableData의 row는 category는 유저에서 가져오고, payments, revenue는 합산, sales는 compare와 비교하여 출력한다', () => {
    expect(store.product.tableData.rows).toEqual(
      [
        {
          category: {
            image: '/image/character/astronaut_cat.jpeg',
            text: [ 'Lorem', 'lacinia', ],
          },
          payments: { text: [ 3 ] },
          revenue: { text: [ 3000 ] },
          sales: { text: [ -73 ] },
        },
        {
          category: {
            image: '/image/character/astronaut_fox.jpeg',
            text: [ 'ipsum', 'nec' ],
          },
          payments: { text: [ 3 ] },
          revenue: { text: [ 3000 ] },
          sales: { text: [ -77 ] },
        },
      ]
    )
  })
})

describe('product.tableSortTaget은 테이블의 정렬대상을 설정한다', () => {
  const store = setData()
  it ('product.tableSortTarget은 filters의 sortable이 true인 경우를 출력한다', () => {
    expect(store.product.tableSortTarget).toEqual([
      { key: 'products', title: '결제횟수', sortable: true },
      { key: 'revenue', title: '결제금액', sortable: true },
      { key: 'sales', title: '증감률', sortable: true, component: 'PercentWithIcon' },
    ])
  })
})

describe('product.categoryChart로 종류별 비율 데이터를 생성한다', () => {
  const store = setData()
  it('product.categoryChart는 product.baseCount의 products의 name과 price로 데이터를 만들어준다', () => {
    expect(store.product.categoryChart.labels).toEqual(['pr1oduct', 'prod2uct', 'produc3t', 'product4'])
    expect(store.product.categoryChart.dataset[0].data).toEqual([30000, 50000, 70000, 90000])
  })
})
