# 🧪 Portfólio QA: Automação com Cypress (API + Web)

![Cypress](https://github.com/aicitelks/portifolio-qa-cypress-ci/actions/workflows/cypress.yml/badge.svg)

Suíte de testes automatizados com **Cypress 16** cobrindo as camadas de **API** e **Web** do [Toolshop](https://practicesoftwaretesting.com), uma aplicação criada para treino de testes de software. O projeto roda em **CI com GitHub Actions** a cada push e foi construído simulando o jeito de trabalhar de um time real: separação entre camadas, Page Objects, credenciais em secrets e documentação de achados.

## 🎯 Sobre o projeto

- **Aplicação testada:** Toolshop (front-end em Angular e API REST), mantida pela Testsmith. É uma aplicação pública de treino, então as contas usadas são contas demo públicas.
- **Objetivo:** praticar e demonstrar automação de testes de API e de interface, integração com CI/CD e boas práticas de organização.
- **Contrato da API:** a documentação [Toolshop API](https://api.practicesoftwaretesting.com/api/documentation) foi usada como referência e comparada com o comportamento real (veja [Achados](#-achados-divergências-entre-documentação-e-api)).

## ✅ O que está coberto

### 🔌 API

| 📝 Cenário                                 | 🔗 Endpoint                          | 🎯 Resultado esperado                                                    |
| ------------------------------------------ | ------------------------------------ | ------------------------------------------------------------------------ |
| Login com usuário comum e acesso ao perfil | `POST /users/login`, `GET /users/me` | 200, token do tipo Bearer e perfil do próprio usuário, sem expor a senha |
| Login com credenciais inválidas            | `POST /users/login`                  | 401 com mensagem de erro                                                 |
| Logout                                     | `GET /users/logout`                  | 200 com mensagem de sucesso                                              |
| Token invalidado após o logout             | `GET /users/me`                      | 401                                                                      |
| Registro com e-mail já cadastrado          | `POST /users/register`               | 422 com erro no campo `email`                                            |

### 🖥️ Web

| 📝 Cenário              | 🎯 Resultado esperado                         |
| ----------------------- | --------------------------------------------- |
| Formulário de login     | Campos e botão visíveis                       |
| Login com usuário comum | Usuário é levado à área da conta              |
| Lista de produtos       | Produtos exibidos com nome e preço            |
| Detalhe do produto      | Clique em um produto abre a página de detalhe |

![Run finished](/docs/run-specs.png)

## 🛠️ Stack

- 🌲 [Cypress](https://www.cypress.io/) 16
- 🟨 JavaScript (Node.js 24)
- ⚙️ GitHub Actions
- 🐧 Desenvolvido no WSL (Ubuntu 22.04)

## 📁 Estrutura do projeto

```
.
├── .github/workflows/cypress.yml   # pipeline de CI
├── cypress/
│   ├── e2e/
│   │   ├── api/                    # testes de API
│   │   └── web/                    # testes de interface
│   ├── fixtures/                   # dados fixos de teste
│   ├── pages/                      # Page Objects (LoginPage, HomePage)
├── .gitignore
├── cypress.config.js
├── cypress.env.example.json        # modelo das credenciais
├── package-lock.json
├── package.json
└── README.md
```

## ▶️ Como rodar

**Pré-requisitos:** Node.js 18 ou superior e Git.

```bash
# 1. Clonar e instalar
git clone https://github.com/aicitelks/portifolio-qa-cypress-ci.git
cd portifolio-qa-cypress-ci
npm install

# 2. Criar o arquivo de credenciais (não é versionado)
cp cypress.env.example.json cypress.env.json
# preencha com as contas demo listadas no README do Toolshop

# 3. Executar
npm run test:api      # só testes de API
npm run test:web      # só testes de interface
npm run cy:run        # todos, em modo headless
npm run cy:open       # modo interativo
```

Preencha os valores do arquivo `cypress.env.json` com e-mails e senhas válidos para o ambiente de testes.

- **Users demos** listados na documentação oficial [estão aqui](https://testsmith-io.github.io/practice-software-testing/#/).

> O arquivo `cypress.env.example.json` contém a estrutura esperada dos dados de ambiente.

Modelo do `cypress.env.json`:

```json
{
  "userEmailAdmin": "",
  "userPasswordAdmin": "",
  "userEmail": "",
  "userPassword": "",
  "userEmail2": "",
  "userPassword2": "",
  "userEmail3": "",
  "userPassword3": ""
}
```

A URL da API não é segredo e fica em `cypress.config.js`, no bloco `expose`.

## 🚀 CI/CD

O workflow `.github/workflows/cypress.yml` roda a suíte completa a cada push na `main`, em pull requests e manualmente (`workflow_dispatch`).

- 🔐 **Credenciais:** um secret do GitHub por valor, entregue ao Cypress como variável de ambiente com prefixo `CYPRESS_` (por exemplo, o secret `USER_EMAIL` vira `CYPRESS_userEmail`). Evitei guardar um JSON inteiro como secret, pois a documentação do GitHub desaconselha dados estruturados nessa função.
- 🛡️ **Permissões mínimas:** `permissions: contents: read`.
- ⏱️ **Controle de execução:** `concurrency` cancela execuções antigas da mesma branch e `timeout-minutes` evita jobs travados.
- 📸 **Evidências:** screenshots são anexados ao run quando há falha.

## 🧠 Decisões técnicas

- 🌲 **Cypress 16:** o `Cypress.env()` foi removido. Valores públicos (URL da API) usam `Cypress.expose()` e valores sensíveis (credenciais) usam `cy.env()`, com `log: false` nas requisições que carregam senha ou token.
- 🧱 **Separação entre camadas:** testes de API validam o contrato (status e corpo). Testes web validam o que o usuário vê. Na interface, `cy.intercept` é usado apenas para sincronizar, nunca para repetir asserções de API.
- 🎯 **Seletores `data-test`:** a aplicação expõe atributos de teste. Evitei classes CSS genéricas. O seletor usado restringe a cards reais.
- 🧩 **Page Object:** `LoginPage` e `HomePage` isolam os seletores.
- 🧹 **Dados de teste sem poluição:** os testes usam as contas demo já existentes. O teste de e-mail duplicado reaproveita o e-mail de uma conta existente, então nenhum usuário novo é criado a cada execução.
- 📦 **Fixtures:** dados fixos (corpo de registro) ficam em `cypress/fixtures`. O e-mail vem das credenciais.
- 🧩 **Page Object e custom command:** LoginPage e HomePage isolam os seletores. O cy.apiLogin() centraliza o login por API nos testes em que ele é só pré-requisito. Nos testes do próprio login a chamada fica explícita.

## 🔎 Achados: divergências entre documentação e API

Ao comparar o contrato [Toolshop API](https://api.practicesoftwaretesting.com/api/documentation) com o comportamento real, encontrei divergências que foram mapeadas nas [Issues](https://github.com/aicitelks/portifolio-qa-cypress-ci/issues) do repositório.

## 🗺️ Próximos passos

- 📊 Relatório de resultados dos testes publicado no GitHub Pages
- 🏷️ Tags `@smoke` e `@regression` para executar subconjuntos
- 🛍️ Cenários de busca, carrinho e checkout, com login reaproveitado via `cy.session()`
- 🤖 Dependabot para manter dependências e actions atualizadas

---

<div align="center">

Desenvolvido com 💚, **Claude** e foco em qualidade por **Le Castro** 👩‍💻✨

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/leticiacastro87)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aicitelks)

</div>
