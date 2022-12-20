export const convertMinsToHrsMins = (mins?: number) => {
    if (!mins) { return '' }

    let h = Math.floor(mins / 60);
    let m = mins % 60;

    return `${h}h ${m}m`;
}

export const getYear = (date?: string) => date ? new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(Date.parse(date)) : '';

export const getDate = (date?: string) => date ? new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(Date.parse(date)) : '';
