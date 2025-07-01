import dayjs from 'dayjs';

function convertDateFormat(inputDate: string, originalFormat: string = "DD.MM.YYYY", desiredFormat: string = "MMM DD YYYY"): string {
    try {
        const parsedDate = dayjs(inputDate, { format: originalFormat });
        const convertedDate = parsedDate.format(desiredFormat);
        return convertedDate;
    } catch (error) {
        return "Invalid input date format";
    }
}

export default convertDateFormat