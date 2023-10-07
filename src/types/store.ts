import { USER_FLOW, PAYMENT } from '@/constants/STORES'

// userFlow의 JoinSns 타입
interface JoinSns {
  naver: number
  kakao: number
  google: number
  facebook: number
  apple: number
}

type JoinType = 'email'|keyof JoinSns

// USER_FLOW를 타입으로 재정의하여 사용
type UserFlow = typeof USER_FLOW

// userflow의 비율을 구하는 inflowCalculator 타입
interface InflowCalculator {
  inflowRate: {
    newVisit: number
    returnVisit: number
  }
  joinRate: {
    base: number
    compare: number
  }
  snsEmailSum: number
  snsRate: {
    email: number
    naver: number
    kakao: number
    google: number
    facebook: number
    apple: number
  }
}

// PAYMENT를 타입으로 재정의하여 사용
type Payment = typeof PAYMENT

// PRODUCT 타입
interface Product {
  date: string
  products: Array<{
    name: string
    count: number
    price: number
  }>
}

// PURCHASE 타입
interface Purchase {
  data: Array<{
    purchasers: Array<{
      id: number
      payments: number
      revenue: number
      sales: number
    }>
    date: string
  }>
  filters: Array<{
    key: string
    title: string
    sortable?: boolean
    component?: string
  }>
}

export type {
  JoinSns,
  JoinType,
  UserFlow,
  InflowCalculator,
  Payment,
  Product,
  Purchase
}