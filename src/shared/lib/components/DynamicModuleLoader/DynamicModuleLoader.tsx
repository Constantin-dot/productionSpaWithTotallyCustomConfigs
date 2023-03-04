import { Reducer } from '@reduxjs/toolkit';
import { IReduxStoreWithManager, StateSchemaKeyType } from 'app/providers/StoreProvider';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersListType = {
  [name in StateSchemaKeyType]?: Reducer;
}

type ReducerListEntryType = [StateSchemaKeyType, Reducer]

type PropsType = {
  reducers: ReducersListType,
  removeAfterUnmount?: boolean,
};

export const DynamicModuleLoader: FC<PropsType> = (props) => {
  const {
    children,
    reducers,
    removeAfterUnmount,
  } = props;
  const dispatch = useDispatch();

  const store = useStore() as IReduxStoreWithManager;

  useEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]: ReducerListEntryType) => {
      store.reducerManager.add(name, reducer);
      dispatch({ type: `@INIT ${name} reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]: ReducerListEntryType) => {
          store.reducerManager.remove(name);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};
