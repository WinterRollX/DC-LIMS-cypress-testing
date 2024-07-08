import { selectLegistionCategory, verifyLegislationCategoryText, verifyLegislationCategoryTextNotExist } from "../../support/componentsFunctions";

describe('DC LIMS home page testing', () => {

    it('The DC LIMS public page should load', () => {
        cy.visit("/");
        cy.get("h1").first().as("h1Header");
        cy.get("@h1Header").should("be.visible");
        cy.get("@h1Header").should("contain.text", "Legislative Information Management System (LIMS)");
    })

    it('The whatsNew list should be empty when API returns empty results', () => {
        // Intercept the API request
        cy.intercept('GET', '**/api/Search/GetWhatsNew', (req) => {
            // Modify the response
            req.reply((res) => {
                res.send([]);
            });
        }).as('getWhatsNew');
        cy.visit("/");
        cy.wait("@getWhatsNew");
        cy.contains(".section__head", "What’s New").siblings().first().should("contain.text", "There were no Introductions in the last seven days.");
    })

    it('The whatsNew list should not empty when API returns non-empty results', () => {
        // Intercept the API request
        cy.intercept('GET', '**/api/Search/GetWhatsNew', (req) => {
            // Modify the response
            req.reply((res) => {
                res.send(res);
            });
        }).as('getWhatsNew');
        cy.visit("/");
        cy.wait("@getWhatsNew");
        cy.contains(".section__head", "What’s New").siblings().first().should("not.contain.text", "There were no Introductions in the last seven days.");
    })

    it("The catrgory dropdown should let user choose a category", () => {
        // should intercept master data call and check the data from URL: https://lims.dccouncil.gov/api/Search/GetSearchMaster
        cy.intercept('GET', '**/api/Search/GetSearchMaster', (req) => {
            // Check the response
            req.reply((res) => {
                const masterPayload = res.body;
                const propertyList = Object.getOwnPropertyNames(masterPayload);
                const masterData = masterPayload["masterData"] || {};
                const legislationCategoryMaster = masterData["legislationCategory"] || [];                
                expect(propertyList.length).greaterThan(0);
                expect(legislationCategoryMaster.length).greaterThan(0);
                res.send(res);
            });
        }).as('getMasterData');
        cy.visit("/");
        cy.wait("@getMasterData");
        
        // Check legislation category dropdown default state
        cy.findAllByRole("listbox").filter(`div[for="search_legislation_input"]`).first().should("exist").as("categoryDropdownTrigger");
        cy.get("@categoryDropdownTrigger").should("contain.text", "All Categories");

        // Agenda category should be selected
        selectLegistionCategory("Agenda");
        verifyLegislationCategoryText("Agenda");
        verifyLegislationCategoryTextNotExist("All Categories");
        
        // Bill category should be selected
        selectLegistionCategory("Bill");
        verifyLegislationCategoryText("Bill");
        verifyLegislationCategoryTextNotExist("Agenda");
    });
})