describe("Settings", function() {
  beforeEach(() => {
    cy.login();
  });

  it("renders", function() {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");
    cy.wait("@getTables");

    cy.contains("ion-title", "Welcome ");

    cy.get("[data-cy=settingsButton]").click();

    cy.contains("ion-title", "Settings");
  });

  it("closes", function() {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");
    
    cy.contains("ion-title", "Welcome ");

    cy.get("[data-cy=settingsButton]").click();

    cy.contains("ion-title", "Settings");

    cy.get("ion-back-button").click();

    cy.contains("ion-title", "Welcome ");
  });
});
