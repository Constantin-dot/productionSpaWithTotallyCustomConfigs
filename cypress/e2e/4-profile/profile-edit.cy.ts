let profileId: string;

describe('User come in profile page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login().then((data) => {
      profileId = data.id;
      cy.visit(`/profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('and load it success', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'User');
  });
  it('and edit it', () => {
    const newFirstname = 'new';
    const newLastname = 'lastname';
    cy.updateProfile(newFirstname, newLastname);
    cy.getByTestId('ProfileCard.firstname').should('have.value', newFirstname);
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
  });
});
