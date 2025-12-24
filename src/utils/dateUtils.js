import moment from 'moment';

// Function to format a date to 'YYYY-MM-DD'
export const formatDateToInput = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
