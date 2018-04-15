// End to End test based on ./test-scenarios/SignUpOutIn_scenario.txt

const guestName = 'Test';
const guestEmail = `test@${Math.random()}.com`;
const guestPassword = 'test123';
const wrongPassword = 'test12'

const signUpForm = '.panel.panel-default';
const loginForm = '#loginfrm'
const signUpSubmitButton = '.signupbtn';
const loginSubmitButton = '.loginbtn'
const errorMessage = '.alert'
const body = '#body-section'
const bookingsSection = '#bookings'

const inputFirstName = 'input[placeholder="First Name"]'
const inputLastName = 'input[placeholder="Last Name"]'
const inputEmail = 'input[placeholder="Email"]'
const inputPassword = 'input[placeholder="Password"]'
const inputConfirmPassword = 'input[placeholder="Confirm Password"]'

module.exports = {
  before: (client) => {
    client
      .url('http://www.phptravels.net/register')
      .waitForElementVisible(signUpForm)
  },
  after: (client) => {
    client.end();
  },

  'Sign Up/Out/In ' : (client) => {
    client
    // Scenario: Guest can't Sign up without filling the required fields
      .click(signUpSubmitButton)
      .waitForElementVisible(errorMessage)
      .assert.containsText(errorMessage, 'The First name field is required.')
      .assert.containsText(errorMessage, 'The Last Name field is required.')
      .assert.containsText(errorMessage, 'The Email field is required.')
      .assert.containsText(errorMessage, 'The Password field is required.')

    // Scenario: Guest can Sign up when filled the required fields
      .setValue(inputFirstName, guestName)
      .setValue(inputLastName, guestName)
      .setValue(inputEmail, guestEmail)
      .setValue(inputPassword, guestPassword)
      .setValue(inputConfirmPassword, guestPassword)
      .click(signUpSubmitButton)
      .waitForElementVisible(bookingsSection)
      .assert.containsText(body, `Hi, ${guestName}`)

    // Scenario: User can Logout from his Account

      // Note: I could not click the "Logout" button, so I directly pass
      // the href linked to the button
      .url('http://www.phptravels.net/account/logout/')
      .waitForElementVisible(loginForm)

    // Scenario: User can't Login with wrong password
      .waitForElementVisible(inputEmail)
      .setValue(inputEmail, guestEmail)
      .setValue(inputPassword, wrongPassword)
      .click(loginSubmitButton)
      .waitForElementVisible(errorMessage)
      .assert.containsText(errorMessage, 'Invalid Email or Password')

    // Scenario: User can Login in his existing Account
      .clearValue(inputPassword)
      .setValue(inputPassword, guestPassword)
      .click(loginSubmitButton)
      .waitForElementVisible(bookingsSection)
      .assert.containsText(body, `Hi, ${guestName}`);
  },
};
