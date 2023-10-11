import { describe, it, expect } from 'vitest'
import { setDates, userFlowByDate, paymentByDate, productByDate, purchaseByDate } from '@/service/data_generator'
import { DateTime } from 'luxon'

const now = DateTime.now()
const date = {
  beforeDate: { from: now.minus({day: 13}), to: now.minus({day: 7}) },
  afterDate: { from: now.minus({day: 6}), to: now }
}

describe('data_generator setDates', () => {
  it('중복된 날짜가 있다면 제거된다', () => {
    const setDate = setDates({
      beforeDate: { from: now.minus({day: 10}), to: now.minus({day: 5}) },
      afterDate: { from: now.minus({day: 5}), to: now }
    })
    expect(setDate).toHaveLength(11)
  })

  it('중복된 날짜가 없다면 전달된 날짜 기준으로 데이터가 생성된다', () => {
    const setDate = setDates(date)
    expect(setDate).toHaveLength(14)
  })
  
  it('각각 날짜에 맞게 생성된다', () => {
    const setDate = setDates(date)
    expect(setDate.at(-1)?.date).toBe(now.toFormat('yyyy-LL-dd'))
    expect(setDate.at(0)?.date).toBe(now.minus({days: 13}).toFormat('yyyy-LL-dd'))
  })
})

describe('data_generator userFlowByDate', () => {
  const userFlow = userFlowByDate(date)
  
  it('필요한 각 항목이 모두 생성되는지 확인', () => {
    const first = userFlow[0]

    expect(first).toHaveProperty('new_visit')
    expect(first).toHaveProperty('return_visit')
    expect(first).toHaveProperty('login')
    expect(first).toHaveProperty('join')
    expect(first).toHaveProperty('withdraw')
    expect(first).toHaveProperty('dormant')
    expect(first).toHaveProperty('return')

    expect(first).toHaveProperty(['join_sns', 'naver'])
    expect(first).toHaveProperty(['join_sns', 'kakao'])
    expect(first).toHaveProperty(['join_sns', 'google'])
    expect(first).toHaveProperty(['join_sns', 'facebook'])
    expect(first).toHaveProperty(['join_sns', 'apple'])
  })
})

describe('data_generator paymentByDate', () => {
  const payment = paymentByDate(date)
  
  it('필요한 각 항목이 모두 생성되는지 확인', () => {
    const first = payment[0]
    
    expect(first).toHaveProperty('payer')
    expect(first).toHaveProperty('refunder')
    expect(first).toHaveProperty('payment_amount')
    expect(first).toHaveProperty('refund_amount')
  })
})

describe('data_generator productByDate', () => {
  const product = productByDate(date)
  
  it('필요한 각 항목이 모두 생성되는지 확인', () => {
    const first = product[0]

    expect(first).toHaveProperty(['products', 0, 'name'])
    expect(first).toHaveProperty(['products', 0, 'count'])
    expect(first).toHaveProperty(['products', 0, 'price'])
  })
})

describe('data_generator purchaseByDate', () => {
  const purchase = purchaseByDate(date)
  
  it('필요한 각 항목이 모두 생성되는지 확인', () => {
    const first = purchase.data[0]

    expect(first).toHaveProperty(['purchasers', 0, 'id'])
    expect(first).toHaveProperty(['purchasers', 0, 'payments'])
    expect(first).toHaveProperty(['purchasers', 0, 'revenue'])
    expect(first).toHaveProperty(['purchasers', 0, 'sales'])

    expect(purchase.filters).toHaveProperty([0, 'key'])
    expect(purchase.filters).toHaveProperty([0, 'title'])
    expect(purchase.filters.find(x => x.sortable)).not.toBe(undefined)
    expect(purchase.filters.find(x => x.component)).not.toBe(undefined)
  })
})