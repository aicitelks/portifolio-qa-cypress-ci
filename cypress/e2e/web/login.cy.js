const loginPage = require("../../pages/LoginPage");

describe("Web - Autenticação de usuário", () => {
  it("exibe o formulário de login", () => {
    loginPage.visit();

    loginPage.form.should("be.visible");
    loginPage.emailInput.should("be.visible");
    loginPage.passwordInput.should("be.visible");
    loginPage.submitButton.should("be.visible");
  });

  it("faz login com um usuário comum", () => {
    cy.intercept("POST", "**/users/login").as("login");

    cy.env(["userEmail3", "userPassword3"]).then(
      ({ userEmail3, userPassword3 }) => {
        loginPage.visit();
        loginPage.login(userEmail3, userPassword3);

        cy.wait("@login");

        cy.url().should("include", "/account");
      },
    );
  });
});
