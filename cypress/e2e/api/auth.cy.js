describe("API - Autenticação de Usuário", () => {
  it("faz login com um usuário comum e acessa o próprio perfil", () => {
    const apiUrl = Cypress.expose("apiUrl");

    cy.env(["userEmail", "userPassword"]).then(
      ({ userEmail, userPassword }) => {
        cy.request({
          method: "POST",
          url: `${apiUrl}/users/login`,
          body: { email: userEmail, password: userPassword },
          log: false,
        }).then((response) => {
          const { status, body } = response;
          expect(status).to.eq(200);
          expect(body).to.have.property("access_token");

          cy.request({
            method: "GET",
            url: `${apiUrl}/users/me`,
            headers: {
              Authorization: `Bearer ${body.access_token}`,
            },
            log: false,
          }).then((profileResponse) => {
            const { status: profileStatus, body: profile } = profileResponse;
            expect(profileStatus).to.eq(200);
            expect(profile.email).to.eq(userEmail);
          });
        });
      },
    );
  });
});
