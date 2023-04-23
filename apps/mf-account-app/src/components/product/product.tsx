import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';
import useStyles from './style';

const Product = ({ id, title, imageSrc, price, handleAddToCart }) => {
  return (
    <Card elevation={4} style={{ padding: 20 }}>
      <CardHeader
        action={<IconButton aria-label="settings" onClick={() => handleAddToCart(id)}></IconButton>}
        title={title}
        subheader={price}
      />
    </Card>
  );
};

Product.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};

export default Product;
