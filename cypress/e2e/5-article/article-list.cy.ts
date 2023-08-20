describe('User come in articles list page', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('/articles');
    });
  });
  it('and articles upload success', () => {
    cy.getByTestId('ArticleList').should('exist');
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
  });
});
