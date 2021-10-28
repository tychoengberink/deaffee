const TOKEN_KEY = "access_token";

describe("Home", function() {
  beforeEach(() => {
    cy.login();
  });

  it("renders", function() {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");
    cy.contains("ion-title", "Welcome ");
    cy.wait("@getTables");
  });

  it("renders table list", function() {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");

    cy.contains("ion-title", "Welcome ");

    cy.wait("@getTables");

    cy.contains("ion-list ion-item", "1");
  });

  it("logs out", () => {
    cy.login();

    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");

    cy.contains("ion-title", "Welcome").should(() => {
      // eslint-disable-next-line
      expect(localStorage.getItem(TOKEN_KEY)).to.eq("12345678");
    });

    cy.get("[data-cy=lockButton]").click();

    cy.contains("ion-label", "Your pincode").should(() => {
      // eslint-disable-next-line
      expect(localStorage.getItem(TOKEN_KEY)).to.be.null;
    });
  });
});
