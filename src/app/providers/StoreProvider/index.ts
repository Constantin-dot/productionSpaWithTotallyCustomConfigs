import {
  IReduxStoreWithManager, IStateSchema, StateSchemaKeyType, ThunkConfig,
} from './config/StateSchema';
import { AppDispatchType, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
  StoreProvider,
  createReduxStore,
  IStateSchema,
  IReduxStoreWithManager,
  StateSchemaKeyType,
  AppDispatchType,
  ThunkConfig,
};
