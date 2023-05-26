import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import cls from './DropdownMenu.module.scss';
import { AppLink } from '../AppLink/AppLink';

export interface IDropdownItem {
  disabled?: boolean;
  content?: ReactNode;
  onClick?: (event: any) => void;
  href?: string;
}

type PropsType = {
  className?: string;
  items: Array<IDropdownItem>;
  trigger: ReactNode;
  direction?: DropdownDirection;
};

const mapDirectionClass: Record<DropdownDirection, string> = {
  bottomRight: cls.menuBottomRight,
  bottomLeft: cls.menuBottomLeft,
  topRight: cls.menuTopRight,
  topLeft: cls.menuTopLeft,
};

export const DropdownMenu = (props: PropsType) => {
  const {
    className,
    items,
    trigger,
    direction = 'bottomRight',
  } = props;

  const menuClasses = [mapDirectionClass[direction]];

  return (
    <Menu
      as="div"
      className={classNames(cls.DropdownMenu, {}, [className])}
    >
      <Menu.Button className={cls.btn}>
        {trigger}
      </Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {
          items.map((item, index) => {
            const content = ({ active }: { active: boolean }) => (
              <button
                type="button"
                className={classNames(cls.item, { [cls.active]: active }, [])}
                onClick={item.onClick}
                disabled={item.disabled}
              >
                {item.content}
              </button>
            );

            if (item.href) {
              return (
                <Menu.Item
                  as={AppLink}
                  to={item.href}
                  refName="href"
                  disabled={item.disabled}
                  key={index}
                >
                  {content}
                </Menu.Item>
              );
            }

            return (
              <Menu.Item
                as={Fragment}
                disabled={item.disabled}
                key={index}
              >
                {content}
              </Menu.Item>
            );
          })
        }
      </Menu.Items>
    </Menu>
  );
};
