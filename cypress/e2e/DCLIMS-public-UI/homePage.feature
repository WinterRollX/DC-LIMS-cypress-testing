Feature: Home page legislation category selection feature

    Rule: Core legislation type

        Background: Visit DC LIMS home page
            Given I am on DC LIMS home page

        Scenario: Able to specify the legislation category for the search by using the dropdown
            When I click the legislation category dropdown
            And Select "<legislationCategory>" category from the dropdown options
            Then I should be able to see the legislation category has been changed to "<legislationCategory>"
            And I can type the "<searchKeyword>" into the search input, submit, and jump to search result page

            Examples:
                | legislationCategory                 | searchKeyword |
                | Agenda                              | Health        |
                | Bill                                | House         |
                | Contract                            | safty         |
                | Grant Budget Modification           | Health        |
                | Housing Finance Agency              | Health        |
                | Oversight Hearing/Roundtable Notice | Health        |
                | Oversight Hearing/Roundtable Record | Health        |
                | Report                              | Health        |
                | Reprogramming                       | Health        |
                | Resolution                          | Health        |