import React from 'react';
import Grid from '@material-ui/core/Grid';
import CombinedContextProvider from '../context';
import Layout from '../components/layout/layout';
import ProductsContainer from '../container/product';
import CartContainer from '../container/cart';
import ProductList from '../components/product-list/product-list';


const App = props => {
  return (
    <CombinedContextProvider {...props}>
      <Layout>
        <Grid item xs={12}>
        <ProductsContainer>
          {(products, isProductsLoading) => (
            <CartContainer>
              {(isCartLoading, handleAddToCart) => (
                <ProductList
                  products={products}
                  isProductsLoading={isProductsLoading}
                  isCartLoading={isCartLoading}
                  handleAddToCart={handleAddToCart}
                />
              )}
            </CartContainer>
          )}
          </ProductsContainer>
        </Grid>
      </Layout>
    </CombinedContextProvider>

  );  
};

export default App;
// comment to update changed to libs in dev