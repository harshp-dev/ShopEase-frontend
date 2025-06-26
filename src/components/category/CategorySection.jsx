import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Stack, Card } from '@mui/material';
import SmallProductCard from '../product/SmallProductCard';
import { fetchProductsByCategory } from '../../redux/slices/product';
import LoadingSpinner from '../common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const CategorySection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading: categoryLoading } = useSelector((state) => state.category);
  const { productsByCategory, loading: productLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (categories.length) {
      categories.slice(0, 10).forEach((category) => {
        const isProductPresent = !!productsByCategory[category.name];
        if (!isProductPresent) {
          dispatch(fetchProductsByCategory({ category: category.name, limit: 5 }));
        }
      });
    }
  }, [categories]);

  if (categoryLoading) {
    return <LoadingSpinner />;
  }

  if (!categoryLoading && categories.length === 0) {
    return (
      <Box sx={{ px: 2, py: 4, textAlign: 'center' }}>
        <Typography variant="h6">No categories found.</Typography>
      </Box>
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
              <Button
                variant="text"
                size="small"
                onClick={() => navigate(`/user/category/${category.name}`)}
              >
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
