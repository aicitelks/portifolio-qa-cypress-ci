class HomePage {
  visit() {
    cy.visit("/");
  }

  get productCards() {
    return cy.get('a.card[data-test^="product-"]');
  }
}

module.exports = new HomePage();
