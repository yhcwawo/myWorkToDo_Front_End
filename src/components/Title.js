import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    
    <Typography component="h2" variant="h5" color="secondary" gutterBottom>
      <strong>{props.children}</strong> 
    </Typography>

  );
}

Title.propTypes = {
  children: PropTypes.node,
};