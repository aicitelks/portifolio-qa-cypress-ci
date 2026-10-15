# Portfólio QA Cypress CI

Este projeto contém automações de testes com Cypress focadas em cenários de API, utilizando a API de demonstração [Practice Software Testing](https://practicesoftwaretesting.com).

## Objetivo

Validar fluxos críticos de autenticação e cadastro de usuários por meio de testes automatizados, com foco em:

- login de usuários
- autenticação com credenciais válidas e inválidas
- logout e invalidação de token
- tentativa de cadastro com e-mail já existente

## Stack

- Node.js
- npm
- Cypress 16

## Estrutura do projeto

```text
.
├── cypress/
│   ├── e2e/
│   │   ├── api/
│   │   │   ├── auth.cy.js
│   │   │   └── register.cy.js
│   ├── fixtures/
│   │   └── newUser.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── api-docs.json
├── cypress.config.js
├── cypress.env.example.json
├── cypress.env.json
├── package.json
├── readme.md
└── package-lock.json
```

## Pré-requisitos

Antes de iniciar, verifique se você possui instalado:

- Node.js 18+ (recomendado)
- npm
- navegador Chromium/Chrome disponível para execução local do Cypress

## Instalação

1. Clone o projeto
2. Acesse a pasta do repositório
3. Instale as dependências:

```bash
npm install
```

## Configuração de ambiente

O projeto utiliza credenciais em `cypress.env.json` para autenticar os testes.

1. Copie o exemplo:

```bash
cp cypress.env.example.json cypress.env.json
```

2. Preencha os valores do arquivo `cypress.env.json` com e-mails e senhas válidos para o ambiente de testes, por exemplo:

```json
{
  "userEmail": "usuario1@email.com",
  "userPassword": "senha123",
  "userEmail2": "usuario2@email.com",
  "userPassword2": "senha456",
  "userEmail3": "usuario3@email.com",
  "userPassword3": "senha789"
}
```

> O arquivo `cypress.env.example.json` contém a estrutura esperada dos dados de ambiente.

## Executando os testes

### Abrir a interface do Cypress

```bash
npm run cy:open
```

### Executar os testes em modo headless

```bash
npm run cy:run
```

### Executar um arquivo específico

```bash
npx cypress run --spec "cypress/e2e/api/auth.cy.js"
```

```bash
npx cypress run --spec "cypress/e2e/api/register.cy.js"
```

## Configuração do Cypress

O arquivo `cypress.config.js` define:

- largura e altura da viewport
- timeout padrão de comandos
- política de retry em execução
- URLs base da API expostas para uso nos testes

## Observações

- Os testes atuais estão concentrados em cenários de API.
- A URL base configurada no projeto aponta para a API pública do Practice Software Testing.
- Caso o ambiente da API mude, revise o arquivo `cypress.config.js` e o conteúdo de `cypress.env.json`.

## Como contribuir

1. Crie uma branch para a sua alteração
2. Implemente novos testes ou ajustes
3. Execute os testes localmente
4. Abra um pull request com a descrição da mudança

## Licença

Este projeto está sob a licença ISC.
