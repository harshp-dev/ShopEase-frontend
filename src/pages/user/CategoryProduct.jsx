import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByUser } from '../../redux/slices/product';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import SmallProductCard from '../../components/product/SmallProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import InputField from '../../components/common/InputField';
const CategoryProduct = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.product);
  const { register, watch } = useForm({ defaultValues: { search: '' } });
  const search = watch('search');
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (!categoryName) {
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      dispatch(fetchProductsByUser({ category: categoryName, search, limit: 20 }));
    }, 500);

    return () => clearTimeout(debounceTimeout.current);
  }, [search, categoryName, dispatch]);
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        {categoryName} Products
      </Typography>

      <Box sx={{ width: 200 }}>
        <InputField
          name="search"
          label="Search products"
          type="text"
          register={register}
          required={false}
          sx={{
            mb: 2,
            width: 200,
            backgroundColor: '#f9f9f9',
            borderRadius: 1,
          }}
        />
      </Box>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : products.length === 0 ? (
        <Typography>No products found in this category.</Typography>
      ) : (
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {products.map((product) => (
            <Stack item key={product._id} xs={6} sm={4} md={3} lg={2}>
              <SmallProductCard product={product} />
            </Stack>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CategoryProduct;
