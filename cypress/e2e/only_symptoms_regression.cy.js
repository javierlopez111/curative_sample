describe('User is able to get to the scheduling page', () => {

    beforeEach(() => {

        // Visits URL and check the first date and time on the corresponding lists

        cy.visit('https://staging-book.curative.com/sites/200')
    });


    it('Check to make sure the Continue button is enabled for the right reasons to make appointment', () => {

        cy.get('[data-testid=BookingSectionHeader]')
            .siblings('.curative-klhi01')
            .get('.ea5nwyu3')
            .first().click()

        cy.get('.curative-klhi01.e8d4svw1')
            .get('button.curative-1g5iclv')
            .first().click()

        // RT-PCR test for COVID-19
        // 1 Hour Antigen test for COVID-19
        cy.get('[aria-label="RT-PCR test for COVID-19"]').click()
        cy.get('[type="submit"]').click()


        // Myself
        // My Child(ren)

        cy.get('.checkbox-label').contains('Myself').click()
        cy.get('#continue').click()

        cy.get('[name="patientNames[0].firstName"]').type('Javier')
        cy.get('[name="patientNames[0].lastName"]').type('Lopez')
        cy.get('#continue').click()

        // checks to make sure the Continue button is enabled for all the right reasons

        cy.get('.checkbox-label').each(($box, index, $list) =>{
            if ($box.text() != 'None of the above') {
                cy.wrap($box).click()
                cy.get('#continue').should('be.enabled')
                cy.wrap($box).click()
                cy.get('#continue').should('not.be.enabled')
            }
        })

        // Checks to make sure the warning text is visible
        cy.get('.checkbox-label')
            .contains('None of the above')
            .click()
        cy.get('.curative-n2ekye')
            .contains('This testing site only accepts symptomatic patients.')
            .should('be.visible')
            .and('have.css', '-webkit-text-fill-color', 'rgb(184, 51, 42)')
        cy.get('.checkbox-label')
            .contains('Diarrhea')
            .should('not.be.enabled')

    });


    it('User is able to schedule an appointment successfully for RT-PCR test option', () => {

        cy.get('[data-testid=BookingSectionHeader]')
            .siblings('.curative-klhi01')
            .get('.ea5nwyu3')
            .first().click()

        cy.get('.curative-klhi01.e8d4svw1')
            .get('button.curative-1g5iclv')
            .first().click()

        // RT-PCR test for COVID-19
        // 1 Hour Antigen test for COVID-19
        cy.get('[aria-label="RT-PCR test for COVID-19"]').click()
        cy.get('[type="submit"]').click()


        cy.get('.checkbox-label').contains('Myself').click()
        cy.get('#continue').click()

        cy.get('[name="patientNames[0].firstName"]').type('James')
        cy.get('[name="patientNames[0].lastName"]').type('Bond')
        cy.get('#continue').click()
        cy.get('.checkbox-label')
            .contains('Cough')
            .click()
        cy.get('#continue').click()

        cy.get('[data-testid="date-input"]').get('[placeholder="MM/DD/YYYY"]').type('11/01/2022')
        cy.get('#continue').click()

        cy.get('[name="vaccinationStatus"]')
            .contains('Yes- 2 or more Moderna/Pfizer doses, 1 or more J&J dose, other brand')
            .click()
        cy.get('#continue').click()

        cy.get('[name="employmentCategory"]').contains('Education').click()
        cy.get('#continue').click()
        cy.get('h1').contains('Let’s book your appointment now')
    })


    it('User is able to schedule an appointment successfully for RT-PCR test option and Child(ren)', () => {

        cy.get('[data-testid=BookingSectionHeader]')
            .siblings('.curative-klhi01')
            .get('.ea5nwyu3')
            .first().click()

        cy.get('.curative-klhi01.e8d4svw1')
            .get('button.curative-1g5iclv')
            .first().click()

        // RT-PCR test for COVID-19
        // 1 Hour Antigen test for COVID-19
        cy.get('[aria-label="RT-PCR test for COVID-19"]').click()
        cy.get('[type="submit"]').click()


        cy.get('.checkbox-label').contains('My Child(ren)').click()
        cy.get('#continue').should('not.be.enabled')
        cy.get('.checkbox-label')
            .contains('I verify that all children are under the age of 18. ' +
                '(Children 18+ must book their own appointments.)')
            .click()
        cy.get('#continue').click()

        cy.get('#appointmentQuantity').click()
        cy.get('#react-select-2-option-0').click()
        cy.get('#continue').click()

        cy.get('[name="patientNames[0].firstName"]').type('a,.&( )-#*"')
        cy.get('[name="patientNames[0].lastName"]').type('Blah')
        cy.get('#continue').click()
        cy.get('.checkbox-label')
            .contains('Headache')
            .click()
        cy.get('#continue').click()

        cy.get('[data-testid="date-input"]').get('[placeholder="MM/DD/YYYY"]').type('11/01/2022')
        cy.get('#continue').click()

        cy.get('[name="vaccinationStatus"]')
            .contains('Prefer not to share')
            .click()
        cy.get('#continue').click()

        cy.get('[name="employmentCategory"]').contains('Education').click()
        cy.get('#continue').click()
        cy.get('h1').contains('Let’s book your appointment now')
    })




    it('User is able to schedule an appointment successfully for 1 Hour Antigen test option', () => {

        cy.get('[data-testid=BookingSectionHeader]')
            .siblings('.curative-klhi01')
            .get('.ea5nwyu3')
            .first().click()

        cy.get('.curative-klhi01.e8d4svw1')
            .get('button.curative-1g5iclv')
            .first().click()

        // RT-PCR test for COVID-19
        // 1 Hour Antigen test for COVID-19
        cy.get('[aria-label="1 Hour Antigen test for COVID-19"]').click()
        cy.get('[type="submit"]').click()

        cy.get('[name="patientNames[0].firstName"]').type('John')
        cy.get('[name="patientNames[0].lastName"]').type('Lennon')
        cy.get('#continue').click()
        cy.get('.checkbox-label')
            .contains('Fatigue')
            .click()
        cy.get('#continue').click()

        cy.get('[data-testid="date-input"]').get('[placeholder="MM/DD/YYYY"]').type('11/01/2022')
        cy.get('#continue').click()

        cy.get('[name="vaccinationStatus"]')
            .contains('Yes- 2 or more Moderna/Pfizer doses, 1 or more J&J dose, other brand')
            .click()
        cy.get('#continue').click()

        cy.get('[name="employmentCategory"]').contains('Education').click()
        cy.get('#continue').click()
        cy.get('h1').contains('Let’s book your appointment now')
    })

    it('User is able to schedule an appointment successfully for RT-PCR test option, ' +
        'myself and children', () => {

        cy.get('[data-testid=BookingSectionHeader]')
            .siblings('.curative-klhi01')
            .get('.ea5nwyu3')
            .first().click()

        cy.get('.curative-klhi01.e8d4svw1')
            .get('button.curative-1g5iclv')
            .first().click()

        // RT-PCR test for COVID-19
        // 1 Hour Antigen test for COVID-19
        cy.get('[aria-label="RT-PCR test for COVID-19"]').click()
        cy.get('[type="submit"]').click()

        cy.get('.checkbox-label').contains('Myself').click()
        cy.get('.checkbox-label').contains('My Child(ren)').click()
        cy.get('.checkbox-label')
            .contains('I verify that all children are under the age of 18. ' +
                '(Children 18+ must book their own appointments.)')
            .click()
        cy.get('#continue').click()

        cy.get('#appointmentQuantity').click()
        cy.get('#react-select-2-option-0').click()
        cy.get('.checkbox-label')
            .contains('I verify that all patients have insurance and the same home address and ' +
                'contact information.')
            .click()
        cy.get('#continue').click()

        cy.get('[name="patientNames[0].firstName"]').type('The')
        cy.get('[name="patientNames[0].lastName"]').type('Exorcist')
        cy.get('[name="patientNames[1].firstName"]').type('Regan')
        cy.get('[name="patientNames[1].lastName"]').type('Regan')
        cy.get('#continue').click()

        cy.get('.checkbox-label')
            .contains('New loss of smell')
            .click()
        cy.get('.checkbox-label')
            .contains('Vomiting')
            .click()

        cy.get('#continue').click()

        cy.get('[data-testid="date-input"]').get('[placeholder="MM/DD/YYYY"]').type('11/01/2022')
        cy.get('#continue').click()

        cy.get('[name="vaccinationStatus"]')
            .contains('Yes- 2 or more Moderna/Pfizer doses, 1 or more J&J dose, other brand')
            .click()
        cy.get('#continue').click()

        cy.get('[name="employmentCategory"]').contains('Education').click()
        cy.get('#continue').click()
        cy.get('h1').contains('Let’s book your appointment now')
    })










})