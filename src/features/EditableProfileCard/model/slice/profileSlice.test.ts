import { CountryEnum } from '@/entities/Country';
import { CurrencyEnum } from '@/entities/Currency';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { profileActions, profileReducer } from './profileSlice';
import { IProfileSchema } from '../types/EditableProfileCardSchema';
import { ProfileValidateErrorEnum } from '../consts/consts';

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

describe('profileSlice.test', () => {
  test('test set readonly', () => {
    const state: DeepPartial<IProfileSchema> = { readonly: false };
    expect(
      profileReducer(state as IProfileSchema, profileActions.setReadonly(true)),
    ).toEqual({ readonly: true });
  });

  test('test cancel edit mode', () => {
    const state: DeepPartial<IProfileSchema> = {
      readonly: false,
      data,
      form: {
        ...data,
        username: '',
        age: undefined,
      },
      validateErrors: undefined,
    };
    expect(
      profileReducer(state as IProfileSchema, profileActions.cancelEditMode()),
    ).toEqual({
      readonly: true,
      data,
      form: data,
      validateErrors: undefined,
    });
  });

  test('test update profile', () => {
    const state: DeepPartial<IProfileSchema> = {
      form: data,
    };
    expect(
      profileReducer(
        state as IProfileSchema,
        profileActions.updateProfile({ ...data, firstname: 'Garik' }),
      ),
    ).toEqual({
      form: { ...data, firstname: 'Garik' },
    });
  });

  test('test update profile service pending', () => {
    const state: DeepPartial<IProfileSchema> = {
      isLoading: false,
      validateErrors: [ProfileValidateErrorEnum.SERVER_ERROR],
    };
    expect(
      profileReducer(state as IProfileSchema, updateProfileData.pending),
    ).toEqual({
      isLoading: true,
      validateErrors: undefined,
    });
  });

  test('test update profile service fullfiled', () => {
    const state: DeepPartial<IProfileSchema> = {
      isLoading: true,
      validateErrors: undefined,
    };
    expect(
      profileReducer(
        state as IProfileSchema,
        updateProfileData.fulfilled(data, ''),
      ),
    ).toEqual({
      isLoading: false,
      data,
      form: data,
      readonly: true,
      validateErrors: undefined,
    });
  });
});
