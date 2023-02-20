// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />




describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(()=>{
    cy.visit('./src/index.html')
    
  })  
  
  
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
        
        
    })
    
    it('preenche os campos obrigatórios e envia o formulário', function(){
      
      const longText = "teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,"
      
      
      //preenchendo o campo nome
      cy.get('#firstName')
        .type('eduardo')
        .should('have.value','eduardo')
      //preenchendo o campo sobrenome 
        cy.get('#lastName')
        .type('galdino')
        .should('have.value','galdino')
      //preenchendo o campo email
        cy.get('#email')
          .type('eduardogaldino1@gmail.com')
          .should('have.value','eduardogaldino1@gmail.com')
      //preenchendo o campo telefone
        cy.get('#phone')
          .type('889873654')
          .should('have.value','889873654')
      //preenchendo o campo como podemos te ajudar
        cy.get('#open-text-area')
          .type(longText, {delay: 0 })
          //.should('have.value','o telefone não está pegando')    
      //clicando no botão enviar
        cy.contains('button','Enviar')
          .click()
      //validando mensagem de sucesso
        cy.get('.success > strong')
          .should('be.visible')
        })
        
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
      
      //preenchendo o campo nome
      cy.get('#firstName')
        .type('eduardo')
        
      //preenchendo o campo sobrenome 
        cy.get('#lastName')
        .type('galdino')
        
      //preenchendo o campo email, com um email fora do padrão
        cy.get('#email')
          .type('eduardogaldino1gmail.com')
          
      //preenchendo o campo telefone
        cy.get('#phone')
          .type('889873654')
          
      //preenchendo o campo como podemos te ajudar
        cy.get('#open-text-area')
          .type('TESTE')
        // clicar no botao enviar
        cy.contains('button','Enviar')
            .click()
      
          //validando mensagem de sucesso
        cy.get('.error > strong')
          .should('be.visible') 
      })

    it('campo telefone nao preenchido com valor numerico',function(){

          
      //preenchendo o campo telefone com caracters nao-númericos
        cy.get('#phone')
          .type('eadaweef')
          .should('have.value','')
          
      


    })  

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
      //preenchendo o campo nome
      cy.get('#firstName')
        .type('eduardo')
        
      //preenchendo o campo sobrenome 
        cy.get('#lastName')
          .type('galdino')
        
      //preenchendo o campo email, com um email fora do padrão
        cy.get('#email')
          .type('eduardogaldino1@gmail.com')
          
      //preenchendo o campo telefone
        cy.get('#phone')
             
      //preenchendo o campo como podemos te ajudar
        cy.get('#open-text-area')
          .type('TESTE')
      // marcar check box telefone
        cy.get('#phone-checkbox')
          .check()
          .should('be.checked')
      
      //clianco no botão enviar    
      cy.contains('button','Enviar')
        .click()
           
      
      //validando mensagem de erro
        cy.get('.error')
          .should('be.visible') 
      })

    
    it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
      //preenchendo o campo nome
      cy.get('#firstName')
      .type('eduardo')
      .should('have.value','eduardo')
      .clear()
      .should('have.value','')  


      //preenchendo o campo sobrenome 
      cy.get('#lastName')
        .type('galdino')
        .should('have.value','galdino')
        .clear()
        .should('have.value','')  
      
      //preenchendo o campo email, com um email fora do padrão
      cy.get('#email')
        .type('eduardogaldino1@gmail.com')
        .should('have.value','eduardogaldino1@gmail.com')
        .clear()
        .should('have.value','')
        
      //preenchendo o campo telefone
      cy.get('#phone')
        .type('87116182')
        .should('have.value','87116182')
        .clear()
        .should('have.value','')

      })
    
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
      
      //clianco no botão enviar    
      cy.contains('button','Enviar')
        .click()

      //validando mensagem de erro
      cy.get('.error')
        .should('be.visible') 
  
    })
        //comando customizado 
    it('envia o formuário com sucesso usando um comando customizado', function(){
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success')
        .should('be.visible')

    })
     
    
    //Selecionando opções em campos de seleção suspensa


    //selecionando campos suspensos pelo texto
    it('seleciona um produto (YouTube) por seu texto',function(){
      cy.get('#product')
        .select('YouTube')
        .should('have.value','youtube')
    })
    
    //selecionando campos suspensos pelo valor
    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
      cy.get('#product')
        .select('mentoria')
        .should('have.value','mentoria')
    })
     
    //selecionando campos suspensos pelo indice
    it('seleciona um produto (Blog) por seu índice',function(){
      cy.get('#product')
        .select(1)
        .should('have.value','blog')
    })
  
  
    //Marcando inputs do tipo radio

    it('marca o tipo de atendimento "Feedback',function(){
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value','feedback')
    })
    
    //inoputs tipo radio com ceck na verificação
    it('marca cada tipo de atendimento',function(){
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
        
    })
    
    
    //Marcando (e desmarcando) inputs do tipo checkbox
    it('marca ambos checkboxes, depois desmarca o último',function(){
      cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()        
        .should('not.be.checked')
      })
    
      //Fazendo upload de arquivos com Cypress
    it('seleciona um arquivo da pasta fixtures',function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })

    }) 

    it('seleciona um arquivo simulando um drag-and-drop',function(){
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'})
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
      cy.fixture('example.json').as('samplefile')
      cy.get('input[type="file"]')
        .selectFile('@samplefile')
        .should(function($input){
          //console.log($input)
          expect($input[0].files[0].name).to.equal('example.json')
        })  
    })
      
    //Lidando com links que abrem em outra aba
    //have.attr- siginificar pegar o atreibuto do valor
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
      cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()
      cy.contains('Talking About Testing').should('be.visible')
    })
 
    
  })   
  

 