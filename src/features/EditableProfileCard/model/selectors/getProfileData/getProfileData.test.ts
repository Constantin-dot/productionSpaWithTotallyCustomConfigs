import { IStateSchema } from '@/app/providers/StoreProvider';
import { CountryEnum } from '@/entities/Country';
import { CurrencyEnum } from '@/entities/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
  test('should return data', () => {
    const form = {
      username: 'admin',
      age: 30,
      country: CountryEnum.Gorgia,
      firstname: 'Sarik',
      lastname: 'Hvanidze',
      avatar: 'asdfasdfasdf',
      city: 'Batumi',
      currency: CurrencyEnum.EUR,
    };

    const state: DeepPartial<IStateSchema> = {
      profile: {
        form,
      },
    };
    expect(getProfileData(state as IStateSchema)).toEqual(form);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {},
    };
    expect(getProfileData(state as IStateSchema)).toEqual(undefined);
  });
});
