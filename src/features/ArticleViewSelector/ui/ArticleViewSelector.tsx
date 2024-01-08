import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/bi_list.svg';
import CardsIcon from '@/shared/assets/icons/fe_tiled.svg';
import { Button, ButtonVariantEnum } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleListViewVariantEnum } from '@/entities/Article';

type PropsType = {
  className?: string;
  view: ArticleListViewVariantEnum;
  onViewClick: (view: ArticleListViewVariantEnum) => void;
};

const viewTypes = [
  {
    view: ArticleListViewVariantEnum.CARDS,
    icon: CardsIcon,
  },
  {
    view: ArticleListViewVariantEnum.LIST,
    icon: ListIcon,
  },
];

export const ArticleViewSelector = memo((props: PropsType) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleListViewVariantEnum) => () => {
    onViewClick?.(newView);
  };
  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button
          variant={ButtonVariantEnum.CLEAR}
          onClick={onClick(viewType.view)}
          key={viewType.view}
        >
          <Icon
            width={24}
            height={24}
            Svg={viewType.icon}
            className={classNames('', {
              [cls.notSelected]: viewType.view !== view,
            })}
          />
        </Button>
      ))}
    </div>
  );
});
