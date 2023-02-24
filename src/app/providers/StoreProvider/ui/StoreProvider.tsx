import { DeepPartial } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { IStateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

type PropsType = {
  children?: ReactNode,
  initialState?: DeepPartial<IStateSchema>,
};

export const StoreProvider: FC<PropsType> = (props) => {
  const { children, initialState } = props;

  const store = createReduxStore(initialState as IStateSchema);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
