/* eslint-disable react/prop-types */
import React from 'react';
import { mount } from 'enzyme';

import { act } from 'react-dom/test-utils';
import sinon from 'sinon';

import { Autocomplete } from './index';
import { WrapperWithTheme } from 'theme';
import { MenuItem } from '@mui/material';

// Material UI wrapped elements
const ListItem = 'WithStyles(ForwardRef(ListItem))';

const defaultProps = {
  componentTypes: {},
  classes: {
    container: '',
  },
  onSelected: () => {},
  inputProps: {},
};

describe('Autocomplete Base Component', async () => {
  it('should not render suggestions if no data returned from dataProvider promise', async () => {
    let resolveHandler;

    const dataProvider = sinon.spy((value) => {
      return new Promise((_resolve) => {
        resolveHandler = () => _resolve(value);
      });
    });

    const component = mount(
      <WrapperWithTheme>
        <Autocomplete dataProvider={dataProvider} {...defaultProps} />
      </WrapperWithTheme>
    );

    await act(async () => {
      const inputField = component.find('input');
      inputField.simulate('change', { target: { value: 'ale' } });
      inputField.simulate('focus');
    });

    component.mount();

    await act(async () => {
      resolveHandler([]);
    });

    component.mount();

    const suggestionsContainer = component.find('div.suggestionsContainer');

    expect(suggestionsContainer.children().length).toEqual(0);
    expect(dataProvider.calledWith('ale')).toBeTruthy();
  });

  it('call dataProvider, resolve suggestions, and render default component', async () => {
    let resolveHandler;

    const dataProvider = sinon.spy(() => {
      return new Promise((_resolve) => {
        resolveHandler = (data) => _resolve(data);
      });
    });

    const component = mount(
      <WrapperWithTheme>
        <Autocomplete dataProvider={dataProvider} {...defaultProps} />
      </WrapperWithTheme>
    );

    await act(async () => {
      const inputField = component.find('input');
      inputField.simulate('change', { target: { value: 'ale' } });
    });

    component.mount();

    await act(async () => {
      const inputField = component.find('input');
      inputField.simulate('focus');
      resolveHandler([
        {
          title: 'Users',
          suggestion: [{ name: 'sherod taylor', value: 1234, type: 'user' }],
        },
      ]);
    });

    component.mount();

    const suggestionsContainer = component.find('div.suggestionsContainer');

    expect(dataProvider.calledWith('ale')).toBeTruthy();

    expect(suggestionsContainer.children().length).toEqual(1);
    expect(suggestionsContainer.find(ListItem).length).toEqual(1);

    // check default component was rendered
    expect(suggestionsContainer.find('.section-title').first().text()).toEqual(
      'Users'
    );
    expect(
      suggestionsContainer.find('.suggestion-user-name').first().text()
    ).toEqual('sherod taylor');
    expect(
      suggestionsContainer.find('.suggestion-user-value').first().text()
    ).toEqual('1234');
  });

  it('call dataProvider, resolve suggestions, and render custom component', async () => {
    let resolveHandler;

    const dataProvider = sinon.spy(() => {
      return new Promise((_resolve) => {
        resolveHandler = (data) => _resolve(data);
      });
    });

    const customType = 'custom';

    const custom = ({ value, component, ...ignored }, { isHighlighted }) => {
      return (
        <MenuItem
          component="div"
          className={`suggestion-${component}`}
          selected={isHighlighted}
        >
          <span className={`render-${component}`}>{value}</span>
        </MenuItem>
      );
    };

    const componentTypes = { [customType]: custom };

    const component = mount(
      <WrapperWithTheme>
        <Autocomplete
          {...defaultProps}
          dataProvider={dataProvider}
          componentTypes={componentTypes}
        />
      </WrapperWithTheme>
    );

    await act(async () => {
      const inputField = component.find('input');
      inputField.simulate('change', { target: { value: 'ale' } });
      inputField.simulate('focus');
    });

    component.mount();

    await act(async () => {
      resolveHandler([
        {
          title: 'Users',
          suggestion: [
            { name: 'sherod taylor', component: customType, value: 1234 },
          ],
        },
      ]);
    });

    component.mount();

    const suggestionsContainer = component.find('div.suggestionsContainer');

    expect(dataProvider.calledWith('ale')).toBeTruthy();

    // check custom component was rendered
    expect(suggestionsContainer.find('.render-custom').first().text()).toEqual(
      '1234'
    );
  });
});
