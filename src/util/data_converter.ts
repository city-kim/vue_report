import { DateTime } from 'luxon'
import { DATE_DATA_ITEM } from '@/constants/DATE_BY_DATA'
import type { DateByData } from '@/types/date_by_data'

const dataToDateGroup = (data: Array<DateByData>) => {
  const week: Array<DateByData> = []
  const month: Array<DateByData> = []

  for (let i=0; i<data.length; i++) {
    const weekKey = DateTime.fromISO(data[i].date).toFormat("kkkk-'W'WW")
    const monthKey = DateTime.fromISO(data[i].date).toFormat('yyyy-MM')

    const weekTarget = week.find(x => x.date == weekKey)
    const monthTarget = month.find(x => x.date == monthKey)

    if (weekTarget) {
      // 이미 존재하는 주차의 경우
      dataInput(data[i], weekTarget)
    } else {
      // 없으면 새로추가
      const weekObject = structuredClone(DATE_DATA_ITEM)
      dataInput(data[i], weekObject)
      weekObject.date = weekKey
      week.push(weekObject)
    }

    if (monthTarget) {
      // 이미 존재하는 월의 경우
      dataInput(data[i], monthTarget)
    } else {
      // 없으면 새로추가
      const monthTarget = structuredClone(DATE_DATA_ITEM)
      dataInput(data[i], monthTarget)
      monthTarget.date = monthKey
      month.push(monthTarget)
    }
  }

  return {
    day: data,
    week: week,
    month: month
  }
}

function dataInput (data: DateByData, target: DateByData) {
  // 데이터 입력하기
  target.new_visit += data.new_visit
  target.return_visit += data.return_visit
  target.login += data.login
  target.join += data.join
  target.withdraw += data.withdraw
  target.payer += data.payer
  target.payment_amount += data.payment_amount
  target.refunder += data.refunder
  target.refund_amount += data.refund_amount
  target.dormant += data.dormant
  target.return += data.return

  target.join_sns.naver += data.join_sns.naver
  target.join_sns.kakao += data.join_sns.kakao
  target.join_sns.google += data.join_sns.google
  target.join_sns.facebook += data.join_sns.facebook
  target.join_sns.apple += data.join_sns.apple
}

export {
  dataToDateGroup
}