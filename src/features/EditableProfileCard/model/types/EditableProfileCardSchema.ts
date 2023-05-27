import { IProfile } from 'entities/Profile';

export enum ProfileValidateErrorEnum {
  INCORRECT_USER_DATA = 'incorrect_user_data',
  INCORRECT_AGE = 'incorrect_age',
  INCORRECT_COUNTRY = 'incorrect_country',
  NO_DATA = 'no_data',
  SERVER_ERROR = 'server_error',
}

export interface IProfileSchema {
  data?: IProfile,
  form?: IProfile,
  isLoading: boolean,
  error?: string,
  readonly: boolean,
  validateErrors?: ProfileValidateErrorEnum[],
}
