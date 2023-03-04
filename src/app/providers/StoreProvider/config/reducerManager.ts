import {
  AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { IReducerManager, IStateSchema, StateSchemaKeyType } from './StateSchema';

export function createReducerManager(initialReducers: ReducersMapObject<IStateSchema>): IReducerManager {
  const reducers = { ...initialReducers };
  let combineReducer = combineReducers(reducers);
  let keysToRemove: Array<StateSchemaKeyType> = [];

  return {
    getReducerMap: () => reducers,
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
      combineReducer = combineReducers(reducers);
    },
    remove: (key: StateSchemaKeyType) => {
      if (!key || !reducers[key]) {
        return;
      }
      delete reducers[key];
      keysToRemove.push(key);
      combineReducer = combineReducers(reducers);
    },
  };
}
