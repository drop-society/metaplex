import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import Autosuggest from 'react-autosuggest';

import { withStyles, Paper } from '@mui/material';
import _ from 'lodash';

import {
  renderInputComponent,
  defaultSuggestion,
  renderSectionTitle,
  shouldRenderSuggestions,
  highlightSuggestion,
  renderSuggestion,
} from './Renders';
import usePrevious from 'src/reusablehooks/usePrevious';

const PREFIX = 'MAX_ROWS';

const classes = {
  container: `${PREFIX}-container`,
  suggestionsContainerOpen: `${PREFIX}-suggestionsContainerOpen`,
  input: `${PREFIX}-input`,
  suggestion: `${PREFIX}-suggestion`,
  sectionContainer: `${PREFIX}-sectionContainer`,
  suggestionsList: `${PREFIX}-suggestionsList`,
  sectionTitle: `${PREFIX}-sectionTitle`,
  divider: `${PREFIX}-divider`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.container}`]: {
    position: 'relative',
  },

  [`& .${classes.suggestionsContainerOpen}`]: {
    position: 'absolute',
    paddingTop: theme.spacing(1),
    minWidth: '100%',
    width: 'fit-content',
    zIndex: 2,
    left: 0,
    right: 0,
    ...theme.general.darkPaper,
  },

  [`& .${classes.input}`]: {
    textTransform: 'uppercase',
    '&::placeholder': {
      textTransform: 'none',
    },
  },

  [`& .${classes.suggestion}`]: {
    display: 'block',
  },

  [`& .${classes.sectionContainer}`]: {
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginBottom: 0,
    },
  },

  [`& .${classes.suggestionsList}`]: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },

  [`& .${classes.sectionTitle}`]: {
    textAlign: 'left',
    paddingLeft: theme.spacing(1),
    fontWeight: theme.fontWeight.bolder,
  },

  [`& .${classes.divider}`]: {
    height: theme.spacing(2),
  }
}));

export const MAX_ROWS = 16;
export const MIN_LENGTH = 2;
export const DEFAULT_COMPONENT = 'default';
export const HIGHLIGHT_COMPONENT = 'highlight';

function useAutocompleteState(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const prevValue = usePrevious(defaultValue);
  useEffect(() => {
    if (!_.isEqual(prevValue, defaultValue)) {
      setValue(defaultValue);
    }
  }, [setValue, prevValue, defaultValue]);

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  return [value, handleChange, setValue];
}

function useSuggestionState() {
  const [suggestions, setState] = useState([]);

  return [suggestions, setState];
}

/**
 * Suggestion is an object that is an autocomplete item to be rendered in selections
 * @typedef {Object} suggestion
 * @property {String} component - component to be rendered in suggestions. Must be registered with componentTypes.
 * @property {*} * - any arbitrary data used in frontend or from endpoint.
 **/

/**
 * Section object shaped for autocomplete rendering this is to support multiple types of autocompletes grouped
 * @typedef {Object} section
 * @property {string} title - title label for autosuggest sections
 * @property {suggestions[]} suggestion - array of data which contains what component `component` will be rendered for suggestions
 *                   also contains arbitrary data which is sent to onSelected handler
 **/

/**
 * @callback dataProviderCallback
 * @param {string} query - input to fetch data with
 * @returns {Promise<section[]>} promise - promise that resolves to multiple sections in suggestions
 **/

/**
 * Generic Autocomplete component for multiple types
 * @param {object} props Component props
 * @param {object} props.classes Theme classes created from withStyles component
 * @param {object} props.componentTypes mapping of components for different suggestions
 * @param {object} props.textFieldProps props that get passed to material ui TextField component
 * @param {object} props.inputProps props that get passed to material ui Input component
 * @param {dataProviderCallback} props.dataProvider a promise that resolves to an object shaped for react-autosuggest
 * @param {function} props.onSelected gets called when a suggestion is selected
 * @param {function} props.onClear gets called when a escape happens or text is cleared
 * @param {function} props.onError gets called when a dataProvider promise fails
 */
export function Autocomplete({
  classes,
  componentTypes = {},
  inputProps,
  textFieldProps,
  dataProvider,
  defaultValue,
  onSelected = () => {},
  onClear = () => {},
  onError = () => {},
  dataTestId,
}) {
  // add default components
  componentTypes = {
    [DEFAULT_COMPONENT]: defaultSuggestion,
    [HIGHLIGHT_COMPONENT]: highlightSuggestion,
    ...componentTypes,
  };

  const [value, handleChange, setValue] = useAutocompleteState(defaultValue);

  const [suggestions, setSuggestion] = useSuggestionState();

  // dynamically limiting the size of each slice
  const getSectionSuggestions = (section) => {
    return section.suggestion.slice(
      0,
      Math.ceil(MAX_ROWS / suggestions.length)
    );
  };

  // used to clear suggestions
  const onSuggestionsClearRequested = () => {
    setSuggestion([]);
    onClear();
  };

  // dataProvider is a function that returns promise that has data
  // shape of data returned:
  const onSuggestionsFetchRequested = ({ value: suggestion }) => {
    if (suggestion && suggestion.length > MIN_LENGTH) {
      const promise = dataProvider(suggestion);
      promise
        .then((sections) => {
          setSuggestion(
            sections.filter(({ suggestion }) => suggestion.length > 0)
          );
        })
        .catch((err) => {
          setSuggestion([]);
          onError(err);
        });
    }
  };

  const onSuggestionSelected = (...args) => {
    onSelected(...args, setValue);
  };

  const autosuggestProps = {
    suggestions,
    onSuggestionsFetchRequested,
    onSuggestionsClearRequested,
    onSuggestionSelected,
    shouldRenderSuggestions,
    renderSuggestion: renderSuggestion(componentTypes),
    getSuggestionValue: (suggestion) => suggestion.name || '',
    // multi section
    multiSection: true,
    renderSectionTitle: renderSectionTitle(classes),
    renderInputComponent: renderInputComponent(textFieldProps, value),
    getSectionSuggestions,
  };

  return (
    <Root
      onFocus={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          ...inputProps,
          classes,
          value: value || '',
          onChange: handleChange,
        }}
        theme={{
          container: classes.container,
          suggestionsContainer: 'suggestionsContainer',
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
          sectionContainer: classes.sectionContainer,
        }}
        renderSuggestionsContainer={(options) => (
          <Paper {...options.containerProps} square data-testid={dataTestId}>
            {options.children}
          </Paper>
        )}
        highlightFirstSuggestion={true}
      />
    </Root>
  );
}

Autocomplete.propTypes = {
  defaultValue: PropTypes.string,
  onSelected: PropTypes.func.isRequired,
  dataProvider: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onClear: PropTypes.func,
  onSuggestionSelected: PropTypes.func,
  componentTypes: PropTypes.object,
  inputProps: PropTypes.object,
  textFieldProps: PropTypes.object,
  classes: PropTypes.object,
  dataTestId: PropTypes.string,
};

export default (Autocomplete);
