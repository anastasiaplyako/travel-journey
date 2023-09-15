import dayjs from "dayjs";

export const createQueryParams = (originCity: string, destinationCities: string[], date: Date, passengers: number ) => {
    let url = 'cities='
    if (originCity) {
        url += `${originCity},`
    }
    if (destinationCities.length > 0){
        if (!originCity) {
            url += ','
        }
        const destinations = destinationCities.join(',');
        url += `${destinations}`
    }
    if (date) {
        const formattedDate = dayjs(date).format('LL');
        url += `&date=${formattedDate}`;
    }
    if (passengers) {
        url += `&passengers=${passengers}`;
    }
    return url;
};