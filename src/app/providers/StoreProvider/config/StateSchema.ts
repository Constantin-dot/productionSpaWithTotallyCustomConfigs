import {
  AnyAction, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState, Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { ICounterState } from 'entities/Counter';
import { IProfileSchema } from 'entities/Profile';
import { IUserSchema } from 'entities/User';
import { ILoginSchema } from 'features/AuthByUsername';
import { NavigateOptions, To } from 'react-router-dom';
import { IArticleDetailsSchema } from 'entities/Article';
import { IArticleDetailsCommentsSchema } from 'pages/ArticleDetailsPage';

export interface IStateSchema {
  counter: ICounterState;
  user: IUserSchema;

  // async reducers
  loginForm?: ILoginSchema;
  profile?: IProfileSchema;
  articleDetails?: IArticleDetailsSchema;
  articleDetailsComments?: IArticleDetailsCommentsSchema;
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
  navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
  rejectValue: T,
  extra: ThunkExtraArguments,
  dispatch?: Dispatch,
  state: IStateSchema,
}
