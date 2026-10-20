const homePage = require("../../pages/HomePage");

describe("Web - Lista de produtos", () => {
  beforeEach(() => {
    homePage.visit();
  });

  it("exibe produtos com nome e preço", () => {
    homePage.productCards.should("have.length.greaterThan", 0);

    homePage.productCards.each((card) => {
      cy.wrap(card).find('[data-test="product-name"]').should("not.be.empty");
      cy.wrap(card)
        .find('[data-test="product-price"]')
        .invoke("text")
        .should("match", /\d+[.,]\d{2}/);
    });
  });

  it("abre o detalhe ao clicar em um produto", () => {
    homePage.productCards.first().click();
    cy.url().should("include", "/product/");
  });
});
