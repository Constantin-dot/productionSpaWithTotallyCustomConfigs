export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => cy.request({
  method: 'PUT',
  url: `http://localhost:8000/profile/${profileId}`,
  headers: { Authorization: 'asdfasf' },
  body: {
    id: '3',
    username: 'testuser',
    firstname: 'User',
    lastname: 'Testuser',
    age: 33,
    currency: 'RUB',
    country: 'Russia',
    city: 'Moscow',
    avatar: `https://img.freepik.com/free-psd/3d-illustration-
    person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1688818504
    ~exp=1688819104~hmac=48beb2a54174e6e97ac014bbf0cf70c17a0cd9f74509457341e2dafb93ebff52`,
  },
});

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
