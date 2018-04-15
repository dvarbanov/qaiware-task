// End to End test based on ./test-scenarios/HotelBooking_scenario.txt

const guestName = 'Test';
const guestEmail = 'test@test.com';
const location = 'Dubai';

const homepageSearch = '.herobg';
const locationField = '.select2-choice';
const datePicker = '.datepicker.dropdown-menu';
const submitButton = 'button[type="submit"]';
const invoice = '#invoiceTable';
const payNowButton = 'button[aria-controls="pay"]'
const paymentForm = '.well'
const paymentFormLabel = '#myModalLabel'

const inputFirstName = 'input[placeholder="First Name"]'
const inputLastName = 'input[placeholder="Last Name"]'
const inputEmail = 'input[placeholder="Email"]'
const inputConfirmEmail = 'input[placeholder="Confirm Email"]'

module.exports = {
  before: (client) => {
    client
      .url(client.launchUrl)
      .waitForElementVisible(homepageSearch)
  },
  after: (client) => {
    client.end();
  },

  'Hotel Booking' : (client) => {
    client
    // Scenario: Guest can search for a Hotel by specific criteria
      // Set values on homepage Hotels search form
      .click(locationField)
      .setValue(locationField, location)
      .waitForElementVisible('.select2-result-sub')
      .click('.select2-match')
      .setValue('#adults', '1')
      .setValue('#child', '1')
      // Set future date for Check in
      .click('input[name="checkin"]')
      .waitForElementVisible(datePicker)
      .click(`${datePicker} .next`)
      .click(`${datePicker} .day:last-child`)
      // Check out is auto prefilled with the day after Check in
      .click('.btn-danger') // Button "Search"
      .waitForElementVisible('.bgwhite') // List with found Hotels
      .assert.containsText('.mob-trip-info-head', location.toUpperCase())

    // Scenario: Guest can see the Details of a listed Hotel
      .click('.center-block') // Thumbnail of the first found Hotel
      .waitForElementVisible('#ROOMS') // Section "Available rooms"

    // Scenario: Guest can choose an available room to book
      .moveToElement(submitButton, 1, 1)
      .waitForElementVisible(submitButton)
      .click(submitButton) // Button "Book Now"

    // Scenario: Guest can book a hotel room via form "Book as a guest"
      .waitForElementVisible('#guestform')
      .setValue(inputFirstName, guestName)
      .setValue(inputLastName, guestName)
      .setValue(inputEmail, guestEmail)
      .setValue(inputConfirmEmail, guestEmail)
      .moveToElement(submitButton, 1, 1)
      .click(submitButton) // Button "Confirm this booking"
      .waitForElementVisible(invoice) // Checks that invoice is created
      .assert.containsText(invoice, guestName.toUpperCase())
      .assert.containsText(invoice, location)
    // Scenario: Guest can pay his booking online
      .click(payNowButton)
      .waitForElementVisible(paymentForm)
      .assert.containsText(paymentFormLabel, 'Select Payment Method')
  },
};
