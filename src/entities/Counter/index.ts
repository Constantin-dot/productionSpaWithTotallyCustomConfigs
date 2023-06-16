import { ICounterState } from './model/types/counterSchema';
import { Counter } from './ui/Counter';

export type { ICounterState, Counter };
export { counterReducer } from './model/slice/counterSlice';
