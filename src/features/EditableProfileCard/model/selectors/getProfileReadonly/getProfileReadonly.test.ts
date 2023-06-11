import { IStateSchema } from '@/app/providers/StoreProvider';
import { getProfileReadonly } from './getProfileReadonly';

describe('getProfileReadonly.test', () => {
  test('should return readonly', () => {
    const state: DeepPartial<IStateSchema> = {
      profile: {
        readonly: true,
      },
    };
    expect(getProfileReadonly(state as IStateSchema)).toEqual(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      loginForm: {},
    };
    expect(getProfileReadonly(state as IStateSchema)).toEqual(undefined);
  });
});
