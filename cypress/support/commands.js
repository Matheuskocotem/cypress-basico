Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')  
    cy.get('#email').type('joao.silva@tat.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})