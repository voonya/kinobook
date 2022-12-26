import vars from 'src/variables.scss';

export const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    inset: 'none',
    backgroundColor: vars.bgDark,
    border: 'none',
    height: 'auto',
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: vars.bgModalOverlay,
  },
};
