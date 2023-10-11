import { DateTime } from 'luxon'

describe('헤더와 달력 테스트', () => {
  // 사이트에 접속
  beforeEach(() => {
    cy.visit('/')
    cy.get('.headergnb-preview').click()
    cy.get('.calendar-container .calendar-month').as('month')
    cy.get('.headergnb-calendar-selector fieldset').as('panel')
  })

  const now = DateTime.now()
  const before = DateTime.now().minus({month: 1})
  const after = DateTime.now().plus({month: 1})

  it('헤더에 기준일자와 비교기간이 올바르게 출력되는지 확인', () => {
    cy.get('.headergnb-preview p')
      .first()
      .should('contain', `기준일자: ${now.minus({day: 6}).toFormat('yyyy-LL-dd')} ~ ${now.toFormat('yyyy-LL-dd')}`)
      .next()
      .should('contain', `비교기간: ${now.minus({day: 13}).toFormat('yyyy-LL-dd')} ~ ${now.minus({day: 7}).toFormat('yyyy-LL-dd')}`)
  })

  it('헤더를 클릭하면 달력이 뜨는지 확인', () => {
    cy.get('.headergnb-calendar').should('be.visible')
  })

  it('달력의 월이 3개 출력되고 각각 올바른지 확인', () => {
    cy.get('@month').find('section h2').should('contain', before.toFormat('yyyy-LL'))
    cy.get('@month').find('section h2').should('contain', now.toFormat('yyyy-LL'))
    cy.get('@month').find('section h2').should('contain', after.toFormat('yyyy-LL'))
  })
  
  it('달력의 각각 월의 시작일과 종료일을 찾아서 나오는지 확인', () => {
    cy.get('@month').eq(0).find('.calendar-body p').should('contain', before.startOf('month').toFormat('d'))
    cy.get('@month').eq(0).find('.calendar-body p').should('contain', before.endOf('month').toFormat('d'))
    
    cy.get('@month').eq(1).find('.calendar-body p').should('contain', now.startOf('month').toFormat('d'))
    cy.get('@month').eq(1).find('.calendar-body p').should('contain', now.endOf('month').toFormat('d'))
    
    cy.get('@month').eq(2).find('.calendar-body p').should('contain', after.startOf('month').toFormat('d'))
    cy.get('@month').eq(2).find('.calendar-body p').should('contain', after.endOf('month').toFormat('d'))
  })

  describe('선택 범위가 이전기간으로 되어있는 경우', () => {
    it('달력의 특정 날짜를 클릭하면 해당일로 세팅되며 헤더 기준일자도 변경된다', () => {
      cy.get('@month').eq(1).contains('.calendar-body p', 4).click()
      cy.get('@month').eq(1).contains('.calendar-body p', 6).click()
      cy.get('.headergnb-preview p')
        .first()
        .should('contain', `기준일자: ${now.set({day: 4}).toFormat('yyyy-LL-dd')} ~ ${now.set({day: 6}).toFormat('yyyy-LL-dd')}`)
        .next()
        .should('contain', `비교기간: ${now.set({day: 1}).toFormat('yyyy-LL-dd')} ~ ${now.set({day: 3}).toFormat('yyyy-LL-dd')}`)
      cy.get('@panel').eq(1).find('input').eq(0).should('have.value', now.set({day: 4}).toFormat('yyyy-LL-dd'))
      cy.get('@panel').eq(1).find('input').eq(1).should('have.value', now.set({day: 6}).toFormat('yyyy-LL-dd'))
      
      cy.get('@panel').eq(3).find('input').eq(0).should('have.value', now.set({day: 1}).toFormat('yyyy-LL-dd'))
      cy.get('@panel').eq(3).find('input').eq(1).should('have.value', now.set({day: 3}).toFormat('yyyy-LL-dd'))
    })

    it('기간 selectbox를 변경하면 해당하는 기간으로 바뀌는지 확인', () => {
      const dateArray = [7, 14, 21, 28, 91]
  
      for (const n of dateArray) {
        cy.get('.headergnb-calendar-selector select').eq(0).select(`${n}`)
        cy.get('.headergnb-calendar-selector select').should('have.value', `${n}`)
        cy.get('.headergnb-preview p')
          .first()
          .should('contain', `기준일자: ${now.minus({day: n - 1}).toFormat('yyyy-LL-dd')} ~ ${now.toFormat('yyyy-LL-dd')}`)
          .next()
          .should('contain', `비교기간: ${now.minus({day: n * 2 - 1}).toFormat('yyyy-LL-dd')} ~ ${now.minus({day: n}).toFormat('yyyy-LL-dd')}`)
      }
    })
  })
  
  describe('선택 범위가 이전연도로 되어있는 경우', () => {
    it('달력의 특정 날짜를 클릭하면 해당일로 세팅되며 헤더 기준일자도 변경된다', () => {
      cy.get('.headergnb-calendar-selector select').eq(1).select('year')
      cy.get('.headergnb-calendar-selector select').eq(1).should('have.value', 'year')

      cy.get('@month').eq(1).contains('.calendar-body p', 4).click()
      cy.get('@month').eq(1).contains('.calendar-body p', 6).click()
      cy.get('.headergnb-preview p')
        .first()
        .should('contain', `기준일자: ${now.set({day: 4}).toFormat('yyyy-LL-dd')} ~ ${now.set({day: 6}).toFormat('yyyy-LL-dd')}`)
        .next()
        .should('contain', `비교기간: ${now.minus({year: 1}).set({day: 4}).toFormat('yyyy-LL-dd')} ~ ${now.minus({year: 1}).set({day: 6}).toFormat('yyyy-LL-dd')}`)
      cy.get('@panel').eq(1).find('input').eq(0).should('have.value', now.set({day: 4}).toFormat('yyyy-LL-dd'))
      cy.get('@panel').eq(1).find('input').eq(1).should('have.value', now.set({day: 6}).toFormat('yyyy-LL-dd'))
      
      cy.get('@panel').eq(3).find('input').eq(0).should('have.value', now.minus({year: 1}).set({day: 4}).toFormat('yyyy-LL-dd'))
      cy.get('@panel').eq(3).find('input').eq(1).should('have.value', now.minus({year: 1}).set({day: 6}).toFormat('yyyy-LL-dd'))
    })
    
    it('기간 selectbox를 변경하면 해당하는 기간으로 바뀌는지 확인', () => {
      cy.get('.headergnb-calendar-selector select').eq(1).select('year')
      cy.get('.headergnb-calendar-selector select').eq(1).should('have.value', 'year')
      
      const dateArray = [7, 14, 21, 28, 91]
  
      for (const n of dateArray) {
        cy.get('.headergnb-calendar-selector select').eq(0).select(`${n}`)
        cy.get('.headergnb-calendar-selector select').should('have.value', `${n}`)
        cy.get('.headergnb-preview p')
          .first()
          .should('contain', `기준일자: ${now.minus({day: n - 1}).toFormat('yyyy-LL-dd')} ~ ${now.toFormat('yyyy-LL-dd')}`)
          .next()
          .should('contain', `비교기간: ${now.minus({year: 1, day: n - 1}).toFormat('yyyy-LL-dd')} ~ ${now.minus({year: 1}).toFormat('yyyy-LL-dd')}`)
      }
    })
  })
  
  it('이전기간과 이전연도가 스왑되는지 확인', () => {
    // 이전기간
    cy.get('@month').eq(1).contains('.calendar-body p', 4).click()
    cy.get('@month').eq(1).contains('.calendar-body p', 6).click()
    cy.get('.headergnb-preview p')
      .first()
      .should('contain', `기준일자: ${now.set({day: 4}).toFormat('yyyy-LL-dd')} ~ ${now.set({day: 6}).toFormat('yyyy-LL-dd')}`)
      .next()
      .should('contain', `비교기간: ${now.set({day: 1}).toFormat('yyyy-LL-dd')} ~ ${now.set({day: 3}).toFormat('yyyy-LL-dd')}`)
    cy.get('@panel').eq(1).find('input').eq(0).should('have.value', now.set({day: 4}).toFormat('yyyy-LL-dd'))
    cy.get('@panel').eq(1).find('input').eq(1).should('have.value', now.set({day: 6}).toFormat('yyyy-LL-dd'))
    
    cy.get('@panel').eq(3).find('input').eq(0).should('have.value', now.set({day: 1}).toFormat('yyyy-LL-dd'))
    cy.get('@panel').eq(3).find('input').eq(1).should('have.value', now.set({day: 3}).toFormat('yyyy-LL-dd'))

    // 이전연도로 바꾼다면
    cy.get('.headergnb-calendar-selector select').eq(1).select('year')
    cy.get('.headergnb-calendar-selector select').eq(1).should('have.value', 'year')
    cy.get('@month').eq(1).contains('.calendar-body p', 4).click()
    cy.get('@month').eq(1).contains('.calendar-body p', 6).click()
    cy.get('.headergnb-preview p')
      .first()
      .should('contain', `기준일자: ${now.set({day: 4}).toFormat('yyyy-LL-dd')} ~ ${now.set({day: 6}).toFormat('yyyy-LL-dd')}`)
      .next()
      .should('contain', `비교기간: ${now.minus({year: 1}).set({day: 4}).toFormat('yyyy-LL-dd')} ~ ${now.minus({year: 1}).set({day: 6}).toFormat('yyyy-LL-dd')}`)
    cy.get('@panel').eq(1).find('input').eq(0).should('have.value', now.set({day: 4}).toFormat('yyyy-LL-dd'))
    cy.get('@panel').eq(1).find('input').eq(1).should('have.value', now.set({day: 6}).toFormat('yyyy-LL-dd'))
    
    cy.get('@panel').eq(3).find('input').eq(0).should('have.value', now.minus({year: 1}).set({day: 4}).toFormat('yyyy-LL-dd'))
    cy.get('@panel').eq(3).find('input').eq(1).should('have.value', now.minus({year: 1}).set({day: 6}).toFormat('yyyy-LL-dd'))

    // 다시 이전기간으로 바꾼다면
    cy.get('.headergnb-calendar-selector select').eq(1).select('periods')
    cy.get('.headergnb-calendar-selector select').eq(1).should('have.value', 'periods')
    cy.get('@month').eq(1).contains('.calendar-body p', 4).click()
    cy.get('@month').eq(1).contains('.calendar-body p', 6).click()
    cy.get('.headergnb-preview p')
      .first()
      .should('contain', `기준일자: ${now.set({day: 4}).toFormat('yyyy-LL-dd')} ~ ${now.set({day: 6}).toFormat('yyyy-LL-dd')}`)
      .next()
      .should('contain', `비교기간: ${now.set({day: 1}).toFormat('yyyy-LL-dd')} ~ ${now.set({day: 3}).toFormat('yyyy-LL-dd')}`)
    cy.get('@panel').eq(1).find('input').eq(0).should('have.value', now.set({day: 4}).toFormat('yyyy-LL-dd'))
    cy.get('@panel').eq(1).find('input').eq(1).should('have.value', now.set({day: 6}).toFormat('yyyy-LL-dd'))
    
    cy.get('@panel').eq(3).find('input').eq(0).should('have.value', now.set({day: 1}).toFormat('yyyy-LL-dd'))
    cy.get('@panel').eq(3).find('input').eq(1).should('have.value', now.set({day: 3}).toFormat('yyyy-LL-dd'))
  })
})
