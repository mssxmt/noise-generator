import { style } from '@vanilla-extract/css';

export const rangeInput = style({
  appearance: 'none',
  width: '100%',
  height: '8px',
  borderRadius: '4px',
  background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient color
  outline: 'none',
  transition: 'all 0.3s ease',

  '::-webkit-slider-thumb': {
    appearance: 'none',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'turquoise',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  '::-moz-range-thumb': {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
});

export const rangeLabel = style({
  display: 'block',
  marginBottom: '10px',
  fontSize: '16px',
  color: '#fff',
});
