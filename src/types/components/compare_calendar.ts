import { DateTime } from 'luxon'

interface DayObject {
  // key는 yyyy-mm 형태의 week Date는 이중배열로 첫 배열은 주차, 두번째 배열은 일자
  [key: string]: Array<Array<DateTime|undefined>>
}

export type {
  DayObject
}