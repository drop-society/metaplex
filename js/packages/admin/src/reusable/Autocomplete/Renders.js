/* eslint-disable react/prop-types */
import React from 'react';
import { Typography, MenuItem, TextField } from '@mui/material';

import match from 'autosuggest-highlight/umd/match';
import parse from 'autosuggest-highlight/umd/parse';

import { MIN_LENGTH, DEFAULT_COMPONENT } from './index';

// only render if greater than min length
export function shouldRenderSuggestions(value) {
  return Number.isInteger(value) ? true : value.trim().length > MIN_LENGTH;
}

/**
 * For rendering suggestions based on componentTypes map
 * @param {object} componentTypes mapping of string to react component function
 */
export function renderSuggestion(componentTypes) {
  /**
   * Checks if the suggestion object contains a component string that maps to react a component in componentTypes
   * @external props that are passed from Autosuggest Component
   * @see {@link https://github.com/moroshko/react-autosuggest#rendersuggestion-required}
   */
  return (suggestion, ...args) => {
    // check if suggestion has a component field or fallback to default
    if (componentTypes[suggestion.component]) {
      return componentTypes[suggestion.component](suggestion, ...args);
    }

    return componentTypes[DEFAULT_COMPONENT](suggestion, ...args);
  };
}

// section render inputComponent
export function renderInputComponent(textFieldProps, value) {
  return (inputProps) => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
    return (
      <TextField
        variant="filled"
        id="autocomplete-input"
        value={value}
        InputProps={{
          inputRef: (node) => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
          ...other,
        }}
        fullWidth
        {...textFieldProps}
      />
    );
  };
}

// section title renderer
export function renderSectionTitle(classes) {
  return (section) => {
    return (
      <Typography
        className={`${classes.sectionTitle} section-title`}
        variant="caption"
        gutterBottom
      >
        {section.title}
      </Typography>
    );
  };
}

/**
 * id selection rendering component expects value, name and type to be in suggestion data
 * @external props that are passed from Autosuggest Component
 * @see {@link https://github.com/moroshko/react-autosuggest#rendersuggestion-required}
 */
export function defaultSuggestion({ value, name, type }, { isHighlighted }) {
  return (
    <MenuItem
      component="div"
      className={`suggestion-${type}`}
      selected={isHighlighted}
    >
      <Typography
        className={`suggestion-${type}-value`}
        component="span"
        variant="subtitle1"
        color="textSecondary"
      >
        {value}
      </Typography>
      {'\u00a0'}
      <Typography
        className={`suggestion-${type}-name`}
        component="span"
        variant="subtitle1"
      >
        {name}
      </Typography>
    </MenuItem>
  );
}

/**
 * Used to highlight the text inside suggestion
 * @external props that are passed from Autosuggest Component
 * @see {@link https://github.com/moroshko/react-autosuggest#rendersuggestion-required}
 */
export function highlightSuggestion({ name, type }, { query, isHighlighted }) {
  const matches = match(name, query);
  const parts = parse(name, matches);

  return (
    <MenuItem
      component="div"
      className={`suggestion-${type}`}
      selected={isHighlighted}
    >
      {parts.map(({ text, highlight }, i) => (
        <Typography
          key={i}
          component="span"
          variant="subtitle1"
          color={highlight ? 'textSecondary' : 'textPrimary'}
        >
          {text.toUpperCase()}
        </Typography>
      ))}
    </MenuItem>
  );
}
