import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from './style';
import Product from '../product/product';

const ProductList = ({ products, isProductsLoading, isCartLoading, handleAddToCart }) => {
  if (isProductsLoading || isCartLoading) return <Typography>Loading...</Typography>;
  if (!products || !products.length) return <Typography>No products</Typography>;
  return (
    <div>
      <Grid container spacing={2} alignItems="flex-start">
        {products.map((product) => (
          <Grid item xs={6} md={3} key={product.id}>
            <Product
              id={product.id}
              title={product.title}
              imageSrc={product.imageSrc}
              price={product.price}
              handleAddToCart={handleAddToCart}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

ProductList.propTypes = {
  isLoading: PropTypes.bool,
  products: PropTypes.array,
};

export default ProductList;
