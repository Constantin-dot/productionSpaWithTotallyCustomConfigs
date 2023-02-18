import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButtonEnum } from 'shared/ui/Button';
import { LangSwitcher } from 'shared/ui/LangSwitcher';
import { ThemeSwticher } from 'shared/ui/ThemeSwitcher';
import cls from './Sidebar.module.scss';

type PropsType = { className?: string, };

export const Sidebar: FC<PropsType> = (props) => {
  const { className } = props;

  const [collapsed, setCollapsed] = useState(false);

  const onToggleHandler = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={classNames(
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
          onClick={onToggleHandler}
          className={cls.coolapsingBtn}
          theme={ThemeButtonEnum.CLEAR}
        >
          &#10231;
        </Button>
      </div>
    </div>
  );
};
