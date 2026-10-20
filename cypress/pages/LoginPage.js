class LoginPage {
  visit() {
    cy.visit("/auth/login");
  }

  get form() {
    return cy.get('[data-test="login-form"]');
  }

  get emailInput() {
    return cy.get('[data-test="email"]');
  }

  get passwordInput() {
    return cy.get('[data-test="password"]');
  }

  get submitButton() {
    return cy.get('[data-test="login-submit"]');
  }

  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password, { log: false });
    this.submitButton.click();
  }
}

module.exports = new LoginPage();
