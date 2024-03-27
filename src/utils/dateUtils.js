import { format, isToday, isYesterday } from 'date-fns';

export function formatTimestamp(timestampInSeconds) {
    const timestampInMillis = timestampInSeconds * 1000;

    if (Number.isNaN(timestampInMillis)) {
        return console.warn('Invalid timestamp');
    }

    const formattedDate = new Date(timestampInMillis);

    if (isToday(formattedDate)) {
        return format(formattedDate, "'Today,' h:mm a");
    } else if (isYesterday(formattedDate)) {
        return format(formattedDate, "'Yesterday,' h:mm a");
    } else {
        return format(formattedDate, "'Created' MMM dd, yyyy");
    }
}
