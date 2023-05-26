import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

type ListBoxItemType = {
  value: string,
  content: ReactNode,
  disabled?: boolean,
};

type PropsType = {
  items?: Array<ListBoxItemType>,
  className?: string,
  value?: string,
  defaultValue?: string,
  onChange: (value: string) => void,
  readonly?: boolean,
  label?: string,
  direction?: DropdownDirection,
};

const mapDirectionClass: Record<DropdownDirection, string> = {
  bottomRight: cls.optionsBottomRight,
  bottomLeft: cls.optionsBottomLeft,
  topRight: cls.optionsTopRight,
  topLeft: cls.optionsTopLeft,
};

export const ListBox = (props: PropsType) => {
  const {
    items,
    className,
    value,
    defaultValue,
    onChange,
    readonly,
    label,
    direction = 'bottomRight',
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4">
      {label && <span>{`${label}>`}</span>}
      <HListbox
        as="div"
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <HListbox.Button className={cls.trigger}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListbox.Button>
        <HListbox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {items?.map((item) => (
            <HListbox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li className={classNames(cls.item, { [cls.active]: active, [cls.disabled]: item.disabled })}>
                  {selected && '+'}
                  {item.content}
                </li>
              )}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </HStack>
  );
};
