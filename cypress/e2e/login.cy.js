import { faker } from '@faker-js/faker';

describe('Realizando teste de login', () => {


    it('Criando credenciais válidas', () => {
        var usuario = {
            username: faker.internet.email().toLowerCase(),
            password: faker.internet.password(),
        };
        cy.visit('minha-conta'); // Acessa o login
        cy.get('#reg_email').type(usuario.username); // Cria email fake para cadastro com letra minus
        cy.get('#reg_password').type(usuario.password); // Cria senhas fake para cadastro 
        cy.get('input[class="button"][value="Register"]').click(); // Utilizando seletor  por meio da classe e valor
        cy.get('.woocommerce-MyAccount-content p:first')
            .invoke('text')
            .then(text => text.trim())
            .should('equal', `Olá, ${usuario.username.split('@')[0]} (não é ${usuario.username.split('@')[0]}? Sair)`);
    })

    it('Criando credenciais que não conferem com a mensagem de entrada da aplicação ', () => {
        var usuario = {
            username: faker.internet.email(),
            password: faker.internet.password(),
        };
        cy.visit('minha-conta'); // Acessa o login
        cy.get('#reg_email').type(usuario.username); // Cria email fake para cadastro com letra minus
        cy.get('#reg_password').type(usuario.password); // Cria senhas fake para cadastro 
        cy.get('input[class="button"][value="Register"]').click(); // Utilizando seletor  por meio da classe e valor
        cy.get('.woocommerce-MyAccount-content p:first')
            .invoke('text')
            .then(text => text.trim())
            .should('equal', `Olá, ${usuario.username.split('@')[0]} (não é ${usuario.username.split('@')[0]}? Sair)`);
    })

});