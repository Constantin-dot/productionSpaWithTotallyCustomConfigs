import { ICounterState } from '../types/counterSchema';
import { counterReducer, counterActions } from './counterSlice';

describe('counterSlice.test', () => {
  test('should return decrement state value', () => {
    const state: ICounterState = { value: 10 };
    expect(
      counterReducer(state, counterActions.decrement()),
    ).toEqual({ value: 9 });
  });

  test('should return increment state value', () => {
    const state: ICounterState = { value: 10 };
    expect(
      counterReducer(state, counterActions.increment()),
    ).toEqual({ value: 11 });
  });

  test('should work with empty state', () => {
    expect(
      counterReducer(undefined, counterActions.increment()),
    ).toEqual({ value: 1 });
  });
});
