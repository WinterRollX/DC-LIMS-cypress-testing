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