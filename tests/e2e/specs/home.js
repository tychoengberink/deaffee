describe("Home", function() {
  beforeEach(() => {
    cy.login();
  });

  it("renders", function() {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");
    cy.contains("ion-title", "Welcome ");
    cy.wait("@getTables");
  });

  it("renders home list", function() {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");

    cy.contains("ion-title", "Welcome ");

    cy.wait("@getTables");

    cy.contains("ion-list ion-item", "1");
  });
});
