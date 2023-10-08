import { describe, it, expect } from 'vitest'
import { dataToDateGroup, sumArrayByObject, sumArrayByKey, dateSort } from '@/util/data_converter'
import { DateTime } from 'luxon'

describe('dataToDateGroup Object의 key값을 기준으로 합산한다', () => {
  const _onlyObject = { date: '', test: 0 }
  const onlyObject = [
    { date: '2021-12-29', test: 11 },
    { date: '2021-12-30', test: 22 },
    { date: '2021-12-31', test: 33 },
    { date: '2022-01-01', test: 44 },
    { date: '2022-01-02', test: 55 },
    { date: '2022-01-03', test: 66 },
  ]
  const dataGroup = dataToDateGroup(onlyObject, _onlyObject)

  it ('day 데이터는 전달되는 data의 date값과 같다', () => {
    expect(dataGroup.day).toEqual(onlyObject)
  })

  it ('week 데이터는 전달되는 data의 date값을 기준으로 주차를 구분한다', () => {
    expect(dataGroup.week).toEqual([
      { date: '2021-W52', test: 165 },
      { date: '2022-W01', test: 66 },
    ])
  })

  it ('month 데이터는 전달되는 data의 date값을 기준으로 월을 구분한다', () => {
    expect(dataGroup.month).toEqual([
      { date: '2021-12', test: 66 },
      { date: '2022-01', test: 165 },
    ])
  })
})

describe('dataToDateGroup Object 안에 Object가 포함된경우 객체 내부까지 탐색된다', () => {
  const _objectInObject = { date: '', test: 0, join_sns: {naver: 0, kakao: 0, google: 0, facebook: 0, apple: 0 }}
  const objectInObject = [
    { date: '2021-12-29', test: 11, join_sns: {naver: 11, kakao: 11, google: 11, facebook: 11, apple: 11 }},
    { date: '2021-12-30', test: 22, join_sns: {naver: 22, kakao: 22, google: 22, facebook: 22, apple: 22 }},
    { date: '2021-12-31', test: 33, join_sns: {naver: 33, kakao: 33, google: 33, facebook: 33, apple: 33 }},
    { date: '2022-01-01', test: 44, join_sns: {naver: 44, kakao: 44, google: 44, facebook: 44, apple: 44 }},
    { date: '2022-01-02', test: 55, join_sns: {naver: 55, kakao: 55, google: 55, facebook: 55, apple: 55 }},
    { date: '2022-01-03', test: 66, join_sns: {naver: 66, kakao: 66, google: 66, facebook: 66, apple: 66 }},
  ]
  const dataGroup = dataToDateGroup(objectInObject, _objectInObject)

  it ('day 데이터는 전달되는 data의 date값과 같다', () => {
    expect(dataGroup.day).toEqual(objectInObject)
  })

  it ('week 데이터는 전달되는 data의 date값을 기준으로 주차를 구분한다', () => {
    expect(dataGroup.week).toEqual([
      { date: '2021-W52', test: 165, join_sns: {naver: 165, kakao: 165, google: 165, facebook: 165, apple: 165 }},
      { date: '2022-W01', test: 66, join_sns: {naver: 66, kakao: 66, google: 66, facebook: 66, apple: 66 }},
    ])
  })

  it ('month 데이터는 전달되는 data의 date값을 기준으로 월을 구분한다', () => {
    expect(dataGroup.month).toEqual([
      { date: '2021-12', test: 66, join_sns: {naver: 66, kakao: 66, google: 66, facebook: 66, apple: 66 }},
      { date: '2022-01', test: 165, join_sns: {naver: 165, kakao: 165, google: 165, facebook: 165, apple: 165 }},
    ])
  })
})


