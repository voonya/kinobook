import type { StylesConfig } from 'react-select';
import vars from 'src/variables.scss';

export const customStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    background: `${vars.bgLightDark}`,
    '*': {
      boxShadow: 'none !important',
    },
    boxShadow: 'none',
    borderColor: state.isFocused ? 'white' : `${vars.bgLightDark}`,
    '&:hover': {
      borderColor: state.isFocused ? 'white' : `${vars.bgLightDark}`,
    },
    padding: '1px',
    color: '#fff',
  }),
  menu: (base) => ({
    ...base,
    background: `${vars.bgLightDark}`,
    borderRadius: 0,
    marginTop: 0,
    padding: '10px 0',
    color: '#fff',
  }),
  container: (base) => ({
    ...base,
    width: '100%',
    color: '#fff',
  }),
  menuList: (base) => ({
    ...base,
    background: `${vars.bgLightDark}`,
    padding: 0,
    color: '#fff',
  }),
  option: (base) => ({
    ...base,
    cursor: 'pointer',
    backgroundColor: `${vars.bgLightDark}`,
    '&:hover': { backgroundColor: `${vars.bgLightDark}` },
    color: '#fff',
  }),
  multiValue: (styles) => ({
    ...styles,
    background: `${vars.bgPrimary}`,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    background: `${vars.bgLightPrimary}`,
    color: '#fff',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    ':hover': { backgroundColor: `${vars.danger}` },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    ':hover': { color: `${vars.danger}` },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    ':hover': { color: `${vars.bgLightPrimary}` },
  }),
  input: (styles) => ({
    ...styles,
    color: '#fff',
  }),
};
