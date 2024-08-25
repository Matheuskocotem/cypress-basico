/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function(){
    const longText ='Teste, Teste, TesteTeste, Teste, Teste, Teste, Teste, TesteTeste, Teste, TesteTeste, Teste, TesteTeste, Teste, TesteTeste, Teste, TesteTeste, Teste, TesteTeste, Teste, Teste'
     cy.get('#firstName').type('João')
     cy.get('#lastName').type('Silva')  
     cy.get('#email').type('joao.silva@tat.com.br')
     cy.get('#open-text-area').type(longText, {delay: 0})
     cy.contains('button', 'Enviar').click()

     cy.get('.success').should('be.visible')
    })

    it('exibe menssagem de erro ao submeter o formulario  com um email com formatação', function(){
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Silva')  
        cy.get('#email').type('joao.silva@tat,com.br')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio qaundo preenchido com o valor não numerico', function(){
        cy.get('#phone')
        .type('abcdef')
        .should('have.value', '')
    })

    it('exibe  e menssagem erro quando o telefone se torna obrigatorio', function(){
        cy.get('#firstName').type('João')
        cy.get('#lastName').type('Silva')  
        cy.get('#email').type('joao.silva@tat.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos none, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('João')
        .clear()
        .should('have.value', '')

        cy.get('#lastName')
        .type('santos')
        .clear()
        .should('have.value', '')

        cy.get('#email')
        .type('joao.silva@tat.com.br')
        .clear()
        .should('have.value', '')
    
        cy.get('#phone')
        .type('1234567890')
        .should('have.value', '1234567890')
        .clear()
        .should('have.value', '')
    })

    it('exibe a menssagem erro ao submeter o furmulario sem preencher os campos obrigatorios', function(){
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    it('envia o formulario com sucesso usando o comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('selecionar um produto (youtube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('selecionar um produto (mentoria) por seu (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('selecionar um produto (blog) por seu (indice)', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o antendimento feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de antendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

        })
    })

    it('marca ambos os checkboxes, depois desmarca o ultimo', function(){
        cy.get('input[type="checkbox"]')   
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo de pasta fixtures', function(){
        cy.get('input[type="file"]')   
        .should('not.be.checked')
        .selectFile('./cypress/fixtures/example.js')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verificar que a politicad e privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
})