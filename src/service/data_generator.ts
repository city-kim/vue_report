import { DateTime } from 'luxon'

const setDate = Array.from(Array(730), (_,i) => ({date: DateTime.now().minus({days: i}).toFormat('yyyy-LL-dd')}))

/**
 * 일자별 데이터를 만들어준다
 * date: 날짜 (yyyy-LL-dd), new_visit: 신규방문, return_visit: 재방문, login: 로그인, join: 가입자, withdraw: 탈퇴자, dormant: 휴면, return: 복귀
 */
const userFlowByDate = () => (setDate.map((x) => ({
  ...x,
  new_visit: Math.floor(Math.random() * 1000), // 신규방문
  return_visit: Math.floor(Math.random() * 1000), // 재방문
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
 * date: 날짜 (yyyy-LL-dd), payer: 결제자, refunder: 환불자, payment_amount: 결제액, refund_amount: 환불액
 */
const paymentByDate = () => (setDate.map((x) => ({
  ...x,
  payer: Math.floor(Math.random() * 100), // 결제자
  refunder: Math.floor(Math.random() * 25), // 환불자
  payment_amount: Math.floor(Math.random() * 10000) * 1000, // 결제액
  refund_amount: Math.floor(Math.random() * 10000) * 100, // 환불액
})))

const productByDate = () => (setDate.map((x) => ({
  ...x,
  products: [
    { name: 'product1', count: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 10000) * 1000 },
    { name: 'product2', count: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 10000) * 1000 },
    { name: 'product3', count: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 10000) * 1000 },
    { name: 'product4', count: Math.floor(Math.random() * 1000), price: Math.floor(Math.random() * 10000) * 1000 },
  ]
})))

const purchaseByDate = () => {
  const result = setDate.map((x) => ({
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
  setDate,
  userFlowByDate,
  paymentByDate,
  productByDate,
  purchaseByDate
}