import { CountryEnum } from 'entities/Country';
import { CurrencyEnum } from 'entities/Currency';

export interface IProfile {
  id?: string,
  firstname?: string,
  lastname?: string,
  age?: number,
  currency?: CurrencyEnum,
  country?: CountryEnum,
  city?: string,
  username?: string,
  avatar?: string,
}
