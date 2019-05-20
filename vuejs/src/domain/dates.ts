import dayjs from 'dayjs';

export const formatDate = (date: Date | string) => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDatetime = (date: Date | string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
