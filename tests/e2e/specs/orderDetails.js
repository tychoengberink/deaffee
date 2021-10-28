describe("Order Details", function() {
    beforeEach(() => {
      cy.login();
    });
  
it("opens order", function() {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");

    cy.intercept("GET", "/api/table/1", { fixture: "getTable" }).as("getTable");

    cy.intercept("GET", "/api/order/1", { fixture: "getOrder1" }).as(
      "getOrder"
    );

    cy.wait("@getTables");

    cy.contains("ion-title", "Welcome ");

    cy.contains("ion-list ion-item", "1");

    cy.get("ion-list ion-item")
      .first()
      .click();

    cy.wait("@getTable");

    cy.contains("ion-list ion-item ion-label", "Order 1").click();

    cy.wait("@getOrder");

    cy.contains("ion-title", "Order 1 (15252)");

    cy.get("[data-cy=removeProductButton]").should("exist");
    cy.get("[data-cy=editProductButton]").should("exist");
  });

  it("opens closed order", function() {
    cy.intercept("GET", "/api/table", { fixture: "getTables" }).as("getTables");

    cy.intercept("GET", "/api/table/1", { fixture: "getTable" }).as("getTable");

    cy.intercept("GET", "/api/order/1", { fixture: "getOrder1Closed" }).as(
      "getOrder"
    );

    cy.wait("@getTables");

    cy.contains("ion-title", "Welcome ");

    cy.contains("ion-list ion-item", "1");

    cy.get("ion-list ion-item")
      .first()
      .click();

    cy.wait("@getTable");

    cy.contains("ion-list ion-item ion-label", "Order 1").click();

    cy.wait("@getOrder");

    cy.contains("ion-title", "Order 1 (15252)");

    cy.get("[data-cy=removeProductButton]").should("not.exist");
    cy.get("[data-cy=editProductButton]").should("not.exist");
  });
});