import {
  AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ICounterState } from 'entities/Counter';
import { IProfileSchema } from 'entities/Profile';
import { IUserSchema } from 'entities/User';
import { ILoginSchema } from 'features/AuthByUsername';
import { NavigateOptions, To } from 'react-router-dom';

export interface IStateSchema {
  counter: ICounterState;
  user: IUserSchema;

  // async reducers
  loginForm?: ILoginSchema;
  profile?: IProfileSchema;
}

export type StateSchemaKeyType = keyof IStateSchema;

export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IStateSchema>;
  reduce: (state: IStateSchema, action: AnyAction) => CombinedState<IStateSchema>;
  add: (key: StateSchemaKeyType, reducer: Reducer) => void;
  remove: (key: StateSchemaKeyType) => void;
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager;
}

export interface ThunkExtraArguments {
  api: AxiosInstance,
  navigate: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
  rejectWithValue: T,
  extra: ThunkExtraArguments,
}
