describe('mf-account-app: App component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=app--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to mf-account-app!');
    });
});
