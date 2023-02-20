// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
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
      .type('teste')
      //.should('have.value','o telefone não está pegando')    
  //clicando no botão enviar
    cy.contains('button[type="submit"]','Enviar')
      .click()
  //validando mensagem de sucesso
    cy.get('.success > strong')
      .should('be.visible')
    
    

})