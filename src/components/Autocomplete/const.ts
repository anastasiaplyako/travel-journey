export const stylesInput = {
    fontSize: 12,
    lineHeight: 16,
    borderColor: 'var(--grey-color)',
}

export const stylesTextField = {
    "& .MuiInputBase-root": {
        "& fieldset": {
            borderColor:'var(--grey-color)',
        },
        "&.Mui-error fieldset": {
            borderColor: 'var(--red-color)',
        }
    },

    "& .MuiFormHelperText-root": {
        "&.Mui-error": {
            color: 'var(--red-color)',
            ml: 0,
        }
    }

}

export const ERROR_FAILED = 'Oops! Failed to search with this keyword. ';
