import userEvent from '@testing-library/user-event';
import componentRender from 'shared/lib/tests/componentRender/componentRender';
import { IProfile } from 'entities/Profile';
import { CurrencyEnum } from 'entities/Currency';
import { CountryEnum } from 'entities/Country';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { EditableProfileCard } from './EditableProfileCard';
import { profileReducer } from '../../model/slice/profileSlice';

const profile: IProfile = {
  id: '1',
  firstname: 'admin',
  lastname: 'admin',
  age: 465,
  currency: CurrencyEnum.EUR,
  country: CountryEnum.Armenia,
  city: 'Moscow',
  username: 'admin123',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
        username: 'admin',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  test('Readonly mode should be change', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });

  test('On cancel button click form should be cleared', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
  });

  test('Should be error', async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });

  test('If we have not validation errors, shuould be PUT request on server', async () => {
    const mockPutRequest = jest.spyOn($api, 'put');
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(mockPutRequest).toHaveBeenCalled();
  });
});
