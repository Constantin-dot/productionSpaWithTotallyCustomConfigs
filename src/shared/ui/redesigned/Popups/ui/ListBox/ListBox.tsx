import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import cls from './ListBox.module.scss';
import { HStack } from '../../../../redesigned/Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import { Button } from '../../../Button';
import { Text } from '../../../Text';

type ListBoxItemType<T extends string> = {
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

type PropsType<T extends string> = {
  items?: ListBoxItemType<T>[];
  className?: string;
  value?: T;
  defaultValue?: string;
  onChange: (value: T) => void;
  readonly?: boolean;
  label?: string | null;
  direction?: DropdownDirection;
};

export const ListBox = <T extends string>(props: PropsType<T>) => {
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

  const optionsClasses = [mapDirectionClass[direction], popupCls.menu];

  const selectedItem = useMemo(
    () => items?.find((item) => item.value === value),
    [items, value],
  );

  return (
    <HStack gap="4">
      {label && (
        <span
          className={classNames('', { [popupCls.disabled]: readonly }, [])}
        >{`${label}>`}</span>
      )}
      <HListbox
        as="div"
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
        disabled={readonly}
      >
        <HListbox.Button
          className={classNames(
            cls.trigger,
            { [popupCls.disabled]: readonly },
            [],
          )}
        >
          <Button variant="filled">
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListbox.Button>
        <HListbox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListbox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                    [cls.selected]: selected,
                  })}
                >
                  <Text
                    size="s"
                    className={cls.text}
                    text={`${selected ? 'v ' : ''}${item.content}`}
                  />
                </li>
              )}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </HStack>
  );
};
