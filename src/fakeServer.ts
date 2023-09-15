import haversine from 'haversine-distance'

export const cities = [
    ['Paris', 48.856614, 2.352222],

    ['Marseille', 43.296482, 5.369780],

    ['Lyon', 45.764043, 4.835659],

    ['Toulouse', 43.604652, 1.444209],

    ['Nice', 43.710173, 7.261953],

    ['Nantes', 47.218371, -1.553621],

    ['Strasbourg', 48.573405, 7.752111],

    ['Montpellier', 43.610769, 3.876716],

    ['Bordeaux', 44.837789, -0.579180],

    ['Lille', 50.629250, 3.057256],

    ['Rennes', 48.117266, -1.677793],

    ['Reims', 49.258329, 4.031696],

    ['Le Havre', 49.494370, 0.107929],

    ['Saint-Étienne', 45.439695, 4.387178],

    ['Toulon', 43.124228, 5.928000],

    ['Angers', 47.478419, -0.563166],

    ['Grenoble', 45.188529, 5.724524],

    ['Dijon', 47.322047, 5.041480],

    ['Nîmes', 43.836699, 4.360054],

    ['Aix-en-Provence', 43.529742, 5.447427],

];

export const fakeRequestByValue = (searchValue: string) => cities.filter((city: [string, number, number]) => {
    return (city[0].toLowerCase()).includes(searchValue?.toLowerCase())
})

interface LatitudeLongitude {
    latitude: number;
    longitude: number;
}

const getCoordinatesByName = (city: string): LatitudeLongitude => {
    const dataCity = cities.find((item) => item[0] === city);
    if (dataCity) {
        return {
            latitude: Number(dataCity[1]),
            longitude: Number(dataCity[2])
        }
    }

}

export const fakeRequestResult = (cities: string[]) => {
    if (cities.includes('Dijon')) {
        return new Error('Dijon is not available');
    }

    return cities?.map((city, index) => {
        if (index < city.length - 1) {
            const coordinatesFrom = getCoordinatesByName(cities[index]);
            const coordinatesTo = getCoordinatesByName(cities[index + 1]);
            const distance = coordinatesFrom && coordinatesTo
                ? (haversine(coordinatesFrom, coordinatesTo) / 1000).toFixed(2)
                : 0;
            return {
                from: cities[index],
                to: cities[index + 1],
                distance,
            }
        }
        return null;
    })
}