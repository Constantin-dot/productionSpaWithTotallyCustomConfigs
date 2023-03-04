import { DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginPassword.test', () => {
  test('should return password', () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {
        password: 'dfsd',
      },
    };
    expect(getLoginPassword(state as IStateSchema)).toEqual('dfsd');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {},
    };
    expect(getLoginPassword(state as IStateSchema)).toEqual('');
  });
});
