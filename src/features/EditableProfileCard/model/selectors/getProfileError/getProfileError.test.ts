import { IStateSchema } from '@/app/providers/StoreProvider';
import { getProfileError } from './getProfileError';

describe('getProfileError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        error: 'test_error',
      },
    };
    expect(getProfileError(state as IStateSchema)).toEqual('test_error');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {},
    };
    expect(getProfileError(state as IStateSchema)).toEqual(undefined);
  });
});
