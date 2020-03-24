import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

function Theme(props) {
  const theme = useMemo(() => {
    return {
      borderRadius: '10px',
      colors: {
        accent: '#182233',
        background: '#0f151f',
        foreground: '#fafafa',
        success: '#2dce89',
        danger: '#f5365c',
        transparent: '#ffffff00',
        info: '#5e72e4',
        warning: '#fb6340',
      },
    };
  }, []);

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
