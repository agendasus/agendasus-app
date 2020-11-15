import Moment from 'moment';

const DDMMYYYY = 'DD/MM/YYYY';
const HHmm = 'HH:mm';

export const formatDateAndTime = (originalDate = new Date()) => {
    let data = Moment(originalDate);
    if (!data.isValid()) {
        data = Moment();
    }
    return data.isDST() ? data.subtract(1, 'hour').format(`${DDMMYYYY} ${HHmm}`) : data.format(`${DDMMYYYY} ${HHmm}`);
}

export const formatDateWithoutTime = (originalDate = new Date()) => {
    let data = Moment(originalDate);
    if (!data.isValid()) {
        data = Moment();
    }
    return data.isDST() ? data.subtract(1, 'hour').format(`${DDMMYYYY}`) : data.format(`${DDMMYYYY}`);
}

export const convertFormattedDateToDateObject = formattedDate => {
    const data = Moment(formattedDate || new Date(), `${DDMMYYYY}`);
    return data.toDate();
}

