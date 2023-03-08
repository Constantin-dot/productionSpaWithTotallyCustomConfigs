import { ILoginSchema } from '../types/loginSchema';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
  test('test set username', () => {
    const state: DeepPartial<ILoginSchema> = { username: 'test' };
    expect(loginReducer(
      state as ILoginSchema,
      loginActions.setUsername('test username'),
    )).toEqual({ username: 'test username' });
  });

  test('test set password', () => {
    const state: DeepPartial<ILoginSchema> = { password: '123' };
    expect(loginReducer(
      state as ILoginSchema,
      loginActions.setPassword('12345'),
    )).toEqual({ password: '12345' });
  });
});
