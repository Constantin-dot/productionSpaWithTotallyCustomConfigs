import { CountryEnum } from 'entities/Country';
import { CurrencyEnum } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleById } from './fetchArticleById';

const data = {
  username: 'admin',
  age: 30,
  country: CountryEnum.Gorgia,
  firstname: 'Sarik',
  lastname: 'Hvanidze',
  avatar: 'sdfgsdfg',
  city: 'Batumi',
  currency: CurrencyEnum.EUR,
};

describe('fetchArticleById.test', () => {
//   test('success fetch data', async () => {
//     const thunk = new TestAsyncThunk(fetchArticleById);
//     thunk.api.get.mockReturnValue(Promise.resolve({ data }));

  //     const result = await thunk.callThunk();

  //     expect(thunk.api.get).toHaveBeenCalled();
  //     expect(result.meta.requestStatus).toBe('fulfilled');
  //     expect(result.payload).toEqual(data);
  //   });

  //   test('unsuccess fetch data', async () => {
  //     const thunk = new TestAsyncThunk(fetchArticleById);
  //     thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
  //     const result = await thunk.callThunk();

//     expect(result.meta.requestStatus).toBe('rejected');
//   });
});
