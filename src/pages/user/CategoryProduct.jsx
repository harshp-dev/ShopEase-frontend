import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByUser } from '../../redux/slices/product';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import SmallProductCard from '../../components/product/SmallProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const CategoryProduct = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current && categoryName) {
      dispatch(fetchProductsByUser({ category: categoryName, limit: 20 }));
      hasFetchedRef.current = true;
    }
  }, [categoryName]);

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : products.length === 0 ? (
        <Typography>No products found in this category.</Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product._id}>
              <SmallProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CategoryProduct;
