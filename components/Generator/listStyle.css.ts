import { style } from '@vanilla-extract/css';

export const selectBox = style({
  appearance: 'none',
  backgroundColor: 'transparent',
  backgroundImage: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Gradient color
  border: 'none',
  borderRadius: '4px',
  padding: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  color: '#fff',
  outline: 'none',

  ':hover': {
    backgroundImage: 'linear-gradient(to right, #feb47b, #ff7e5f)', // Reverse gradient on hover
    transform: 'scale(1.05)',
  },

  ':focus': {
    boxShadow: '0 0 10px rgba(255, 126, 95, 0.5)', // Focus shadow
  },
});

export const options = style({
  backgroundColor: '#282c34',
  color: '#fff',
  fontSize: '16px',
});
