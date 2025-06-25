import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Stack, Card } from '@mui/material';
import SmallProductCard from '../Product/SmallProductCard';
import { fetchCategories } from '../../redux/slices/category';
import { fetchProductsByCategory } from '../../redux/slices/product';
import LoadingSpinner from '../common/LoadingSpinner';

const CategorySection = () => {
  const dispatch = useDispatch();

  const { categories, loading: categoryLoading } = useSelector((state) => state.category);
  const { productsByCategory, loading: productLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories({ page: 1, limit: 10 }));
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (categories.length) {
      categories.forEach((category) => {
        const isProductPresent = !!productsByCategory[category.name];
        if (!isProductPresent) {
          dispatch(fetchProductsByCategory({ category: category.name, limit: 5 }));
        }
      });
    }
  }, [categories, productsByCategory, dispatch]);

  if (categoryLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <Box sx={{ px: 2, py: 2 }}>
      {categories.map((category) => {
        const productData = productsByCategory[category.name];
        const products = productData?.items || [];

        return (
          <Card
            key={category.name}
            sx={{ backgroundColor: '#f5f9fc', mb: 4, px: 2, py: 2, borderRadius: '8px' }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{category.name}</Typography>
              <Button variant="text" size="small">
                View More
              </Button>
            </Stack>

            {productLoading && !products.length ? (
              <LoadingSpinner />
            ) : (
              <Stack direction="row" sx={{ mt: 2 }} spacing={4}>
                {products.map((product) => (
                  <SmallProductCard key={product._id} product={product} />
                ))}
                {!products.length && <Typography variant="body2">No products found</Typography>}
              </Stack>
            )}
          </Card>
        );
      })}
    </Box>
  );
};

export default CategorySection;
