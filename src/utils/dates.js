import moment from 'moment';
// import 'moment/locale/da';
moment.locale('da');
import { parse } from 'date-fns';

/**
 *
 * Converting dates from epoch milliseconds to date string format
 *
 * @param {string} epochDateString
 * @returns string
 */
export const dateEpochToDateString = (
  epochDateString = 0,
  format = 'YYYY-MM-DD HH:mm:ss',
) => {
  try {
    let epoch =
      typeof epochDateString === 'number'
        ? epochDateString
        : Number(epochDateString);
    let date = new Date(0);
    date.setUTCMilliseconds(epoch);
    const returndate = moment(date).local().format(format);
    return returndate;
  } catch (error) {
    alert('Der er sket en dato fejl');
  }
  return;
};

/**
 *
 * Converting dates from date to epoch milliseconds format
 *
 * TODO: Needs testing
 *
 * @param {string} epoc
 * @returns Date format Default format: d/M-y - >13/2-2015 D or d?
 */
export const dateStringToEpoch = (dateString, format = 'D/M-y') => {
  let date;
  try {
    date = parse(dateString, format, new Date());
    const millis = date.getTime();
    return millis.toString();
  } catch (error) {
    alert('Der er sket en dato fejl');
  }
  return;
};
