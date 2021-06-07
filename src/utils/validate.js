import { isEmail, isPhoneNumber } from './regexPatterns';
import translations from './translations';

export default (id, value) => {
  let ok = true;
  let noError = true;
  let correctedValue = value; // initial value - some id's will change this
  let errorMessage = '';

  switch (id) {
    case 'name':
    case 'username':
    case 'address':
      correctedValue = value.replace(/[\\]|[\+]|[\;]|[\:]|[\"]/g, ''); // removing \, :, ; and +
      noError = true;
      break;

    case 'email':
      noError = isEmail(value);
      break;

    case 'phone':
      correctedValue = value
        .replace(/ /g, '') // removing all spaces
        .trim(); // remove the last space put in by above
      noError = isPhoneNumber(correctedValue);
      break;

    case 'roles':
      noError = true;
      break;
  }

  if (!noError) errorMessage = `${translations[id]} er ikke formet rigtig`;
  if (!correctedValue) {
    noError = true;
    errorMessage = '';
  } // value may and can be empty

  return { ok: noError, value: correctedValue, errorMessage };
};
