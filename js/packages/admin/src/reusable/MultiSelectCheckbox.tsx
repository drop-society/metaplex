import React, { ReactElement, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import {
  Chip,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { TextFieldProps } from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Autocomplete, AutocompleteProps } from '@mui/material';

const PREFIX = 'MultiSelectCheckbox';

const classes = {
  checkbox: `${PREFIX}-checkbox`
};

const StyledTextField
 = styled(TextField
)(({
    theme
  }:  {theme: Theme}) => ({
  [`& .${classes.checkbox}`]: {
    marginRight: theme.spacing(1),
  }
}));

const DEFAULT_ALL_OPTION = 'ALL';

export interface MultiSelectCheckboxProps<T>
  extends Partial<AutocompleteProps> {
  onChangeHandler?: (event, values) => void;
  selectedValues: Array<T>;
  textLabel?: string;
  checkboxOptions: Array<T>;
  optionLabel?: string;
  optionStyle?: object;
  optionChipIcon?: ReactElement;
  chipValues?: Array<T>;
  selectAllEnabled?: boolean;
  emptyEquivalentToSelectAll?: boolean;
  selectAllOption?: T;
  error?: boolean;
  helperText?: string;
  noOptionsText?: string;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/**
 * An enhanced MultiSelectCheckbox with autocomplete textfield
 */
const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps<
  string | object
>> = <T extends string | object>({
  checkboxOptions: inputCheckboxOptions,
  textLabel = '',
  selectedValues: inputSelectedValues,
  onChangeHandler,
  optionLabel,
  optionStyle = {},
  optionChipIcon,
  selectAllEnabled = false,
  emptyEquivalentToSelectAll = true,
  selectAllOption,
  error = false,
  helperText = '',
  noOptionsText = 'No Options',
  ...props
}: MultiSelectCheckboxProps<T>) => {


  // Replacing null array inputs with empty arrays
  const selectedValues = inputSelectedValues ?? [];
  const checkboxOptions = inputCheckboxOptions ?? [];

  // We need an internal selectedValues state so that the "selectAllOption" isn't injected into the actual values
  const [selectedValuesInternal, setSelectedValuesInternal] = useState<
    Array<T>
  >(selectedValues);

  useEffect(() => {
    setSelectedValuesInternal(selectedValues);
  }, [selectedValues]);

  if (
    selectAllEnabled &&
    (!selectAllOption || Object.keys(selectAllOption).length === 0)
  ) {
    // if select all option is null or an empty object
    // set the name of the default option to 'ALL'
    selectAllOption = { [optionLabel]: DEFAULT_ALL_OPTION } as T;
  }

  const selectAllValues = [selectAllOption, ...checkboxOptions];

  const isAllFound = (values: Array<T>): boolean =>
    values.some((opt) => opt[optionLabel] === selectAllOption[optionLabel]);

  const isAllSelectedInternal = (): boolean =>
    isAllFound(selectedValuesInternal);

  const deselectAll = (selected: Array<T>): void => {
    selected = [];
    setSelectedValuesInternal(selected);
    onChangeHandler(null, selected);
  };

  useEffect(() => {
    if (
      selectAllEnabled &&
      selectedValuesInternal.length !== selectAllValues.length &&
      ((selectedValues.length === 0 && emptyEquivalentToSelectAll) ||
        selectedValuesInternal.some(
          (value) => value[optionLabel] === selectAllOption[optionLabel]
        ))
    ) {
      setSelectedValuesInternal(selectAllValues);
    }
  }, [
    selectAllEnabled,
    selectedValues,
    emptyEquivalentToSelectAll,
    optionLabel,
    selectAllOption,
    selectedValuesInternal,
    selectAllValues,
  ]);

  const handleWrapper = (event: object, values: Array<T>): void => {
    const allOptionSelected = selectAllEnabled ? isAllFound(values) : false;

    if (
      selectAllEnabled &&
      values.length === selectAllValues.length - 1 // One option was deselected
    ) {
      if (isAllSelectedInternal()) {
        // Every option (including ALL) was previously selected, now an option is deselected
        if (allOptionSelected) {
          // Deselected option is not ALL
          // As not every possible option is selected - now will deselect the ALL option
          values = values.filter(
            (obj) => obj[optionLabel] !== selectAllOption[optionLabel]
          );
        } else {
          // ALL option itself was deselected
          // Will deselect every option
          values = [];
        }
      } else {
        // ALL was not previously selected, then everything but ALL was selected
        values = [...selectAllValues];
      }
      onChangeHandler(event, values);
    } else if (allOptionSelected) {
      // All option selected

      // Setting external value based on emptyEquivalentToSelectAll
      //  if emptyEquivalentToSelectAll is true, we represent all items selected as an empty array
      emptyEquivalentToSelectAll
        ? onChangeHandler(event, [])
        : onChangeHandler(event, selectAllValues);

      // Internally we select every possible option and include the ALL option
      values = [selectAllOption, ...checkboxOptions];
    } else {
      onChangeHandler(event, values);
    }
    setSelectedValuesInternal(values);
  };

  const handleDelete = (
    values: Array<T>,
    selectedOption: object | string
  ): void => {
    if (
      selectAllEnabled &&
      selectedOption?.[optionLabel] === DEFAULT_ALL_OPTION
    ) {
      deselectAll(values);
    } else {
      values = values.filter((obj) => obj !== selectedOption);
      setSelectedValuesInternal(values);
      onChangeHandler(null, values);
    }
  };

  return (
    <Autocomplete
      multiple
      size="small"
      options={
        selectAllEnabled
          ? [selectAllOption, ...checkboxOptions]
          : checkboxOptions
      }
      disableCloseOnSelect
      getOptionLabel={(option): string =>
        optionLabel ? option[optionLabel] : option
      }
      renderTags={(values): Array<ReactElement> => {
        if (selectAllEnabled && isAllSelectedInternal()) {
          return [
            <Chip
              key={selectAllOption[optionLabel]}
              className="MuiAutocomplete-tagSizeSmall"
              size="small"
              label={selectAllOption[optionLabel]}
              onDelete={(): void => {
                handleDelete(values, selectAllOption);
              }}
            />,
          ];
        } else {
          return selectedValuesInternal.map((option) => (
            <Chip
              key={optionLabel ? option[optionLabel] : option}
              className="MuiAutocomplete-tagSizeSmall"
              size="small"
              label={optionLabel ? option[optionLabel] : option}
              onDelete={(): void => {
                handleDelete(values, option);
              }}
              icon={optionChipIcon}
            />
          ));
        }
      }}
      renderOption={(option, { selected }): React.ReactElement => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            className={classes.checkbox}
            checked={selected}
            color="primary"
          />
          <Typography style={optionStyle} variant={'body2'}>
            {optionLabel ? option[optionLabel] : option}
          </Typography>
        </React.Fragment>
      )}
      isOptionEqualToValue={(option, value): boolean =>
        (optionLabel ? option[optionLabel] : option) ===
        (optionLabel ? value[optionLabel] : value)
      }
      onChange={handleWrapper}
      ChipProps={{
        avatar: optionChipIcon,
      }}
      renderInput={(params: TextFieldProps): ReactElement => (
        <TextField
          {..._.merge(params, props)}
          label={textLabel}
          variant="filled"
          placeholder=""
          InputProps={{
            style: optionStyle,
            ...params.InputProps,
          }}
          helperText={helperText}
          error={error}
          fullWidth
        />
      )}
      value={selectedValuesInternal}
      noOptionsText={noOptionsText}
    />
  );
};

export default MultiSelectCheckbox;
