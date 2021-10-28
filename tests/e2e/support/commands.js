// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// import { Storage } from '@ionic/storage';
// const storage = new Storage;

const faker = require("faker");
const ISNOTFIRSTTIME = "first_time";
const USERNAME_KEY = "userName";


Cypress.Commands.add("login", () => {
  cy.fixture("postLogin").then((json) => {
    cy.intercept("POST", "/oauth/token", json).as("loginUser");
  });

  let name = faker.name.firstName();
  let code = faker.datatype.number({ min: 1000, max: 9999 });

  localStorage.setItem(USERNAME_KEY, name);
  localStorage.setItem(ISNOTFIRSTTIME, true);

  cy.visit("/login");

  cy.get("[data-cy=password]>input").type(code);

  cy.get("ion-button").click();
});

Cypress.Commands.add("register", () => {
  cy.fixture("postRegister").then((json) => {
    cy.intercept("POST", "/api/user", json).as("createUser");
  });

  cy.fixture("postLogin").then((json) => {
    cy.intercept("POST", "/oauth/token", json).as("loginUser");
  });

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
});
