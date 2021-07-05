import moment from 'moment';

const dateTypes = {
  fullDateTime: 'DD/MM/YYYY hh:mm:ss',
  longDateTime: 'DD/MM/YYYY hh:mm',
  longDate: 'DD/MM/YYYY',
  shortDate: 'DD/MM',
  TimeOnly: 'hh:mm',
};
const unitDefault = 'SGD';

const formatDate = (date, type) => {
  if (!date) {
    return '';
  }
  if (!type) {
    return moment(date).format(dateTypes.longDate);
  }
  return moment(date).format(dateTypes[type]);
};

const formatAmount = (amount, unit) => {
  if (!amount && amount !== 0) {
    return '';
  }

  return `${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${unit ||
    unitDefault}`;
};

export { formatAmount, formatDate };
