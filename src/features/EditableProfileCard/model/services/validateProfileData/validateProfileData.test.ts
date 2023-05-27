import { CountryEnum } from 'entities/Country';
import { CurrencyEnum } from 'entities/Currency';
import { validateProfileData } from './validateProfileData';
import { ProfileValidateErrorEnum } from '../../types/EditableProfileCardSchema';

const data = {
  username: 'admin',
  age: 30,
  country: CountryEnum.Gorgia,
  firstname: 'Sarik',
  lastname: 'Hvanidze',
  avatar: 'sdfgsdfg',
  city: 'Batumi',
  currency: CurrencyEnum.EUR,
};

describe('validateProfileData.test', () => {
  test('success fetch data', async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test('without first and last name', async () => {
    const result = validateProfileData({ ...data, firstname: '', lastname: '' });

    expect(result).toEqual([
      ProfileValidateErrorEnum.INCORRECT_USER_DATA,
    ]);
  });

  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([
      ProfileValidateErrorEnum.INCORRECT_AGE,
    ]);
  });

  test('incorrect country', async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([
      ProfileValidateErrorEnum.INCORRECT_COUNTRY,
    ]);
  });

  test('complictly incorrect data', async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ProfileValidateErrorEnum.INCORRECT_USER_DATA,
      ProfileValidateErrorEnum.INCORRECT_AGE,
      ProfileValidateErrorEnum.INCORRECT_COUNTRY,
    ]);
  });
});
