/** O comando recebe os nomes das chaves do cypress.env.json ("userEmail3", não o e-mail em si).
 * Assim as credenciais continuam passando pelo cy.env() e nunca aparecem no código nem no log.
 * Ele devolve o cabeçalho de autorização pronto. */
Cypress.Commands.add("apiLogin", (emailKey, passwordKey) => {
  const apiUrl = Cypress.expose("apiUrl");

  cy.env([emailKey, passwordKey]).then((credentials) => {
    cy.request({
      method: "POST",
      url: `${apiUrl}/users/login`,
      body: {
        email: credentials[emailKey],
        password: credentials[passwordKey],
      },
      log: false,
    }).then((response) => {
      const { body } = response;
      return { Authorization: `Bearer ${body.access_token}` };
    });
  });
});
