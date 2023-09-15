import styles from "./Home.module.scss";
import Passengers from "../../components/Passengers/Passengers";
import Date from "../../components/Date/Date";
import React, {useEffect, useState} from "react";
import { CITY_DESTINATION, CITY_ORIGIN, EMPTY_CITY_ERROR, ERROR_CITY_DESTINATION_ERROR } from "../const";
import { Button } from "@mui/material";
import circle from '../../icons/circle.svg';
import point from '../../icons/point.svg';
import { ButtonStyle } from "../../styles/muiStyle";
import City from "../../components/City/City";
import AddDestination from "../../components/AddDestination/AddDestination";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { createQueryParams } from "./utils";

const HomePage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [originCity, setOriginCity] = useState<string>('');
    const [destinationCities, setDestinationCities] = useState<string[]>(['']);
    const [passengers, setPassengers] = useState<number>(0);
    const [date, setDate] = useState<Date>();

    const [isErrorOrigin, setIsErrorOrigin] = useState(false);
    const [errorIndexDestinations, setErrorIndexDestinations] = useState<number[]>([]);
    const [isErrorPassengers, setIsErrorPassengers] = useState(false);
    const [isErrorDate, setIsErrorDate] = useState(false);

    useEffect(() => {
        if (searchParams) {
            const cities = searchParams.get('cities')?.split(',');
            if (cities) {
                const [originCityParams, ...destinationCityParams] = cities;
                setOriginCity(originCityParams);
                setDestinationCities(destinationCityParams);
            }

            const dateParam = searchParams.get('date');
            if (dateParam) {
                const formattedDate = dayjs(dateParam);
                setDate(formattedDate as any);
            }

            const passengersParam = Number(searchParams.get('passengers'));
            if (passengersParam) {
                setPassengers(passengersParam);
            }
        }
    }, [searchParams]);

    const handleSubmit = () => {
        let isValidate: boolean = true;
        if (!originCity) {
            isValidate = false;
            setIsErrorOrigin(true);
        }
        const emptyDestinations = destinationCities.reduce((acc, value, index) => {
            if (!value) {
                acc.push(index)
            }
            return acc;
        }, []);

        if (!passengers) {
            isValidate = false;
            setIsErrorPassengers(true);
        }
        if (!date) {
            isValidate = false;
            setIsErrorDate(true);
        }

        if (emptyDestinations.length) {
            isValidate = false;
            setErrorIndexDestinations(emptyDestinations);
        }

        if (isValidate) {
            const url = createQueryParams(originCity, destinationCities, date, passengers)
            navigate(`/result?${url}`)
        }
    };

    const handleOriginCity = (value) => {
        setOriginCity(value);
        if (value) {
            setIsErrorOrigin(false);
        }
        const url = createQueryParams(value, destinationCities, date, passengers);
        setSearchParams(url)
    }

    const handleChangeDate = (value) => {
        if (value) {
            setIsErrorDate(false);
        }
        setDate(value);
        const url = createQueryParams(originCity, destinationCities, value, passengers);
        setSearchParams(url)
    }

    const handleDestination = (value, index) => {
        const beforeCity = destinationCities.slice(0, index);
        const afterCity = destinationCities.slice(index + 1, destinationCities.length - 1);
        if (value) {
            const updatedErrors = errorIndexDestinations.filter((item) => item !== index);
            setErrorIndexDestinations(updatedErrors);
        }
        const updatedDestinationCities = [...beforeCity, value, ...afterCity];
        const url = createQueryParams(originCity, updatedDestinationCities, date, passengers);
        setDestinationCities(updatedDestinationCities);
        setSearchParams(url);
    };

    const handlePassengers = (value) => {
        setPassengers(value);
        if (value) {
            setIsErrorPassengers(false);
        }
        const url = createQueryParams(originCity, destinationCities, date, value);
        setSearchParams(url);
    }

    const handleAddDestination = () => {
        setDestinationCities([...destinationCities, '']);
    }

    const handleDeleteDestination = (deletedIndex: number) => {
        const updatedDestinationCities = destinationCities.filter((item, index) => index !== deletedIndex);
        setErrorIndexDestinations(errorIndexDestinations.filter(item => item !== deletedIndex));
        setDestinationCities(updatedDestinationCities);
        const url = createQueryParams(originCity, updatedDestinationCities, date, passengers);
        setSearchParams(url)
    }

    const lastIndexDestination = destinationCities.length - 1;

    return (
        <div className={styles.home}>
            <div className={styles.content}>
                <div className={styles.info}>
                    <div className={styles.cityWithAction}>
                        <City
                            label={CITY_ORIGIN}
                            icon={circle}
                            value={originCity}
                            onChange={handleOriginCity}
                            textError={isErrorOrigin ? EMPTY_CITY_ERROR : ''}
                        />
                        {destinationCities.map((city, index) => (
                            <City
                                key={city}
                                label={CITY_DESTINATION}
                                textError={errorIndexDestinations.indexOf(index) > -1
                                    ? ERROR_CITY_DESTINATION_ERROR
                                    : ''}
                                icon={lastIndexDestination === index ? point : circle}
                                invisibleDivider={index === lastIndexDestination}
                                onChange={(value) => handleDestination(value, index)}
                                isShowDelete={destinationCities.length > 1}
                                onDelete={handleDeleteDestination}
                                value={destinationCities[index]}
                                index={index}
                            />
                        ))}
                        <AddDestination onClick={handleAddDestination} />
                    </div>
                    <div className={styles.block}>
                        <div className={styles.line}>
                            <div className={styles.lineBlock}>
                                <Passengers
                                    value={passengers}
                                    onChange={handlePassengers}
                                    isError={isErrorPassengers}
                                />
                            </div>
                        </div>
                        <div className={styles.line}>
                            <Date isError={isErrorDate} date={date} onChange={handleChangeDate}/>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        disabled={isErrorOrigin || errorIndexDestinations.length > 0}
                        sx={ButtonStyle}
                        fullWidth
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default HomePage;