import { IStateSchema } from 'app/providers/StoreProvider';
import { getProfileValidateErrors } from './getProfileValidateErrors';
import { ProfileValidateErrorEnum } from '../../types/EditableProfileCardSchema';

describe('getProfileValidateErrors.test', () => {
  test('should return validateErrors', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        validateErrors: [
          ProfileValidateErrorEnum.INCORRECT_USER_DATA,
          ProfileValidateErrorEnum.INCORRECT_AGE,
        ],
      },
    };
    expect(getProfileValidateErrors(state as IStateSchema)).toEqual([
      ProfileValidateErrorEnum.INCORRECT_USER_DATA,
      ProfileValidateErrorEnum.INCORRECT_AGE,
    ]);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {},
    };
    expect(getProfileValidateErrors(state as IStateSchema)).toEqual(undefined);
  });
});
