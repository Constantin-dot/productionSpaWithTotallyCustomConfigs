import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { addCommentForArticle } from './addCommentForArticle';

const data = {
  id: '1',
  user: {
    id: '1',
    username: 'admin',
  },
  text: 'test comment',
};

describe('addCommentForArticle.test', () => {
  test('success post data', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: { id: '1' },
      },
      user: {
        authData: {
          id: '1',
          username: 'admin',
        },
      },
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ data }));

    const result = await thunk.callThunk('test comment');

    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });

  test('unsuccess post data', async () => {
    const thunk = new TestAsyncThunk(addCommentForArticle, {
      articleDetails: {
        data: { id: '1' },
      },
      user: {
        authData: {
          id: '1',
          username: 'admin',
        },
      },
    });
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('test comment');

    expect(result.meta.requestStatus).toBe('rejected');
  });
});
