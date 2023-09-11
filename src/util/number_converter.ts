/**
 * from에서 to로 변하면 얼마나 증감한지 구하기
 * @param from number 비교할 대상
 * @param to number 비교될 값
 * @returns 전달된 값에대한 비율 (값이 하나라도 없으면 0)
 */
const getPercent = (from?: number, to?: number) => {
  if (!from || !to) return 0
  return Math.floor(((from - to) / to) * 100)
}

/**
 * count가 totalCount에서 몇프로를 차지하는지 구하기
 * @param count number 구할값
 * @param totalCount number 전체값
 * @returns 전달된 값에 대한 비율 (값이 하나라도 없으면 0)
 */
const getRate = (count?: number, totalCount?: number) => {
  if (!count || !totalCount) return 0
  return Math.floor((count / totalCount) * 100)
}

export { getPercent, getRate }