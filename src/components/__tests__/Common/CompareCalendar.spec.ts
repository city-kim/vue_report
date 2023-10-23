import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { DateTime, Interval } from 'luxon'

import type { DayObject } from '@/types/components/compare_calendar'

import CompareCalendar from '@/components/Common/CompareCalendar.vue'

interface ComponentVm {
  baseMonth: string
  dayObject: DayObject
  changeMonth: (move: number) => void
  DayOfWeek: Array<string>
  beforeInterval: Interval
  afterInterval: Interval
  activeTypeCheck: (days: DateTime|undefined) => string
  selectDate: {from: DateTime|null, to: DateTime|null}
  changeSelectDate: (days: DateTime|undefined) => void
}

const date = {
  beforeDate: {
    from: DateTime.fromISO('2023-08-01'),
    to: DateTime.fromISO('2023-08-31'),
  },
  afterDate: {
    from: DateTime.fromISO('2023-08-15'),
    to: DateTime.fromISO('2023-09-15'),
  }
}

describe('마운트시 올바르게 날짜를 생성하는지 확인', () => {
  const wrapper = shallowMount(CompareCalendar, {
    props: date
  })
  const vm = wrapper.vm as unknown as ComponentVm
  const now = date.beforeDate.from
  const before = now.minus({ month: 1 })
  const after = now.plus({ month: 1 })

  it ('baseMonth는 beforeDate의 from을 기준으로 생성되어야 한다', () => {
    expect(vm.baseMonth).toEqual(now.toFormat('yyyy-LL-dd'))
  })
  
  it ('dayObject는 beforeDate의 from을 기준으로 앞 뒤 1개월씩 생성된다', () => {
    expect(vm.dayObject).toHaveProperty(before.toFormat('yyyy-LL'))
    expect(vm.dayObject).toHaveProperty(now.toFormat('yyyy-LL'))
    expect(vm.dayObject).toHaveProperty(after.toFormat('yyyy-LL'))
  })
  
  it ('dayObject의 각 월은 6개의 배열과 그 안에 7개의 값으로 생성된다', () => {
    expect(vm.dayObject[before.toFormat('yyyy-LL')]).toHaveLength(6)
    expect(vm.dayObject[before.toFormat('yyyy-LL')][0]).toHaveLength(7)
    expect(vm.dayObject[now.toFormat('yyyy-LL')]).toHaveLength(6)
    expect(vm.dayObject[now.toFormat('yyyy-LL')][0]).toHaveLength(7)
    expect(vm.dayObject[after.toFormat('yyyy-LL')]).toHaveLength(6)
    expect(vm.dayObject[after.toFormat('yyyy-LL')][0]).toHaveLength(7)
  })

  it ('dayObject의 각 월은 1일부터 마지막일까지의 값을 포함한다', () => {
    expect(vm.dayObject[before.toFormat('yyyy-LL')].flat().some(x => x?.toMillis() == before.startOf('month').toMillis())).toBe(true)
    expect(vm.dayObject[before.toFormat('yyyy-LL')].flat().some(x => x?.toMillis() == before.endOf('month').startOf('day').toMillis())).toBe(true)
    expect(vm.dayObject[now.toFormat('yyyy-LL')].flat().some(x => x?.toMillis() == now.startOf('month').toMillis())).toBe(true)
    expect(vm.dayObject[now.toFormat('yyyy-LL')].flat().some(x => x?.toMillis() == now.endOf('month').startOf('day').toMillis())).toBe(true)
    expect(vm.dayObject[after.toFormat('yyyy-LL')].flat().some(x => x?.toMillis() == after.startOf('month').toMillis())).toBe(true)
    expect(vm.dayObject[after.toFormat('yyyy-LL')].flat().some(x => x?.toMillis() == after.endOf('month').startOf('day').toMillis())).toBe(true)
  })
  
})

