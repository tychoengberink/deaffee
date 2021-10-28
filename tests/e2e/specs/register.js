// https://docs.cypress.io/api/introduction/api.html

const faker = require("faker");

describe("Register", () => {
  it("renders", () => {
    cy.visit("/register");
    cy.contains("ion-title", "We need your firstname");
  });

  it("registers using correct data", () => {
    cy.register();

    cy.fixture("getTables").then((json) => {
      cy.intercept("GET", "/api/table", json).as("getTables");
    });

    cy.contains("ion-title", "Welcome " + name);
  });

  it("throws unique error", () => {
    let name = faker.name.firstName();
    let code = faker.datatype.number({ min: 1000, max: 9999 });

    cy.visit("/register");
    cy.get("[data-cy=name]>input").type(name);

    cy.get('input[name="pin"]')
      .click()
      .type(code);

    cy.get('input[name="confirmPin"]')
      .click()
      .type(code);

    cy.get("ion-button").click();

    cy.intercept("POST", "/api/user", {
      statusCode: 500,
      body: {
        name: name,
        username: name,
        role_id: 1,
        id: faker.datatype.number(),
      },
    }).as("createUser");

    cy.contains("ion-text", "Name is not unique!");
  });

  it("throws empty error", () => {
    cy.visit("/register");

    cy.get("ion-button").click();

    cy.contains("ion-text", "Name is required");
    cy.contains("ion-text", "Pin is required");
    cy.contains("ion-text", "confirmPin is required");
  });

  it("throws not the same error", () => {
    let name = faker.name.firstName();
    let code = faker.datatype.number({ min: 1000, max: 9999 });
    let code2 = faker.datatype.number({ min: 1000, max: 9999 });

    cy.visit("/register");
    cy.get("[data-cy=name]>input").type(name);

    cy.get('input[name="pin"]')
      .click()
      .type(code);

    cy.get('input[name="confirmPin"]')
      .click()
      .type(code2);

    cy.get("ion-button").click();
    cy.contains("ion-text", "Pin and confirmPin need to be the same");

    cy.get("[data-cy=errorSame]").should( "to.have.length", 2);
  });
});
