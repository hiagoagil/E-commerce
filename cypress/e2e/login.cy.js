import { faker } from '@faker-js/faker';

describe('Teste de login', () => {
  var usuario = {
    username: faker.internet.email(),
    password: faker.internet.password(),
  };

  it('Criando credenciais válidas e verificando o primeiro parágrafo', () => {
    cy.visit('minha-conta'); // Acessa o login
    cy.get('#reg_email').type(usuario.username); // Cria email fake para cadastro
    cy.get('#reg_password').type(usuario.password); // Cria senhas fake para cadastro 
    cy.get('input[class="button"][value="Register"]').click(); // Utilizando seletor  por meio da classe e valor
    cy.get('.woocommerce-MyAccount-content p:nth-child(2)') //  pseudo-seletor CSS utilizado para acessar o segundo filho do elemento p
      .invoke('text') // invocar o texto no elemento   
      .then(text => { 
        const nomeUsuario = usuario.username.split('@')[0]; // Divide o elemento em dois, e seleciona o índice 0
        const regex = new RegExp(nomeUsuario.toLowerCase(), 'g'); // Faz a variável nomeUsuario de parametro utilizando regex + toLowerCase() para transformar tudo em minúsculo. O ''g' garante que todas as ocorrencias sejam encontradas
        const textoFormatado = text.replace(regex, nomeUsuario); // Replica já com a letra maiúscula
        return textoFormatado.trim(); // Retorna o texto formado sem espaço antes e depois da strinh
      })
      .should('equal', `Olá, ${usuario.username.split('@')[0]} (não é ${usuario.username.split('@')[0]}? Sair)`);
  }); // Verifica apenas o que vem antes do @ na frase de "boas vindas" por meio de interpolação que ocorre no texto com a string.
});

