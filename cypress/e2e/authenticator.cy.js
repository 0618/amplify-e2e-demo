describe('Authenticator:', function() {
  // Step 1: setup the application state
  beforeEach(function() {
    cy.visit('/');
  });
  
  describe('Sign In:', () => {
    it('allows a user to signin', () => {
      // Step 2: Take an action (Sign in)
      cy.get(selectors.usernameInput).type("user20221108");
      cy.get(selectors.signInPasswordInput).type("asdfasdf");
      cy.intercept("OPTIONS", "https://cognito-idp.us-east-1.amazonaws.com/").as("signIn")
      cy.get(selectors.signInButton).contains('Sign in').click();

      cy.wait("@signIn");

      // Step 3: Make an assertion (Check for sign-out text)
      cy.get(`main ${selectors.signOutButton}`).contains('Sign out');
    });
  });

});
export const selectors = { 
  // Auth component classes
  usernameInput: '[name="username"]',
  signInPasswordInput: '[name="password"]',
  signInButton: '[data-variation="primary"]',
  signOutButton: 'button'
}