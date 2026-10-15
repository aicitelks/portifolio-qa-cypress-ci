describe("API - Registro de usuário", () => {
  it("não permite registrar um e-mail já cadastrado", () => {
    const apiUrl = Cypress.expose("apiUrl");

    cy.fixture("newUser").then((user) => {
      cy.env(["userEmail2"]).then(({ userEmail2 }) => {
        cy.request({
          method: "POST",
          url: `${apiUrl}/users/register`,
          body: {
            ...user,
            email: userEmail2,
          },
          failOnStatusCode: false,
        }).then((response) => {
          const { status } = response;
          expect(status).to.eq(422);
        });
      });
    });
  });
});
