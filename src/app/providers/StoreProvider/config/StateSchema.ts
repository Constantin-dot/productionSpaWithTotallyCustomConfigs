import {
  AnyAction,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { CombinedState, Dispatch } from 'redux';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router-dom';
import { ICounterState } from '@/entities/Counter';
import { IUserSchema } from '@/entities/User';
import { ILoginSchema } from '@/features/AuthByUsername';
import { IArticleDetailsSchema } from '@/entities/Article';
import { IArticleDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { IAddCommentFormSchema } from '@/features/AddCommentForm';
import { IArticlesPageSchema } from '@/pages/ArticlesPage';
import { IUiSchema } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { IProfileSchema } from '@/features/EditableProfileCard';

export interface IStateSchema {
  counter: ICounterState;
  user: IUserSchema;
  ui: IUiSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  // async reducers
  loginForm?: ILoginSchema;
  profile?: IProfileSchema;
  articleDetails?: IArticleDetailsSchema;
  addCommentForm?: IAddCommentFormSchema;
  articlesPage?: IArticlesPageSchema;
  articleDetailsPage?: IArticleDetailsPageSchema;
}

export type StateSchemaKeyType = keyof IStateSchema;
export type MountedReducersType = OptionalRecord<StateSchemaKeyType, boolean>;

export interface IReducerManager {
  getReducerMap: () => ReducersMapObject<IStateSchema>;
  reduce: (
    state: IStateSchema,
    action: AnyAction,
  ) => CombinedState<IStateSchema>;
  add: (key: StateSchemaKeyType, reducer: Reducer) => void;
  remove: (key: StateSchemaKeyType) => void;
  getMountedReducers: () => MountedReducersType;
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
  reducerManager: IReducerManager;
}

export interface ThunkExtraArguments {
  api: AxiosInstance;
  navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArguments;
  dispatch?: Dispatch;
  state: IStateSchema;
}
