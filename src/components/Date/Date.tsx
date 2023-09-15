import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useState} from "react";
import {ERROR_DATE } from "../../pages/const";
import ErrorText from "../ErrorText/ErrorText";

const styleCalendar = {
    width: '96px',
    height: '40px',
    fontSize: '18px',

    "& .MuiInputBase-root": {
        fontSize: '14px',
        height: '40px',
        paddingRight: 0,
        "& fieldset": {
            borderColor:'var(--grey-color)',
        },
        "&.Mui-error fieldset": {
            borderColor: 'var(--red-color)',
        }
    },
}

type TDateProps = {
    date?: Date;
    onChange: (value) => void;
    isError: boolean;
};

const Date = ({ date, onChange, isError }: TDateProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e) => {
        onChange(e?.$d);
    };

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <div>Date</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    open={isOpen}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    sx={styleCalendar}
                    onChange={handleChange}
                    value={date}
                    slots={{
                        openPickerButton: () => null
                    }}
                    slotProps={{ textField: { size: 'small', onClick: handleOpen, error: isError }}}
                    disablePast
                />
            </LocalizationProvider>
            {isError && <ErrorText error={ERROR_DATE}/>}
        </div>
    )
}

export default Date;