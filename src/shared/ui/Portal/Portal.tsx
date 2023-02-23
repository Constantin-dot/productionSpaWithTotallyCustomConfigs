import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PropsType = {
  children: ReactNode,
  element?: HTMLElement,
};

export const Portal: FC<PropsType> = (props) => {
  const {
    children,
    element = document.body,
  } = props;

  return createPortal(children, element);
};
