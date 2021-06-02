import { isEmail, isPhoneNumber, isProperPassword } from './regexPatterns';
import translations from './translations';
// import { quiz } from './secrets';

export default (id, value) => {
  let ok = true;
  let noError = true;
  let correctedValue = value; // initial value - some id's will change this
  let errorMessage = '';

  switch (id) {
    case 'name':
    case 'username':
    case 'work':
    case 'address':
      correctedValue = value.replace(/[\\]|[\+]|[\;]|[\:]|[\"]/g, ''); // removing \ and +
      noError = true;
      break;

    case 'password':
    case 'repeatPassword':
      correctedValue = value;
      if (correctedValue.length >= 6) {
        noError = true;
        break;
      }
      noError = false;
      break;

    case 'quiz':
      correctedValue = value;
      if (correctedValue.toLowerCase() === quiz && correctedValue.length > 0) {
        noError = true;
        break;
      }
      console.log('validate ****** 874');
      noError = false;
      break;

    case 'email':
    case 'workemail':
      noError = isEmail(value);
      break;

    case 'phone':
    case 'mobile':
    case 'workphone':
      correctedValue = value
        .replace(/^\+[0-9]{2}/g, '') // removing +45
        .replace(/ /g, '') // removing all spaces
        .replace(/(\d{2})/g, '$1 ') // put in spaces between 2 digits
        .trim(); // remove the last space put in by above
      noError = isPhoneNumber(correctedValue);
      break;

    case 'birthday':
      noError = true;
      break;

    case 'active':
    case 'size':
      noError = true;
      break;

    case 'roles':
      noError = true;
      break;
  }

  if (!noError) errorMessage = `${translations[id]} er ikke formet rigtig`;
  if (id !== 'quiz' && !correctedValue) {
    noError = true;
    errorMessage = '';
  } // value may and can be empty (except "quiz")

  return { ok: noError, value: correctedValue, errorMessage };
};

export const isEmptyObject = object => {
  let isEmpty = true;
  Object.keys(object).map(key => {
    if (object[key] && object[key].length > 0) return (isEmpty = false);
  });
  return isEmpty;
};

export const findEmptyKeysInObject = object => {
  let emptyKeys = [];
  Object.keys(object).map(key => {
    if (object[key] === '') emptyKeys.push(key);
  });
  return emptyKeys;
};

export const findMissingKeysInObject = (missingObject, fullObject) => {
  let missingKeys = [];
  Object.keys(fullObject).map(key => {
    if (!missingObject.hasOwnProperty(key)) missingKeys.push(key);
  });
  return missingKeys;
};
