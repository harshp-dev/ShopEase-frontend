import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Stack, Card } from '@mui/material';
import SmallProductCard from '../product/SmallProductCard';
import { fetchProductsByCategory, fetchProductsByUser } from '../../redux/slices/product';
import LoadingSpinner from '../common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import InputField from '../common/InputField';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';

const CategorySection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading: categoryLoading } = useSelector((state) => state.category);
  const {
    productsByCategory,
    products,
    loading: productLoading,
  } = useSelector((state) => state.product);
  const { register, watch } = useForm({
    defaultValues: {
      selectedCategory: '',
      search: '',
    },
  });

  const selectedCategory = watch('selectedCategory');
  const search = watch('search');
  const debounceTimeout = useRef(null);
  const categoryOptions = [
    { label: 'All Categories', value: '' },
    ...categories.map((cat) => ({
      label: cat.name,
      value: cat.name,
    })),
  ];
  // useEffect(() => {
  //   if (!categories || categories.length === 0) {
  //     dispatch(fetchCategories({ page: 1, limit: 10 }));
  //   }
  // }, [dispatch]);

  useEffect(() => {
    if (!categories.length) {
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (selectedCategory) {
        dispatch(fetchProductsByCategory({ category: selectedCategory, search, limit: 10 }));
      } else if (search) {
        dispatch(fetchProductsByUser({ search, limit: 20 }));
      } else {
        categories.forEach((category) => {
          dispatch(fetchProductsByCategory({ category: category.name, limit: 5 }));
        });
      }
    }, 400);

    return () => clearTimeout(debounceTimeout.current);
  }, [selectedCategory, search, categories, dispatch]);

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

  const categoryList = selectedCategory
    ? [selectedCategory]
    : search
      ? ['All Products']
      : categories.map((cat) => cat.name);

  return (
    <Box sx={{ px: 2, py: 2 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Box sx={{ width: 250, mb: 3 }}>
          <InputField
            name="selectedCategory"
            label="Filter by Category"
            type="select"
            register={register}
            options={categoryOptions}
            error={null}
            helperText=""
            required={false}
          />
        </Box>
        <Box sx={{ maxWidth: 300, mb: 3 }}>
          <InputField
            name="search"
            label="Search products"
            type="text"
            register={register}
            required={false}
          />
        </Box>
      </Stack>
      {categoryList.map((categoryName) => {
        const isSearch = !selectedCategory && search;
        const productsToShow = isSearch
          ? products || []
          : productsByCategory[categoryName]?.items || [];

        return (
          <Card
            key={categoryName}
            sx={{ backgroundColor: '#f5f9fc', mb: 4, px: 2, py: 2, borderRadius: '8px' }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{categoryName}</Typography>
              <Button
                variant="text"
                size="small"
                onClick={() => navigate(`/user/category/${categoryName}`)}
              >
                View More
              </Button>
            </Stack>

            {productLoading && !productsToShow.length ? (
              <LoadingSpinner />
            ) : (
              <Stack direction="row" sx={{ mt: 2 }} spacing={4}>
                {productsToShow.map((product) => (
                  <SmallProductCard key={product._id} product={product} />
                ))}
                {!productsToShow.length && (
                  <Typography variant="body2">No products found</Typography>
                )}
              </Stack>
            )}
          </Card>
        );
      })}
    </Box>
  );
};

export default CategorySection;
