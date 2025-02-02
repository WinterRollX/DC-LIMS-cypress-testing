import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { clickLegislationCategory, selectLegistionCategoryOptionByText, verifyLegislationCategoryText } from "../../support/componentsFunctions";

Given('I am on DC LIMS home page', function () {
  // Code to navigate to the DC LIMS home page
  cy.intercept('GET', '**/api/Search/GetSearchMaster').as('getMasterData');
  cy.visit("/");
  cy.wait("@getMasterData");
  cy.get("h1").first().as("h1Header");
  cy.get("@h1Header").should("be.visible");
  cy.get("@h1Header").should("have.text", "Legislative Information Management System (LIMS)");
});

Given("I registered as a developer", function () {
  cy.request("POST", "https://lims.dccouncil.gov/api/v2/PublicData/PublicRegistration", {
    email: "winterrollxp+3@gmail.com",
    name: "Zhongmian Wang",
    organization: ""
  }).then((response: Cypress.Response<any>)=>{
    expect(response.status).to.equal(200);
    expect(response).to.have.property('duration')
  });
});

When('I click the legislation category dropdown', function () {
  // Code to click the legislation category dropdown
  clickLegislationCategory();
});

When('Select {string} category from the dropdown options', function (legislationCategory: string) {
  // Code to select the specified category from the dropdown options
  selectLegistionCategoryOptionByText(legislationCategory);
});

Then('I should be able to see the legislation category has been changed to {string}', function (legislationCategory: string) {
  // Code to verify the legislation category has been changed to the specified category
  verifyLegislationCategoryText(legislationCategory);
});

Then('II can type the "{string}" into the search input, submit, and jump to search result page', function (searchKeyword: string) {
  // Type the search keyword into the search input and click search button
  cy.get("#search_legislation_input").as("searchLegislationInput");
  cy.get("@searchLegislationInput").clear().type(searchKeyword);
  cy.get("#search-button").click();
  cy.url().then((currURL: string)=>{
    expect(currURL).to.contain("searchresult");
  });
});