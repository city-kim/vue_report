import { describe, it, expect } from 'vitest'
import { setDate, userFlowByDate, paymentByDate, productByDate, purchaseByDate } from '@/service/data_generator'
import { DateTime } from 'luxon'

const now = DateTime.now()

describe('data_generator setDate', () => {
  it('더미데이터는 현재날짜 기준으로 730개(2년전)까지 생성된다', () => {
    expect(setDate).toHaveLength(730)
  })
  
  it('각각 날짜에 맞게 생성된다', () => {
    expect(setDate.at(0)?.date).toBe(now.toFormat('yyyy-LL-dd'))
    expect(setDate.at(-1)?.date).toBe(now.minus({days: 729}).toFormat('yyyy-LL-dd'))
  })
})

describe('data_generator userFlowByDate', () => {
  const userFlow = userFlowByDate()
  
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
  const payment = paymentByDate()
  
  it('필요한 각 항목이 모두 생성되는지 확인', () => {
    const first = payment[0]
    
    expect(first).toHaveProperty('payer')
    expect(first).toHaveProperty('refunder')
    expect(first).toHaveProperty('payment_amount')
    expect(first).toHaveProperty('refund_amount')
  })
})

describe('data_generator productByDate', () => {
  const product = productByDate()
  
  it('필요한 각 항목이 모두 생성되는지 확인', () => {
    const first = product[0]

    expect(first).toHaveProperty(['products', 0, 'name'])
    expect(first).toHaveProperty(['products', 0, 'count'])
    expect(first).toHaveProperty(['products', 0, 'price'])
  })
})

describe('data_generator purchaseByDate', () => {
  const purchase = purchaseByDate()
  
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