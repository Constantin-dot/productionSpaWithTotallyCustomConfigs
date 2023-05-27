import { CountryEnum } from 'entities/Country';
import { CurrencyEnum } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { updateProfileData } from './updateProfileData';
import { ProfileValidateErrorEnum } from '../../types/EditableProfileCardSchema';

const data = {
  id: '1',
  username: 'admin',
  age: 30,
  country: CountryEnum.Gorgia,
  firstname: 'Sarik',
  lastname: 'Hvanidze',
  avatar: 'sdfgsdfg',
  city: 'Batumi',
  currency: CurrencyEnum.EUR,
};

describe('updateProfileData.test', () => {
  test('success update data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });

    thunk.api.put.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk();

    expect(thunk.api.put).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('unsuccess update data', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: data,
      },
    });
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ProfileValidateErrorEnum.SERVER_ERROR,
    ]);
  });

  test('validate data error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: {
        form: { ...data, lastname: '' },
      },
    });
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toEqual([
      ProfileValidateErrorEnum.INCORRECT_USER_DATA,
    ]);
  });
});
