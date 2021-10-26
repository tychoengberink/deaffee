// https://docs.cypress.io/api/introduction/api.html

cy.server()
cy.route('/todos', [{
  title: 'mock first',
  completed: false,
  id: '1'
}, {
  title: 'mock second',
  completed: true,
  id: '2'
}])

describe("Login", () => {
  beforeEach(() => {
  });

  it("Renders login", () => {
    cy.visit("/login");
    cy.contains("ion-label", "Code");
  });

  it("Logs in using a code", () => {
    cy.visit("/login");
    cy.get("input").type(123);
    cy.get("ion-button").click();
    cy.contains("ion-title", "Welcome");
  });

  it("Logs in unsucessfully", () => {
    cy.visit("/login");
    cy.get("input").type();
    cy.get("ion-button").click();
    cy.contains("ion-text", "Code is required");
  });
});
