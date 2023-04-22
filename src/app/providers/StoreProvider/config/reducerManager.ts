import {
  AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import {
  IReducerManager,
  IStateSchema,
  MountedReducersType,
  StateSchemaKeyType,
} from './StateSchema';

export function createReducerManager(initialReducers: ReducersMapObject<IStateSchema>): IReducerManager {
  const reducers = { ...initialReducers };
  let combineReducer = combineReducers(reducers);
  let keysToRemove: Array<StateSchemaKeyType> = [];
  const mountedReducers: MountedReducersType = {};

  return {
    getReducerMap: () => reducers,
    getMountedReducers: () => mountedReducers,
    reduce: (state: IStateSchema, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        keysToRemove.forEach((key) => {
          delete state[key];
        });
        keysToRemove = [];
      }
      return combineReducer(state, action);
    },
    add: (key: StateSchemaKeyType, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return;
      }
      reducers[key] = reducer;
      mountedReducers[key] = true;
      combineReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaKeyType) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      mountedReducers[key] = false;
      keysToRemove.push(key);
      combineReducer = combineReducers(reducers);
    },
  };
}
