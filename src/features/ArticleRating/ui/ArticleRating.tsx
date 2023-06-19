import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating, useRateArticle } from '../api/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';

export type ArticleRatingPropsType = {
  className?: string,
  articleId: string,
};

const ArticleRating = memo((props: ArticleRatingPropsType) => {
  const { className, articleId } = props;
  const { t } = useTranslation('article');
  const userData = useSelector(getUserAuthData);
  const {
    data, isLoading, refetch,
  } = useGetArticleRating({ userId: userData?.id ?? '', articleId }, { refetchOnMountOrArgChange: true });
  const [rateArticleMutation] = useRateArticle();

  const rateArticleHandler = useCallback((starsCount: number, feedback?: string) => {
    try {
      rateArticleMutation({
        userId: userData?.id ?? '',
        articleId,
        rate: starsCount,
        feedback,
      });
    } catch (e) {
      console.log(e);
    }
  }, [articleId, rateArticleMutation, userData?.id]);

  const onAcceptHandler = useCallback((starsCount: number, feedback?: string) => {
    rateArticleHandler(starsCount, feedback);
  }, [rateArticleHandler]);

  const onCancelHandler = useCallback((starsCount: number) => {
    rateArticleHandler(starsCount);
  }, [rateArticleHandler]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  return (
    <RatingCard
      onAccept={onAcceptHandler}
      onCancel={onCancelHandler}
      rate={data?.[0]?.rate}
      className={className}
      title={t('rateArticle') ?? ''}
      feedbackTitle={t('articleFeedbackTitle') ?? ''}
      hasFeedback
    />
  );
});

export default ArticleRating;
