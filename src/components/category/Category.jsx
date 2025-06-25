import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/category';
import Carousel from './Carousel';
import LoadingSpinner from '../common/LoadingSpinner';

const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories({ page: 1, limit: 10 }));
    }
  }, [categories.length]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  return <Carousel items={categories} imageKey="image" titleKey="name" slidesToShow={4} />;
};

export default Category;
