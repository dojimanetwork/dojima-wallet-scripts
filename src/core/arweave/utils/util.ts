import moment from "moment";

export const convertTimestampToDate = (timestamp: number) => {
    const date = moment(timestamp).toDate().toUTCString();
    return date;
}

export const convertISOtoUTC = (date: string) => {
    const utcDate = new Date(date).toUTCString();
    return utcDate;
}

export const convertDateToTimestamp = (date: string) => {
    const timestamp = moment(date).format("X"); // lowercase 'x' for timestamp in milliseconds
    return Number(timestamp);
}

export const convertTimestampToDateFormat = (timestamp: number) => {
    const date = moment(
        convertISOtoUTC(convertTimestampToDate(timestamp * 1000))
    ).format("DD/MM/YYYY");
    return date;
}

export const convertTimestampToTimeFormat = (timestamp: number) => {
    const date = moment(
        convertISOtoUTC(convertTimestampToDate(timestamp * 1000))
    ).format("HH:mm:ss");
    return date;
}