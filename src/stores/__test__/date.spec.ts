import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { DateTime } from 'luxon'
import { dateStore } from '@/stores/date'

describe('dateStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('init시 날짜 설정', () => {
    it('afterDate는 오늘 -7일로 생성된다', () => {
      const store = dateStore()
      expect(store.afterDate.from.toFormat('yyyy-LL-dd')).toBe(DateTime.now().minus({day: 6}).toFormat('yyyy-LL-dd'))
      expect(store.afterDate.to.toFormat('yyyy-LL-dd')).toBe(DateTime.now().toFormat('yyyy-LL-dd'))
    })
  
    it('beforeDate는 오늘 -7일 ~ -14일로 생성된다', () => {
      const store = dateStore()
      expect(store.beforeDate.from.toFormat('yyyy-LL-dd')).toBe(DateTime.now().minus({day: 13}).toFormat('yyyy-LL-dd'))
      expect(store.beforeDate.to.toFormat('yyyy-LL-dd')).toBe(DateTime.now().minus({day: 7}).toFormat('yyyy-LL-dd'))
    })
  })

  describe('dateCustomUpdate는 전달받은 날짜로 변경된다', () => {
    it('afterDate일자가 변경된경우 반영된다', () => {
      const store = dateStore()
      store.dateCustomUpdate({type: 'after', from: DateTime.fromISO('2023-09-01'), to: DateTime.fromISO('2023-09-30')})
  
      expect(store.afterDate.from.toFormat('yyyy-LL-dd')).toBe('2023-09-01')
      expect(store.afterDate.to.toFormat('yyyy-LL-dd')).toBe('2023-09-30')
    })
  
    it('beforeDate일자가 변경된경우 반영된다', () => {
      const store = dateStore()
  
      store.dateCustomUpdate({type: 'before', from: DateTime.fromISO('2023-08-01'), to: DateTime.fromISO('2023-08-31')})
      expect(store.beforeDate.from.toFormat('yyyy-LL-dd')).toBe('2023-08-01')
      expect(store.beforeDate.to.toFormat('yyyy-LL-dd')).toBe('2023-08-31')
    })
  })

  describe('dateDiffUpdate는 전달받은 날짜로 afterDate를 설정하고 차이만큼 beforeDate를 설정한다', () => {
    it('afterDate일자가 변경된경우 반영된다', () => {
      const store = dateStore()
      store.dateDiffUpdate({from: DateTime.fromISO('2023-09-01'), to: DateTime.fromISO('2023-09-30')})

      expect(store.afterDate.from.toFormat('yyyy-LL-dd')).toBe('2023-09-01')
      expect(store.afterDate.to.toFormat('yyyy-LL-dd')).toBe('2023-09-30')
      
      expect(store.beforeDate.from.toFormat('yyyy-LL-dd')).toBe('2023-08-02')
      expect(store.beforeDate.to.toFormat('yyyy-LL-dd')).toBe('2023-08-31')
    })
  })

})