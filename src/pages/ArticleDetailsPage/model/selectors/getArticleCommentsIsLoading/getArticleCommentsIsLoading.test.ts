import { IStateSchema } from 'app/providers/StoreProvider';

import { getArticleCommentsIsLoading } from './getArticleCommentsIsLoading';

describe('getArticleCommentsIsLoading.test', () => {
  test('should return isLoading', () => {
    const state: DeepPartial<IStateSchema> = {
      articleDetailsPage: {
        comments: {
          isLoading: true,
        },
      },
    };
    expect(getArticleCommentsIsLoading(state as IStateSchema)).toEqual(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      articleDetailsPage: {
        comments: {},
      },
    };
    expect(getArticleCommentsIsLoading(state as IStateSchema)).toEqual(false);
  });
});
