// import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
// import { IArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
// import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

// const data = [{
//   id: '1',
//   user: {
//     id: '1',
//     username: 'admin',
//   },
//   text: 'test comment',
// }];

describe('articleDetailsCommentsSlice.test', () => {
  test('test fetch articleDetailsComments service pending', () => {
    // const state: DeepPartial<IArticleDetailsCommentsSchema> = {
    //   isLoading: false,
    //   error: 'test error',
    // };
    // expect(articleDetailsCommentsReducer(
    //   state as IArticleDetailsCommentsSchema,
    //   fetchCommentsByArticleId.pending,
    // )).toEqual({
    //   isLoading: true,
    //   error: undefined,
    // });
  });

  test('test fetch articleDetailsComments service fullfiled', () => {
    // const state: DeepPartial<IArticleDetailsCommentsSchema> = {
    //   isLoading: true,
    //   error: undefined,
    // };
    // expect(articleDetailsCommentsReducer(
    //   state as IArticleDetailsCommentsSchema,
    //   fetchCommentsByArticleId.fulfilled(data, '1', '1'),
    // )).toEqual({
    //   isLoading: false,
    //   ids: ['1'],
    //   entities: {
    //     1: {
    //       id: '1',
    //       text: 'test comment',
    //       user: {
    //         id: '1',
    //         username: 'admin',
    //       },
    //     },
    //   },
    //   error: undefined,
    // });
  });
});
