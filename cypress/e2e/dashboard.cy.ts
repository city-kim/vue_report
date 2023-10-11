describe('UserInflow', () => {
  
  describe('skleton 테스트', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('left의 첫번째 컴포넌트', () => {
      cy.get('.dashboard-userinflow-body-left .skeleton:first').should('exist')
    })
    it('left의 첫번째 컴포넌트', () => {
      cy.get('.dashboard-userinflow-body-left .skeleton:last').should('exist')
    })
    it('center 컴포넌트', () => {
      cy.get('.dashboard-userinflow-body-center .skeleton').should('exist')
    })
    
    it('right 첫번째 컴포넌트', () => {
      cy.get('.dashboard-userinflow-body-right .skeleton').should('exist')
    })
  })

  describe('데이터가 존재하는 경우', () => {
    describe('dashboard-userinflow-body-left 테스트', () => {
      beforeEach(() => {
        cy.visit('/')
        /* eslint-disable cypress/no-unnecessary-waiting */
        cy.wait(1500)
      })
      it('전체방문자 컴포넌트 확인', () => {
        cy.get('.dashboard-userinflow-body-left > div:first')
          .should('exist')
          .within(() => {
            // 전체방문자 데이터가 존재하는지 확인
            cy.get('.mixed-title-percent section h3').should('exist')
            cy.get('.component-percentage').trigger('mouseover')
            cy.get('.component-percentage').should('have.attr', 'title')
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
            cy.get('.component-percentage').trigger('mouseover')
            cy.get('.component-percentage').should('have.attr', 'title')
            cy.get('.component-percentage p').should('exist')
            cy.get('.mixed-title-percent > p').should('have.text', '방문자 가입률')

            cy.get('.chart-container canvas').should('exist')
          })
      })
    })

    describe('dashboard-userinflow-body-center 테스트', () => {
      it('신규가입자 컴포넌트 확인', () => {
        cy.visit('/')
        /* eslint-disable cypress/no-unnecessary-waiting */
        cy.wait(1500)
        cy.get('.dashboard-userinflow-body-center')
        .should('exist')
        .within(() => {
          cy.get('.mixed-title-percent section h3').should('exist')
          cy.get('.component-percentage').trigger('mouseover')
          cy.get('.component-percentage').should('have.attr', 'title')
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
        /* eslint-disable cypress/no-unnecessary-waiting */
        cy.wait(1500)
        cy.get('.dashboard-userinflow-body-right')
        .should('exist')
        .within(() => {
          cy.get('article h2').should('have.text', '가입자 추이')

          cy.get('.button-group button').each(($el) => {
            cy.wrap($el).click()
            cy.wrap($el)
            cy.wrap($el).should('have.class', 'active')
          })

          cy.get('.chart-container canvas').should('exist')
        })
      })
    })
  })
})

describe('PaymentInfo', () => {

  describe('skleton 테스트', () => {
    beforeEach(() => {
      cy.visit('/')
    })
    it('결제 left 컴포넌트', () => {
      cy.get('.dashboard-paymentinfo-pay-body > div:first .skeleton').should('exist')
    })
    it('결제 right 컴포넌트', () => {
      cy.get('.dashboard-paymentinfo-pay-body > div:last .skeleton').should('exist')
    })
    it('환불|탈퇴 컴포넌트', () => {
      cy.get('.dashboard-paymentinfo-pay-body .skeleton').should('exist')
    })
  })

  describe('데이터가 존재하는 경우', () => {
    describe('결제 테스트', () => {
      beforeEach(() => {
        cy.visit('/')
        /* eslint-disable cypress/no-unnecessary-waiting */
        cy.wait(1500)
      })
      const cards = ['결제자수', '결제액', '결제율', '평균결제액']
      for (let i=0; i<cards.length; i++) {
        it(cards[i], () => {
          cy.get('.dashboard-paymentinfo-pay-body .dashboard-card-counter').as('paymentCard')
    
          cy.get('@paymentCard').eq(i).find('h3').should('have.text', cards[i])
          cy.get('@paymentCard').eq(i).find('.component-percentage').trigger('mouseover')
          cy.get('@paymentCard').eq(i).find('.component-percentage').should('have.attr', 'title')
          cy.get('@paymentCard').eq(i).find('.component-percentage p').should('exist')
        })
      }
  
      it('결제 및 환불 차트 테스트', () => {
        cy.get('.dashboard-paymentinfo-pay-body .dashboard-paymentinfo-pay-chart').as('paymentChart')
        cy.get('@paymentChart').find('.button-group button').each(($el) => {
          cy.wrap($el).click()
          cy.wrap($el).should('have.class', 'active')
        })
        cy.get('@paymentChart').find('.chart-container canvas').should('exist')
      })
    })
  
    describe('환불 탈퇴 테스트', () => {
      beforeEach(() => {
        cy.visit('/')
        /* eslint-disable cypress/no-unnecessary-waiting */
        cy.wait(1500)
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

})

describe('ProductInfo', () => {

  describe('skleton 테스트', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.get('.dashboard-productinfo-body article').as('product')
    })
  
    it('left 컴포넌트', () => {
      cy.get('@product').eq(0).find('.skeleton').should('exist')
    })

    it('center 컴포넌트', () => {
      cy.get('@product').eq(1).find('.skeleton').should('exist')
    })
    
    it('right 컴포넌트', () => {
      cy.get('@product').eq(2).find('.skeleton').should('exist')
    })
  })

  describe('데이터가 존재하는 경우', () => {
    describe('제품 테스트', () => {
      beforeEach(() => {
        cy.visit('/')
        /* eslint-disable cypress/no-unnecessary-waiting */
        cy.wait(1500)
        cy.get('.dashboard-productinfo-body article').as('product')
      })
  
      it('판매량 테스트', () => {
        cy.get('@product').eq(0).find('.chart-container canvas').should('exist')
      })
  
      it('판매순위', () => {
        cy.get('@product').eq(1).find('select').select(0)
        cy.get('@product').eq(1).should('have.value', '')
        cy.get('@product').eq(1).find('select').select(1)
        cy.get('@product').eq(1).should('have.value', 'payments')
        cy.get('@product').eq(1).find('select').select(2)
        cy.get('@product').eq(1).should('have.value', 'revenue')
        cy.get('@product').eq(1).find('select').select(3)
        cy.get('@product').eq(1).should('have.value', 'sales')
  
        cy.get('@product').eq(1).find('.data-table table').should('exist')
      })
      
      it('종류별 비율 테스트', () => {
        cy.get('@product').eq(2).find('.chart-container canvas').should('exist')
      })
    })
  })
  
})