describe('마운트시 날짜가 생성된 경우 changeMonth함수가 호출되면 월이 변경되는지 확인', () => {
  it ('changeMonth(1)이 호출되면 baseMonth는 1달 뒤로 변경된다', () => {
    const wrapper = shallowMount(CompareCalendar, {
      props: date
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const now = date.beforeDate.from
    vm.changeMonth(1)

    expect(vm.dayObject).toHaveProperty(now.toFormat('yyyy-LL'))
    expect(vm.dayObject).toHaveProperty(now.plus({ month: 1 }).toFormat('yyyy-LL'))
    expect(vm.dayObject).toHaveProperty(now.plus({ month: 2 }).toFormat('yyyy-LL'))
  })
  
  it ('changeMonth(-1)이 호출되면 baseMonth는 1달 이전으로 변경된다', () => {
    const wrapper = shallowMount(CompareCalendar, {
      props: date
    })
    const vm = wrapper.vm as unknown as ComponentVm
    const now = date.beforeDate.from
    vm.changeMonth(-1)

    expect(vm.dayObject).toHaveProperty(now.minus({ month: 2 }).toFormat('yyyy-LL'))
    expect(vm.dayObject).toHaveProperty(now.minus({ month: 1 }).toFormat('yyyy-LL'))
    expect(vm.dayObject).toHaveProperty(now.toFormat('yyyy-LL'))
  })
})

describe('마운트시 요일 텍스트가 생성되는지 확인', () => {
    const wrapper = shallowMount(CompareCalendar, {
      props: date
    })
    const vm = wrapper.vm as unknown as ComponentVm
    it ('DayOfWeek는 7개의 배열로 생성된다', () => {
      expect(vm.DayOfWeek).toHaveLength(7)
    })

    it ('DayOfWeek의 값은 일 ~ 토로 생성된다', () => {
      expect(vm.DayOfWeek).toEqual(['일', '월', '화', '수', '목', '금', '토'])
    })
})

describe('props의 beforeDate와 afterDate가 전달된경우 beforeInterval과 afterInterval이 생성되는지 확인', () => {
    const wrapper = shallowMount(CompareCalendar, {
      props: date
    })
    const vm = wrapper.vm as unknown as ComponentVm

  it ('beforeInterval은 beforeDate의 from과 to로 생성된다', () => {
    expect(vm.beforeInterval.start).toEqual(date.beforeDate.from.startOf('day'))
    expect(vm.beforeInterval.end).toEqual(date.beforeDate.to.endOf('day'))
  })

  it ('afterInterval은 afterDate의 from과 to로 생성된다', () => {
    expect(vm.afterInterval.start).toEqual(date.afterDate.from.startOf('day'))
    expect(vm.afterInterval.end).toEqual(date.afterDate.to.endOf('day'))
  })
})

describe('changeSelectDate가 호출되었을때 selectDate의 값을 올바르게 변경하고 최종적으로 changeDate를 emit하는지 확인', () => {
  const wrapper = shallowMount(CompareCalendar, {
    props: date
  })
  const vm = wrapper.vm as unknown as ComponentVm
  const now = date.beforeDate.from

  it ('changeSelectDate에 DateTime이 전달되면 selectDate의 from이 반영된다', () => {
    vm.changeSelectDate(now)
    expect(vm.selectDate.from).toEqual(now)
  })

  it ('changeSelectDate에 DateTime이 두번 전달되면 selectDate의 값은 null이 되고 emit 이벤트를 활성화한다', () => {
    vm.changeSelectDate(now)
    expect(vm.selectDate).toEqual({
      from: null,
      to: null
    })
    expect(wrapper.emitted().changeDate[0]).toEqual([{
      from: now,
      to: now
    }])
  })
})


describe('activeTypeCheck 함수가 beforeInterval와 afterInterval에 맞춰 올바른 클래스를 반환하는지 확인', () => {
  const wrapper = shallowMount(CompareCalendar, {
    props: date
  })
  const vm = wrapper.vm as unknown as ComponentVm
  const now = date.beforeDate.from

  it ('beforeInterval에 포함되는 날짜가 전달되면 before를 반환한다', () => {
    expect(vm.activeTypeCheck(date.beforeDate.from)).toBe('before')
  })

  it ('afterInterval에 포함되는 날짜가 전달되면 before를 반환한다', () => {
    expect(vm.activeTypeCheck(date.afterDate.to)).toBe('after')
  })

  it ('beforeInterval와 afterInterval를 둘다 만족한다면 overlap을 반환한다', () => {
    expect(vm.activeTypeCheck(date.afterDate.from)).toBe('overlap')
  })

  it ('날짜가 전달되지 않는다면 disabled를 반환한다', () => {
    expect(vm.activeTypeCheck(undefined)).toBe('disabled')
  })

  it ('selectDate의 from값이 정의된다면 해당 값은 after로 반환된다', () => {
    vm.changeSelectDate(now)
    expect(vm.activeTypeCheck(now)).toBe('after')
  })

  it ('selectDate의 from값이 정의된다면 나머지 모든값은 빈값으로 전달된다', () => {
    expect(vm.activeTypeCheck(DateTime.now())).toBe('')
  })

})