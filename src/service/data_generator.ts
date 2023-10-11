import { DateTime, Interval } from 'luxon'
import type { DateParameter } from '@/types/store'

/**
 * 전달받은 날짜를 기준으로 날짜 배열을 만든다
 * @param param beforeDate{from, to}, afterDate{from, to}
 * @returns [{date: yyyy-LL-dd}]
 */
function setDates ({beforeDate, afterDate}: DateParameter) {
  function getInterval ({from, to}: {from: DateTime, to: DateTime}) {
    return Interval.fromDateTimes(from.startOf('day'), to.endOf('day')).splitBy({ day: 1 }).map(d => d.start?.toFormat('yyyy-LL-dd')) as Array<string>
  }
  const before = getInterval({...beforeDate})
  const after = getInterval({...afterDate})
  return [...new Set([...before, ...after])].map(x => ({date: x}))
}

/**
 * 일자별 데이터를 만들어준다
 * @param param beforeDate{from, to}, afterDate{from, to}
 * @returns date: 날짜 (yyyy-LL-dd), new_visit: 신규방문, return_visit: 재방문, login: 로그인, join: 가입자, withdraw: 탈퇴자, dormant: 휴면, return: 복귀
 */
const userFlowByDate = ({beforeDate, afterDate}: DateParameter) => (setDates({beforeDate, afterDate}).map((x) => ({
  ...x,
  new_visit: Math.floor(Math.random() * 1000), // 신규방문
  return_visit: Math.floor(Math.random() * 1000), // 재방문
  total_visit: 0,
  login: Math.floor(Math.random() * 1000), // 로그인
  join: Math.floor(Math.random() * 30), // 가입자
  join_sns: { // sns 가입자
    naver: Math.floor(Math.random() * 3),
    kakao: Math.floor(Math.random() * 2),
    google: Math.floor(Math.random() * 5),
    facebook: Math.floor(Math.random() * 2),
    apple: Math.floor(Math.random() * 2),
  },
  withdraw: Math.floor(Math.random() * 25), // 탈퇴자
  dormant: Math.floor(Math.random() * 10), // 휴면
  return: Math.floor(Math.random() * 100), // 복귀
})))

/**
 * 결제/환불 데이터를 만들어준다
 * @param param beforeDate{from, to}, afterDate{from, to}
 * @returns date: 날짜 (yyyy-LL-dd), payer: 결제자, refunder: 환불자, payment_amount: 결제액, refund_amount: 환불액
 */
const paymentByDate = ({beforeDate, afterDate}: DateParameter) => (setDates({beforeDate, afterDate}).map((x) => ({
  ...x,
  payer: Math.floor(Math.random() * 100), // 결제자
  refunder: Math.floor(Math.random() * 25), // 환불자
  payment_amount: Math.floor(Math.random() * 10000) * 1000, // 결제액
  refund_amount: Math.floor(Math.random() * 10000) * 100, // 환불액
})))

/**
 * 제품 데이터를 만든다
 * @param param beforeDate{from, to}, afterDate{from, to}
 * @returns date: 날짜 (yyyy-LL-dd), products: [{name: 상품명, count: 판매수량, price: 판매금액}]
 */
const productByDate = ({beforeDate, afterDate}: DateParameter) => (setDates({beforeDate, afterDate}).map((x) => ({
  ...x,
  products: [
    { name: 'product1', count: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 10000) * 1000 },
    { name: 'product2', count: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 10000) * 1000 },
    { name: 'product3', count: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 10000) * 1000 },
    { name: 'product4', count: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 10000) * 1000 },
  ]
})))

/**
 * 구매자 데이터를 만든다
 * @param param beforeDate{from, to}, afterDate{from, to}
 * @returns date: 날짜 (yyyy-LL-dd), purchasers: [{id: 구매자id, payments: 결제횟수, revenue: 결제금액, sales: 증감률}]
 */
const purchaseByDate = ({beforeDate, afterDate}: DateParameter) => {
  const result = setDates({beforeDate, afterDate}).map((x) => ({
    ...x,
    purchasers: Array.from(Array(Math.floor(Math.random() * 20) + 1), (_, i) => ({
      id: i + 1,
      payments: Math.floor(Math.random()*1000),
      revenue: Math.floor(Math.random()*1000),
      sales: 0,
    })),
  }))
  return {
    data: result,
    filters: [
      { key: 'category', title: '업체명' },
      { key: 'payments', title: '결제횟수', sortable: true },
      { key: 'revenue', title: '결제금액', sortable: true },
      { key: 'sales', title: '증감률', sortable: true, component: 'PercentWithIcon' },
    ],
  }
}

export {
  setDates,
  userFlowByDate,
  paymentByDate,
  productByDate,
  purchaseByDate
}