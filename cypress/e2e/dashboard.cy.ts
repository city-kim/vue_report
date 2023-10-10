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
        cy.get('.headergnb-calendar-selector select').eq(0).select(`${n}`).should('have.value', `${n}`)
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
      cy.get('.headergnb-calendar-selector select').eq(1).select('year').should('have.value', 'year')

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
      cy.get('.headergnb-calendar-selector select').eq(1).select('year').should('have.value', 'year')
      
      const dateArray = [7, 14, 21, 28, 91]
  
      for (const n of dateArray) {
        cy.get('.headergnb-calendar-selector select').eq(0).select(`${n}`).should('have.value', `${n}`)
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
    cy.get('.headergnb-calendar-selector select').eq(1).select('year').should('have.value', 'year')
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
    cy.get('.headergnb-calendar-selector select').eq(1).select('periods').should('have.value', 'periods')
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

describe('UserInflow', () => {
  describe('dashboard-userinflow-body-left 테스트', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('전체방문자 컴포넌트 확인', () => {
      cy.get('.dashboard-userinflow-body-left > div:first')
        .should('exist')
        .within(() => {
          // 전체방문자 데이터가 존재하는지 확인
          cy.get('.mixed-title-percent section h3').should('exist')
          cy.get('.component-percentage').trigger('mouseover').should('have.attr', 'title')
          cy.get('.component-percentage p').should('exist')
          cy.get('.mixed-title-percent > p').should('have.text', '전체방문자')

          // 신규 데이터가 존재하는지 확인
          cy.get('.mixed-title-line-progress').eq(0).find('h3').should('have.text', '신규')
          cy.get('.mixed-title-line-progress').eq(0).find('span').should('exist')
          cy.get('.mixed-title-line-progress').eq(0).find('strong').should('exist')

          // 재방문 데이터가 존재하는지 확인
          cy.get('.mixed-title-line-progress').eq(1).find('h3').should('have.text', '재방문')
          cy.get('.mixed-title-line-progress').eq(1).find('span').should('exist')
          cy.get('.mixed-title-line-progress').eq(1).find('strong').should('exist')
        })
    })

    it('방문자 가입률 컴포넌트 확인', () => {
      cy.get('.dashboard-userinflow-body-left > div:last')
        .should('exist')
        .within(() => {
          // 방문자 가입률 데이터가 존재하는지 확인
          cy.get('.mixed-title-percent section h3').should('exist')
          cy.get('.component-percentage').trigger('mouseover').should('have.attr', 'title')
          cy.get('.component-percentage p').should('exist')
          cy.get('.mixed-title-percent > p').should('have.text', '방문자 가입률')

          cy.get('.chart-container canvas').should('exist')
        })
    })
  })

  describe('dashboard-userinflow-body-center 테스트', () => {
    it('신규가입자 컴포넌트 확인', () => {
      cy.visit('/')
      cy.get('.dashboard-userinflow-body-center')
      .should('exist')
      .within(() => {
        cy.get('.mixed-title-percent section h3').should('exist')
        cy.get('.component-percentage').trigger('mouseover').should('have.attr', 'title')
        cy.get('.component-percentage p').should('exist')
        cy.get('.mixed-title-percent > p').should('have.text', '신규가입자')
        
        const sns = ['이메일', '네이버', 'KAKAO', 'google', 'facebook', 'apple']
        for (let i=0; i<sns.length; i++) {
          cy.get('.mixed-title-line-progress').eq(i).find('h3').should('have.text', sns[i])
          cy.get('.mixed-title-line-progress').eq(i).find('span').should('exist')
          cy.get('.mixed-title-line-progress').eq(i).find('strong').should('exist')
        }
      })
    })
  })

  describe('dashboard-userinflow-body-right 테스트', () => {
    it('가입자 추이 컴포넌트 확인', () => {
      cy.visit('/')
      cy.get('.dashboard-userinflow-body-right')
      .should('exist')
      .within(() => {
        cy.get('article h2').should('have.text', '가입자 추이')

        cy.get('.button-group button').each(($el) => {
          cy.wrap($el).click().should('have.class', 'active')
        })

        cy.get('.chart-container canvas').should('exist')
      })
    })
  })
})

describe('PaymentInfo', () => {
  describe('결제 테스트', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    const cards = ['결제자수', '결제액', '결제율', '평균결제액']
    for (let i=0; i<cards.length; i++) {
      it(cards[i], () => {
        cy.get('.dashboard-paymentinfo-pay-body .dashboard-card-counter').as('paymentCard')
  
        cy.get('@paymentCard').eq(i).find('h3').should('have.text', cards[i])
        cy.get('@paymentCard').eq(i).find('.component-percentage').trigger('mouseover').should('have.attr', 'title')
        cy.get('@paymentCard').eq(i).find('.component-percentage p').should('exist')
      })
    }

    it('결제 및 환불 차트 테스트', () => {
      cy.get('.dashboard-paymentinfo-pay-body .dashboard-paymentinfo-pay-chart').as('paymentChart')
      cy.get('@paymentChart').find('.button-group button').each(($el) => {
        cy.wrap($el).click().should('have.class', 'active')
      })
      cy.get('@paymentChart').find('.chart-container canvas').should('exist')
    })
  })

  describe('환불 탈퇴 테스트', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    const cards = ['환불자', '탈퇴자', '환불율', '탈퇴율']
    for (let i=0; i<cards.length; i++) {
      it(cards[i], () => {
        cy.get('.dashboard-userinfo-refund .dashboard-circle-counter').as('refundCircle')
  
        cy.get('@refundCircle').eq(i).find('h3').should('have.text', cards[i])
        cy.get('@refundCircle').eq(i).find('.progress-circle p').should('exist')
      })
    }

  })
})

describe('ProductInfo', () => {
  describe('제품 테스트', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('.dashboard-productinfo-body article').as('product')
    })

    it('판매량 테스트', () => {
      cy.get('@product').eq(0).find('.chart-container canvas').should('exist')
    })

    it('판매순위', () => {
      cy.get('@product').eq(1).find('select').select(0).should('have.value', '')
      cy.get('@product').eq(1).find('select').select(1).should('have.value', 'payments')
      cy.get('@product').eq(1).find('select').select(2).should('have.value', 'revenue')
      cy.get('@product').eq(1).find('select').select(3).should('have.value', 'sales')

      cy.get('@product').eq(1).find('.data-table table').should('exist')
    })
    
    it('종류별 비율 테스트', () => {
      cy.get('@product').eq(2).find('.chart-container canvas').should('exist')
    })
  })
})