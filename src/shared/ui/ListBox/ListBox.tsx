import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { ModsType, classNames } from 'shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';
import { HStack } from '../Stack';

type ListBoxItemType = {
  value: string,
  content: ReactNode,
  disabled?: boolean,
};

type DropdownDirection = 'top' | 'bottom';

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
  top: cls.optionsTop,
  bottom: cls.optionsBottom,
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
    direction = 'bottom',
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HListbox
      as="div"
      className={classNames(cls.ListBox, {}, [className])}
      value={value}
      onChange={onChange}
      disabled={readonly}
    >
      <HListbox.Button className={cls.trigger}>
        <HStack gap="8">
          {label && (
            <span className={cls.label}>
              {label}
              {'>'}
            </span>
          )}
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HStack>
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
  );
};
