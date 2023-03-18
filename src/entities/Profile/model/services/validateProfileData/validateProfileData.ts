import { IProfile, ProfileValidateErrorEnum } from '../../types/profile';

export const validateProfileData = (profile?: IProfile) => {
  if (!profile) {
    return [ProfileValidateErrorEnum.NO_DATA];
  }

  const {
    firstname,
    lastname,
    age,
    country,
  } = profile;

  const errors: ProfileValidateErrorEnum[] = [];

  if (!firstname || !lastname) {
    errors.push(ProfileValidateErrorEnum.INCORRECT_USER_DATA);
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ProfileValidateErrorEnum.INCORRECT_AGE);
  }

  if (!country) {
    errors.push(ProfileValidateErrorEnum.INCORRECT_COUNTRY);
  }

  return errors;
};
