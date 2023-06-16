import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import type { UserRoleVariant } from '@/entities/User';
import { loginByUsername } from './loginByUsername';

describe('loginByUsername.test', () => {
  test('should be called with status fulfilled', async () => {
    const userValue = { username: 'test', id: '1', role: ['ADMIN'] as Array<UserRoleVariant> };

    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
    const result = await thunk.callThunk({ username: 'test', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(userValue);
  });

  test('should be called with status rejected', async () => {
    const thunk = new TestAsyncThunk(loginByUsername);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({ username: 'test', password: '123' });

    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Entered incorrect date!');
  });
});
