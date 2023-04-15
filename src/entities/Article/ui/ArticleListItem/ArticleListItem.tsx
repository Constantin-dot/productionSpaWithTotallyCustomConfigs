import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { ArticleListViewVariantEnum, IArticle } from '../../model/types/article';
import cls from './ArticleListItem.module.scss';

type PropsType = {
  className?: string,
  article: IArticle,
  view: ArticleListViewVariantEnum,
}

export const ArticleListItem: FC<PropsType> = (props) => {
  const {
    className,
    article,
    view,
  } = props;

  if (view === ArticleListViewVariantEnum.LIST) {
    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        {article.title}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
      <Card className={cls.card}>
        <div className={cls.imageWrapper}>
          <img src={article.img} className={cls.img} alt={article.type.join(', ')} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          <Text text={article.type.join(', ')} className={cls.types} />
          <Text text={String(article.views)} className={cls.views} />
          <Icon Svg={EyeIcon} className={cls.icon} />
        </div>
        <Text title={article.title} className={cls.title} />
      </Card>
    </div>
  );
};
