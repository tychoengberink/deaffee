// https://docs.cypress.io/api/introduction/api.html
const faker = require("faker");
const ISNOTFIRSTTIME = "first_time";
const USERNAME_KEY = "userName";
const TOKEN_KEY = "access_token";

describe("Login", () => {
  it("renders", () => {
    cy.visit("/login");
    cy.contains("ion-label", "Your pincode");
  });

  it("succeeds", () => {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");
    cy.login();

    cy.contains("ion-title", "Welcome").should(() => {
      // eslint-disable-next-line
      expect(localStorage.getItem(TOKEN_KEY)).to.eq("12345678");
    });
  });

  it("fails with wrong credentials", () => {
    cy.fixture("postWrongLogin").then((json) => {
      cy.intercept("POST", "/oauth/token", json).as("loginWrongPin");
    });

    let name = faker.name.firstName();
    let code = faker.datatype.number({ min: 1000, max: 9999 });

    localStorage.setItem(USERNAME_KEY, name);
    localStorage.setItem(ISNOTFIRSTTIME, true);

    cy.visit("/login");

    cy.get("[data-cy=password]>input").type(code);

    cy.get("ion-button").click();

    cy.wait("@loginWrongPin")

    cy.contains("ion-text", "Pincode is wrong!");
  });

  it("fails without input", () => {
    let name = faker.name.firstName();

    localStorage.setItem(USERNAME_KEY, name);
    localStorage.setItem(ISNOTFIRSTTIME, true);

    cy.visit("/login");

    cy.get("ion-button").click();

    cy.contains("ion-text", "Pincode cant be empty!");
  });

  it("fails with letter input", () => {
    let name = faker.name.firstName();
    let code = faker.lorem.word();

    localStorage.setItem(USERNAME_KEY, name);
    localStorage.setItem(ISNOTFIRSTTIME, true);

    cy.visit("/login");
    cy.get("[data-cy=password]>input").type(code);

    cy.get("ion-button").click();

    cy.contains("ion-text", "Pincode needs to be a number!");
  });
});