describe('sumArrayByObject', () => {
  it ('배열의 object[key] 값을 기준으로 데이터가 합산된다.', () => {
    const data = [
      { date: '2021-12-29', test: 11, foo: 23, bar: 34 },
      { date: '2021-12-30', test: 56, foo: 78, bar: 9 },
      { date: '2021-12-31', test: 10, foo: 11, bar: 12 }
    ]
    expect(sumArrayByObject(data)).toEqual({ date: data[0].date, test: 77, foo: 112, bar: 55 })
  })

  it ('배열의 처음 값이 string이면 이후 전달되는 number는 무시된다', () => {
    const data = [
      { test: 'string', foo: 1, bar: 1 },
      { test: 2, foo: 2, bar: 2 },
      { test: 3, foo: 3, bar: 3 }
    ]
    expect(sumArrayByObject(data)).toEqual({ test: 'string', foo: 6, bar: 6 })
  })

  it ('배열 처음 값이 number인데 이후 string이 있다면 무시된다', () => {
    const data = [
      { test: 1, foo: 1, bar: 1 },
      { test: 2, foo: 'string', bar: 2 },
      { test: 3, foo: 3, bar: 'string' }
    ]
    expect(sumArrayByObject(data)).toEqual({ test: 6, foo: 4, bar: 3 })
  })

  it ('객채가 있다면 재귀로 탐색한다', () => {
    const data = [
      { test: 1, obj: { test: 1, foo: 2 }},
      { test: 2, obj: { test: 1, foo: 2 }},
      { test: 3, obj: { test: 1, foo: 2 }}
    ]
    expect(sumArrayByObject(data)).toEqual({ test: 6, obj: { test: 3, foo: 6 }})
  })

  it ('객채가 중간에 비어있는경우', () => {
    const data = [
      { test: 1, obj: { test: 1, foo: 2 }},
      { test: 2},
      { test: 3, obj: { test: 1, foo: 2 }}
    ]
    expect(sumArrayByObject(data)).toEqual({ test: 6, obj: { test: 2, foo: 4 }})
  })
})

describe('sumArrayByKey', () => {
  it ('배열의 특정 key 값으로 합산하여 다시 배열로 반환한다', () => {
    const data = [
      { key: 'test1', test: 1, foo: 1, bar: 1 },
      { key: 'test2', test: 2, foo: 2, bar: 2 },
      { key: 'test1', test: 1, foo: 1, bar: 1 },
      { key: 'test2', test: 2, foo: 2, bar: 2 },
      { key: 'test1', test: 1, foo: 1, bar: 1 },
      { key: 'test2', test: 2, foo: 2, bar: 2 },
    ]
    expect(sumArrayByKey(data, 'key')).toEqual([
      { key: 'test1', test: 3, foo: 3, bar: 3 },
      { key: 'test2', test: 6, foo: 6, bar: 6 },
    ])
  })

  it ('배열의 object가 있는경우 재귀로 탐색한다', () => {
    const data = [
      { key: 'test1', test: 1, foo: 1, bar: 1, obj: { test: 1, foo: 2 }},
      { key: 'test1', test: 2, foo: 2, bar: 2},
      { key: 'test2', test: 2, foo: 2, bar: 2, obj: { test: 3, foo: 4 }},
    ]
    expect(sumArrayByKey(data, 'key')).toEqual([
      { key: 'test1', test: 3, foo: 3, bar: 3, obj: { test: 1, foo: 2 } },
      { key: 'test2', test: 2, foo: 2, bar: 2, obj: { test: 3, foo: 4 } },
    ])
  })
})

describe('dateSort는 전달받은 날짜를 비교하여 from이 작고 to가 큰 날짜가 되도록 한다', () => {
  it('from이 더 큰값으로 전달된 경우 값을 바꿔준다', () => {
    const from = DateTime.fromISO('2023-09-30')
    const to = DateTime.fromISO('2023-09-01')

    const data = dateSort(from, to)
    expect(data.from.toFormat('yyyy-LL-dd')).toBe('2023-09-01')
    expect(data.to.toFormat('yyyy-LL-dd')).toBe('2023-09-30')
  })

  it('from이 작은값이라면 변동없음', () => {
    const from = DateTime.fromISO('2023-09-01')
    const to = DateTime.fromISO('2023-09-30')

    const data = dateSort(from, to)
    expect(data.from.toFormat('yyyy-LL-dd')).toBe(from.toFormat('yyyy-LL-dd'))
    expect(data.to.toFormat('yyyy-LL-dd')).toBe(to.toFormat('yyyy-LL-dd'))
  })
})