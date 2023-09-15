import React from 'react';
import styles from "../../pages/home/Home.module.scss";
import { Button, IconButton } from "@mui/material";
import addIcon from "../../icons/plus.svg";

const ButtonAddIcon = {
    padding: '0 8px 0 0',

    '&:hover': {
        backgroundColor:  'transparent',
    }
};

const ButtonAddDestination = {
    color: 'var(--purple-dark-color)',
    padding: 0,
    margin: '0 40px',
    textTransform: 'none',
}

type TAddDestinationProps = {
    onClick: () => void;
};

const AddDestination = ({ onClick }: TAddDestinationProps) => {
    return (
        <div className={styles.add}>
            <IconButton sx={ButtonAddIcon} onClick={onClick}>
                <img src={addIcon}  alt="add"/>
            </IconButton>
            <Button sx={ButtonAddDestination} onClick={onClick}>
                Add destination
            </Button>
        </div>
    )
}

export default AddDestination;