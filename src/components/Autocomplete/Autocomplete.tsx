import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton, TextField } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './Autocomplete.module.scss';
import { fakeRequestByValue } from '../../fakeServer';
import { ERROR_FAILED, stylesInput, stylesTextField } from './const';


type TAutocompleteRootProps = {
  onChange: (value: string, index: number) => void;
  value?: string;
  errorText?: string;
  isShowDelete: boolean;
  onDelete: (index: number) => void;
  index?: number;
};

const AutocompleteRoot = ({
                            onChange,
                            value,
                            errorText,
                            isShowDelete = false,
                            onDelete,
                            index,
                          }: TAutocompleteRootProps) => {
  const [isFailed, setIsFailed] = useState(false);
  const [inputValue, setInputValue] = useState();

  const optionsCities = fakeRequestByValue(inputValue);

  const handleChange = (e, value, index) => {
    onChange(value, index);
  };

  const handleInputChange = (e, value) => {
    if (value?.toLowerCase() === 'fail') {
      setIsFailed(true);
    }
    setInputValue(value);
  };

  return (
    <div className={styles.city}>
      <div className={styles.input}>
        <Autocomplete
          options={optionsCities?.map((city) => city[0]) || []}
          size='small'
          inputValue={inputValue}
          value={value}
          onChange={handleChange}
          onInputChange={handleInputChange}
          fullWidth
          renderInput={(params) =>
            <TextField
              error={Boolean(errorText || isFailed)}
              inputProps={{ sx: stylesInput }}
              sx={stylesTextField}
              size='small'
              helperText={isFailed ? ERROR_FAILED : errorText}
              {...params}
            />}
          renderOption={(props, option) => (
            <li {...props}>
              <div style={{ marginRight: 8 }} />
              {option}
            </li>
          )}
        />
      </div>
      {isShowDelete &&
      <IconButton sx={{ color: 'var(--purple-dark-color)' }} onClick={() => onDelete(index)}>
        <HighlightOffIcon />
      </IconButton>
      }
    </div>

  );
};

export default AutocompleteRoot;