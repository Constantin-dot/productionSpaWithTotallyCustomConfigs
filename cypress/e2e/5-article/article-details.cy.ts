let articleId = '';

describe('User come in article details page', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      articleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(articleId);
  });
  it('and see article content', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });
  it('and see article recommendations list', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });
  it('and put on comment', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('text111');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
  it('and put on rating', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate();
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});
