import { IStateSchema } from 'app/providers/StoreProvider';

import { getArticleCommentsIsLoading } from './getArticleCommentsIsLoading';

describe('getArticleCommentsIsLoading.test', () => {
  test('should return isLoading', () => {
    const state: DeepPartial<IStateSchema> = {
      articleDetailsComments: {
        isLoading: true,
      },
    };
    expect(getArticleCommentsIsLoading(state as IStateSchema)).toEqual(true);
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      articleDetailsComments: {},
    };
    expect(getArticleCommentsIsLoading(state as IStateSchema)).toEqual(false);
  });
});
