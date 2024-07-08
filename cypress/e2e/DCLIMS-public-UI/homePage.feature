Feature: Home page legislation category selection feature

    Scenario: Able to specify the legislation category for the search by using the dropdown
        Given I am on DC LIMS home page
        When I click the legislation category dropdown
        And Select "<legislationCategory>" category from the dropdown options
        Then I should be able to see the legislation category has been changed to "<legislationCategory>"

        Examples:
            | legislationCategory                 |
            | Agenda                              |
            | Bill                                |
            | Contract                            |
            | Grant Budget Modification           |
            | Housing Finance Agency              |
            | Oversight Hearing/Roundtable Notice |
            | Oversight Hearing/Roundtable Record |
            | Report                              |
            | Reprogramming                       |
            | Resolution                          |