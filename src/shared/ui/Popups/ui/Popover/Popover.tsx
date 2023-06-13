import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { DropdownDirection } from '@/shared/types/ui';
import { classNames } from '@/shared/lib/classNames/classNames';
import popupCls from '../../styles/popup.module.scss';
import cls from './Popover.module.scss';
import { mapDirectionClass } from '../../styles/consts';

type PropsType = {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  children: ReactNode;
};

export const Popover = (props: PropsType) => {
  const {
    className,
    trigger,
    direction = 'bottomRight',
    children,
  } = props;

  const panelClasses = [mapDirectionClass[direction]];

  return (
    <HPopover className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
      <HPopover.Button as="div" className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>

      <HPopover.Panel
        className={classNames(cls.panel, {}, panelClasses)}
      >
        {
          children
        }
      </HPopover.Panel>
    </HPopover>
  );
};
