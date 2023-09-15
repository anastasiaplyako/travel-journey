import React from 'react';
import styles from "./Result.module.scss";
import circle from "../../icons/circle.svg";
import point from "../../icons/point.svg";
import { Button } from "@mui/material";
import { ButtonStyle } from "../../styles/muiStyle";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fakeRequestResult } from "../../fakeServer";

const Result = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const cities = fakeRequestResult(searchParams.get('cities').split(','));

    const renderCity = (name, distance, isLastCity) => {
        return (
            <div className={styles.block} key={distance}>
                <div className={styles.cities}>
                    <img src={isLastCity ? point : circle} alt="icon"/>
                    <span className={styles.name}>{name}</span>
                    {!isLastCity &&
                        <>
                            <span className={styles.distance}>
                                <div className={styles.speech}>
                                    {distance} km
                                </div>
                            </span>
                            <div className={styles.divider}/>
                        </>
                    }
                </div>
            </div>
        )
    };

    const handleBack = () => {
        navigate(-1);
    }

    const totalDistance = Array.isArray(cities) && cities?.reduce((acc, city) => {
        acc += Number(city?.distance);
        return acc;
    }, 0)

    return (
        <div className={styles.home}>
            <div className={styles.content}>
                {Array.isArray(cities) ?
                    <>
                        <div>
                            {cities.map((city, index) =>
                                renderCity(city.from, city.distance, index === cities?.length - 1))}
                        </div>
                        <div className={styles.info}>
                            <div><span>{totalDistance}</span> is total distance</div>
                            <div><span>{searchParams.get('passengers')}</span> passengers</div>
                            <div><span>{searchParams.get('date')}</span></div>
                        </div>
                    </>
                    :
                    <div className={styles.info}>
                        <span>Oops! Something went wrong!</span>
                    </div>
                }
                <Button
                    sx={ButtonStyle}
                    onClick={handleBack}
                >
                    Back
                </Button>
            </div>
        </div>
    )
}

export default Result;