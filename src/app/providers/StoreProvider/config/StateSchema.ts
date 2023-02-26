import { ICounterState } from 'entities/Counter';
import { IUserSchema } from 'entities/User';
import { ILoginSchema } from 'features/AuthByUsername';

export interface IStateSchema {
  counter: ICounterState;
  user: IUserSchema;
  loginForm?: ILoginSchema;
}
