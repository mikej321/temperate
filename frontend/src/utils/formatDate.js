import { parse, format } from 'date-fns';

function formatDateCustom(date) {
    const navDate = format(date, 'MMM do');
    const navYear = format(date, 'yyyy');

    return {
        navDate,
        navYear
    }
}

function formatDay(date) {
    const day = parse(date, 'yyyy-MM-dd', new Date());

    return format(day, 'ccc');
}

function displayTime(date) {
    const time = format(date, 'h:mm a');

    return time;
}

export {
    formatDateCustom,
    formatDay,
    displayTime
}