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
          expect(body.token_type).to.eq("bearer");
          expect(body.expires_in).to.be.a("number");

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
            expect(profile).to.have.property("id");
            expect(profile).to.not.have.property("password");
          });
        });
      },
    );
  });

  it("não permite login com credenciais inválidas", () => {
    const apiUrl = Cypress.expose("apiUrl");

    cy.env(["userEmail2"]).then(({ userEmail2 }) => {
      cy.request({
        method: "POST",
        url: `${apiUrl}/users/login`,
        body: { email: userEmail2, password: "wrongpassword" },
        failOnStatusCode: false,
        log: false,
      }).then((response) => {
        const { status, body } = response;
        expect(status).to.eq(401);
        expect(body).to.have.property("error");
        expect(body.error).to.include("Unauthorized");
      });
    });
  });
});

describe("API - Logout", () => {
  let authHeaders;

  beforeEach(() => {
    // Comando personalizado para fazer login e obter os cabeçalhos de autorização
    cy.apiLogin("userEmail3", "userPassword3").then((headers) => {
      authHeaders = headers;
    });
  });

  it("faz logout com um usuário autenticado", () => {
    const apiUrl = Cypress.expose("apiUrl");

    cy.request({
      method: "GET",
      url: `${apiUrl}/users/logout`,
      headers: authHeaders,
      log: false,
    }).then((response) => {
      const { status, body } = response;
      expect(status).to.eq(200);
      expect(body.message).to.eq("Successfully logged out");
    });
  });

  it("invalida o token após o logout", () => {
    const apiUrl = Cypress.expose("apiUrl");

    cy.request({
      method: "GET",
      url: `${apiUrl}/users/logout`,
      headers: authHeaders,
      log: false,
    }).then(() => {
      cy.request({
        method: "GET",
        url: `${apiUrl}/users/me`,
        headers: authHeaders,
        failOnStatusCode: false,
        log: false,
      }).then((response) => {
        const { status } = response;
        expect(status).to.eq(401);
      });
    });
  });
});
