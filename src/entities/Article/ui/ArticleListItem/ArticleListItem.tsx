import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { ARTICLE_LIST_ITEM_SESSIONSTORAGE_IDX } from 'shared/const/sessionstorage';
import {
  ArticleBlockTypeEnum,
  ArticleListViewVariantEnum,
  IArticle,
  IArticleTextBlock,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlock } from '../ArticleTextBlock/ArticleTextBlock';

type PropsType = {
  className?: string,
  article: IArticle,
  view: ArticleListViewVariantEnum,
  target?: HTMLAttributeAnchorTarget,
  index: number,
}

export const ArticleListItem = memo((props: PropsType) => {
  const {
    className,
    article,
    view,
    target,
    index,
  } = props;
  const { t } = useTranslation();
  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} className={cls.icon} />
    </>
  );

  const onBtnClickHandler = () => {
    sessionStorage.setItem(ARTICLE_LIST_ITEM_SESSIONSTORAGE_IDX, JSON.stringify(index));
  };

  if (view === ArticleListViewVariantEnum.LIST) {
    const textBlock = article.blocks.find((block) => block.type === ArticleBlockTypeEnum.TEXT) as IArticleTextBlock;

    return (
      <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar ?? ''} alt="author avatar" />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title} />
          {
            textBlock && (
              <ArticleTextBlock block={textBlock} className={cls.textBlock} />
            )
          }
          <div className={cls.footer}>
            <AppLink target={target} to={RoutePath.article_details + article.id}>
              <Button
                variant={ButtonVariantEnum.OUTLINE}
                onClick={onBtnClickHandler}
              >
                {t('readForward')}
              </Button>
            </AppLink>
            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={RoutePath.article_details + article.id}
      className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} onClick={onBtnClickHandler}>
        <div className={cls.imageWrapper}>
          <img src={article.img} className={cls.img} alt={article.type.join(', ')} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text title={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
});
