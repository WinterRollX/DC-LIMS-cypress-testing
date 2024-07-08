
export function getLegislationCategoryDropdownText(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.findAllByRole("listbox").filter(`div[for="search_legislation_input"]`).first().children().filter("div[role='alert']").first();
}

export function verifyLegislationCategoryText(textExpected: string): void {
    getLegislationCategoryDropdownText().should("contain.text", textExpected);
}

export function verifyLegislationCategoryTextNotExist(textToCheck: string): void {
    getLegislationCategoryDropdownText().should("not.contain.text", textToCheck);
}

export function selectLegistionCategory (legislationCategoryToPick: string): void {
    cy.findAllByRole("listbox").filter(`div[for="search_legislation_input"]`).first().as("categoryDropdownTrigger");
    cy.get("@categoryDropdownTrigger").click();
    cy.findAllByRole("option").contains(legislationCategoryToPick).first().click();
}

export function clickLegislationCategory (): void {
    cy.findAllByRole("listbox").filter(`div[for="search_legislation_input"]`).first().as("categoryDropdownTrigger").click();
}

export function selectLegistionCategoryOptionByText(legislationCategoryToPick: string):void {
    cy.findAllByRole("option").contains(legislationCategoryToPick).first().click();
}