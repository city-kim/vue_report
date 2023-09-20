import { describe, it, expect } from 'vitest'
import { dataToDateGroup } from '@/util/data_converter'

describe('dataToDateGroup', () => {
  const data = [
    { date: '2021-12-29', new_visit: 11, return_visit: 11, login: 11, join: 11, join_sns: {naver: 11, kakao: 11, google: 11, facebook: 11, apple: 11, }, withdraw: 11, payer: 11, payment_amount: 11, refunder: 11, refund_amount: 11, dormant: 11, return: 11 },
    { date: '2021-12-30', new_visit: 22, return_visit: 22, login: 22, join: 22, join_sns: {naver: 22, kakao: 22, google: 22, facebook: 22, apple: 22, }, withdraw: 22, payer: 22, payment_amount: 22, refunder: 22, refund_amount: 22, dormant: 22, return: 22 },
    { date: '2021-12-31', new_visit: 33, return_visit: 33, login: 33, join: 33, join_sns: {naver: 33, kakao: 33, google: 33, facebook: 33, apple: 33, }, withdraw: 33, payer: 33, payment_amount: 33, refunder: 33, refund_amount: 33, dormant: 33, return: 33 },
    { date: '2022-01-01', new_visit: 44, return_visit: 44, login: 44, join: 44, join_sns: {naver: 44, kakao: 44, google: 44, facebook: 44, apple: 44, }, withdraw: 44, payer: 44, payment_amount: 44, refunder: 44, refund_amount: 44, dormant: 44, return: 44 },
    { date: '2022-01-02', new_visit: 55, return_visit: 55, login: 55, join: 55, join_sns: {naver: 55, kakao: 55, google: 55, facebook: 55, apple: 55, }, withdraw: 55, payer: 55, payment_amount: 55, refunder: 55, refund_amount: 55, dormant: 55, return: 55 },
    { date: '2022-01-03', new_visit: 66, return_visit: 66, login: 66, join: 66, join_sns: {naver: 66, kakao: 66, google: 66, facebook: 66, apple: 66, }, withdraw: 66, payer: 66, payment_amount: 66, refunder: 66, refund_amount: 66, dormant: 66, return: 66 },
  ]
  const dataGroup = dataToDateGroup(data)

  it ('day 데이터는 전달되는 data의 date값과 같다', () => {
    expect(dataGroup.day).toEqual(data)
  })

  it ('week 데이터는 전달되는 data의 date값을 기준으로 주차를 구분한다', () => {
    expect(dataGroup.week).toEqual([
      { date: '2021-W52', new_visit: 165, return_visit: 165, login: 165, join: 165, join_sns: {naver: 165, kakao: 165, google: 165, facebook: 165, apple: 165, }, withdraw: 165, payer: 165, payment_amount: 165, refunder: 165, refund_amount: 165, dormant: 165, return: 165 },
      { date: '2022-W01', new_visit: 66, return_visit: 66, login: 66, join: 66, join_sns: {naver: 66, kakao: 66, google: 66, facebook: 66, apple: 66, }, withdraw: 66, payer: 66, payment_amount: 66, refunder: 66, refund_amount: 66, dormant: 66, return: 66 },
    ])
  })

  it ('month 데이터는 전달되는 data의 date값을 기준으로 월을 구분한다', () => {
    expect(dataGroup.month).toEqual([
      { date: '2021-12', new_visit: 66, return_visit: 66, login: 66, join: 66, join_sns: {naver: 66, kakao: 66, google: 66, facebook: 66, apple: 66, }, withdraw: 66, payer: 66, payment_amount: 66, refunder: 66, refund_amount: 66, dormant: 66, return: 66 },
      { date: '2022-01', new_visit: 165, return_visit: 165, login: 165, join: 165, join_sns: {naver: 165, kakao: 165, google: 165, facebook: 165, apple: 165, }, withdraw: 165, payer: 165, payment_amount: 165, refunder: 165, refund_amount: 165, dormant: 165, return: 165 },
    ])
  })
})