import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ThemeSwticher } from 'shared/ui/ThemeSwitcher/ThemeSwticher';
import cls from './Sidebar.module.scss';

type PropsType = { className?: string, };

export const Sidebar: FC<PropsType> = (props) => {
  const { className } = props;

  const [collapsed, setCollapsed] = useState(false);

  const onToggleHandler = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={classNames(
        cls.Sidebar,
        { [cls.collapsed]: collapsed },

        [className],
      )}
    >
      <div className={classNames(
        cls.switchers,
        { [cls.tight]: collapsed },

        [className],
      )}
      >
        <ThemeSwticher />
        <LangSwitcher />
        <Button
          data-testid="sidebar-toggle"
          onClick={onToggleHandler}
          className={cls.coolapsingBtn}
          theme={ButtonVariantEnum.CLEAR}
        >
          &#10231;
        </Button>
      </div>
    </div>
  );
};
