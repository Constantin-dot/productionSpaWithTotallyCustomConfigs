import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/burger.svg';
import CardIcon from '@/shared/assets/icons/kebab.svg';
import ListIconDeprecated from '@/shared/assets/icons/bi_list.svg';
import CardIconDeprecated from '@/shared/assets/icons/fe_tiled.svg';
import {
  Button as ButtonDeprecated,
  ButtonVariantEnum,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleListViewVariantEnum } from '@/entities/Article';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

type PropsType = {
  className?: string;
  view: ArticleListViewVariantEnum;
  onViewClick: (view: ArticleListViewVariantEnum) => void;
};

const viewTypes = [
  {
    view: ArticleListViewVariantEnum.CARDS,
    icon: toggleFeatures({
      name: 'isAppRedisigned',
      on: () => CardIcon,
      off: () => CardIconDeprecated,
    }),
  },
  {
    view: ArticleListViewVariantEnum.LIST,
    icon: toggleFeatures({
      name: 'isAppRedisigned',
      on: () => ListIcon,
      off: () => ListIconDeprecated,
    }),
  },
];

export const ArticleViewSelector = memo((props: PropsType) => {
  const { className, view, onViewClick } = props;

  const onClick = (newView: ArticleListViewVariantEnum) => () => {
    onViewClick?.(newView);
  };

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <Card
          className={classNames(cls.ArticleViewSelector, {}, [className])}
          border="round"
        >
          <HStack>
            {viewTypes.map((viewType) => (
              <Icon
                key={viewType.view}
                Svg={viewType.icon}
                className={classNames('', {
                  [cls.notSelected]: viewType.view !== view,
                })}
                clickable
                onClick={onClick(viewType.view)}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div
          className={classNames(cls.ArticleViewSelectorDeprecated, {}, [
            className,
          ])}
        >
          {viewTypes.map((viewType) => (
            <ButtonDeprecated
              variant={ButtonVariantEnum.CLEAR}
              onClick={onClick(viewType.view)}
              key={viewType.view}
            >
              <IconDeprecated
                width={24}
                height={24}
                Svg={viewType.icon}
                className={classNames('', {
                  [cls.notSelected]: viewType.view !== view,
                })}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
});
