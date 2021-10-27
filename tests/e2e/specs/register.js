// https://docs.cypress.io/api/introduction/api.html

const faker = require("faker");

describe("Register", () => {
  it("renders register", () => {
    cy.visit("/register");
    cy.contains("ion-title", "We need your firstname");
  });

  it("registers using correct data", () => {
    let name = faker.name.firstName();
    let code = faker.datatype.number({ min: 1000, max: 9999 });

    cy.visit("/register");
    cy.get('[data-cy=name]>input').type(name);
    cy.get('input[name="pin"]').click().type(code);
    cy.get('input[name="confirmPin"]').click().type(code);

    cy.get("ion-button").click();

    cy.intercept('POST', '/api/user', {
      statusCode: 201,
      body: {
        name: name,
        username: name,
        role_id: 1,
        id: faker.datatype.number(),
      },
    }).as('createUser');

    cy.intercept('POST', '/oauth/token', {
      statusCode: 200,
      body: {
          access_token: faker.random.uuid(),
          refresh_token: faker.random.uuid(),
      },
    }).as('loginUser');

    cy.contains("ion-title", "Welcome " + name);
  });

  // it("Logs in unsucessfully", () => {
  //   cy.visit("/login");
  //   cy.get("input").type();
  //   cy.get("ion-button").click();
  //   cy.contains("ion-text", "Code is required");
  // });
});
