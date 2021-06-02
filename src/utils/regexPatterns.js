/* eslint-disable no-useless-escape */
export const isDateStringFormat = date =>
  /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]/.test(date);

export const isPhoneNumber = phoneNumber =>
  /^[0-9]{2}\s[0-9]{2}\s[0-9]{2}\s[0-9]{2}$/.test(phoneNumber);

export const isEmail = email => {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
    email,
  );
};
