export const convertMinsToHrsMins = (mins?: number) => {
  if (!mins) {
    return '';
  }

  const h = Math.floor(mins / 60);
  const m = mins % 60;

  return `${h}h ${m}m`;
};

export const getYear = (date?: string) =>
  date ? new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(Date.parse(date)) : '';

export const getDate = (date?: string) =>
  date ? new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(Date.parse(date)) : '';

export const queryBuilder = (currentList: Object, newList: Object) => {
  const newQueryParams = Object.entries({
    ...currentList,
    ...newList,
  })
    .filter(([, v]) => !(v === undefined || v === null || !v))
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return `?${newQueryParams}`;
};
