import { IStateSchema } from 'app/providers/StoreProvider';
import { getArticleCommentsError } from './getArticleCommentsError';

describe('getArticleCommentsIsLoading.test', () => {
  test('should return error text', () => {
    const state: DeepPartial<IStateSchema> = {
      articleDetailsComments: {
        error: 'test error',
      },
    };
    expect(getArticleCommentsError(state as IStateSchema)).toEqual('test error');
  });

  test('should work with empty state', () => {
    const state: DeepPartial<IStateSchema> = {
      articleDetailsComments: {},
    };
    expect(getArticleCommentsError(state as IStateSchema)).toEqual(undefined);
  });
});
