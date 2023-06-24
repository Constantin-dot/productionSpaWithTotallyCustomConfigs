import {
  MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUiScrollByPath, uiActions } from '@/features/UI';
import { IStateSchema } from '@/app/providers/StoreProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';
import { ITestProps } from '@/shared/types/tests';

interface IProps extends ITestProps {
  className?: string;
  children: ReactNode;
  isSaveScroll?: boolean;
  onScrollEnd?: () => void;
}

export const Page = (props: IProps) => {
  const {
    className,
    children,
    isSaveScroll = false,
    onScrollEnd,
  } = props;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const scrollPosition = useSelector((state: IStateSchema) => getUiScrollByPath(state, pathname));

  const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const onScrollHandler = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(uiActions.setScrollPosition({
      path: pathname,
      position: e.currentTarget.scrollTop,
    }));
  }, 1000);

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  return (
    <main
      className={classNames(cls.Page, {}, [className])}
      ref={wrapperRef}
      onScroll={isSaveScroll ? onScrollHandler : undefined}
      // eslint-disable-next-line react/destructuring-assignment
      data-testid={props['data-testid']}
    >
      {children}
      {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
    </main>
  );
};
