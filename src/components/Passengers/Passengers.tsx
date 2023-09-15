import React from 'react';
import { IconButton } from '@mui/material';
import classNames from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import styles from './Passengers.module.scss';
import {ERROR_PASSENGERS} from "../../pages/const";
import ErrorText from "../ErrorText/ErrorText";

const StyleButtonIcon = {
    backgroundColor: 'var(--purple-light-color)',
    color: 'white',
    width: '22px',
    height: '22px',
    borderRadius: '4px',

    '& .MuiSvgIcon-root': {
        width: '14px',
    },

    'path': {
        fontSize: '1rem',
    },

    '&:hover': {
        backgroundColor: 'var(--purple-dark-color)',
    },

    '& .MuiButtonGroup-root': {
        border: '1px solid var(--grey-color)'
    }
}

const Passengers = ({ value, onChange, isError }) => {

    const handleAdd = () => {
        const updatedValue = value + 1;
        onChange(updatedValue)
    }

    const handleRemove = () => {
        const updatedValue = value >= 1 ? value - 1 : 0;
        onChange(updatedValue);
    }

    return (
        <div>
            <span>Passengers</span>
            <div className={classNames(styles.group, { [styles.isError]: isError }) }>
                <IconButton sx={StyleButtonIcon} onClick={handleRemove} size="small">
                    <RemoveIcon />
                </IconButton>
                <span className={styles.count}>{value}</span>
                <IconButton sx={StyleButtonIcon} onClick={handleAdd} size="small">
                    <AddIcon />
                </IconButton>
            </div>
            {isError && <ErrorText error={ERROR_PASSENGERS}/>}
        </div>
    )
}

export default Passengers;