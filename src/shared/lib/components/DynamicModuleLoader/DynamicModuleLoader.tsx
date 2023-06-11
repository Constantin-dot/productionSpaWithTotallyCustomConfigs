import { Reducer } from '@reduxjs/toolkit';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { IReduxStoreWithManager, IStateSchema, StateSchemaKeyType } from '@/app/providers/StoreProvider';

export type ReducersListType = {
  [name in StateSchemaKeyType]?: Reducer<NonNullable<IStateSchema[name]>>;
}

type PropsType = {
  reducers: ReducersListType,
  removeAfterUnmount?: boolean,
  children: ReactNode,
};

export const DynamicModuleLoader = (props: PropsType) => {
  const {
    children,
    reducers,
    removeAfterUnmount = true,
  } = props;
  const dispatch = useDispatch();

  const store = useStore() as IReduxStoreWithManager;

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();

    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKeyType];
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKeyType, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKeyType);
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
