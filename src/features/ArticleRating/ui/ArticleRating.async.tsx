import { Suspense, lazy } from 'react';
import { ArticleRatingPropsType } from './ArticleRating';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

const ArticleRatingLazy = lazy(() => import('./ArticleRating'));

export const ArticleRatingAsync = (props: ArticleRatingPropsType) => (
  <Suspense fallback={<Skeleton width="100%" height={140} />}>
    <ArticleRatingLazy {...props} />
  </Suspense>
);
