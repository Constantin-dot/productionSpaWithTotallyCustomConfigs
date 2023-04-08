import { ArticleDetails } from 'entities/Article';
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { CommentList } from 'entities/Comment';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArticleDetailsPage.module.scss';

type PropsType = {className?: string,};

const ArticleDetailsPage: FC<PropsType> = (props) => {
  const { className } = props;
  const { t } = useTranslation('article');
  const { id } = useParams<{id: string}>();

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('articleRequestError')}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
      <Text title={t('comments')} className={cls.commentTitle} />
      <CommentList
        comments={[
          {
            id: 'test',
            user: {
              id: '2',
              username: 'Ivan Ivanov',
              avatar: 'data:image/png;base64,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',
            },
            text: 'test',
          },
          {
            id: 'test2',
            user: {
              id: '3',
              username: 'Petr Petrov',
              avatar: 'data:image/png;base64,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',
            },
            text: 'test 2',
          },
        ]}
        // isLoading
      />
    </div>
  );
};

export default memo(ArticleDetailsPage);
