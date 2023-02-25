import { ICounterState } from 'entities/Counter';
import { IUserSchema } from 'entities/User';

export interface IStateSchema {
  counter: ICounterState;
  user: IUserSchema;
}
