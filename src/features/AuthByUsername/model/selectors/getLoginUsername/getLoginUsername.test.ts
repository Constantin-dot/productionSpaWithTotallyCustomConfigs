import { DeepPartial } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
  test('should return username', () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {
        username: 'User',
      },
    };
    expect(getLoginUsername(state as IStateSchema)).toEqual('User');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {},
    };
    expect(getLoginUsername(state as IStateSchema)).toEqual('');
  });
});
