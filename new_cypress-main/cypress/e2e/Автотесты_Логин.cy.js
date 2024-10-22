import * as data from "../helpers/default_data.json"

describe('Проверка авторизации', function () {
    
    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
          });

    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
           });

    it('Верный логин и верный пароль', function () {
         cy.get('#mail').type(data.login);
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
     })

     it('Восстановление пароля', function () {
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type('german@dol.ru');
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
    })
 
     it('Верный логин и неверный пароль', function () {
         cy.get('#mail').type(data.login);
         cy.get('#pass').type('iLoveqastudio2');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Такого логина или пароля нет');
     })

     it('Неверный логин и верный пароль', function () {
        cy.get('#mail').type('german@dol.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })
 
     it('Валидация на наличие @', function () {
         cy.get('#mail').type('germandolnikov.ru');
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').should('be.visible');
         cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
     })

     it('Верный ЛоГиН и верный пароль', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type(data.password);
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
    })
 })
 