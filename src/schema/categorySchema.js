import * as yup from 'yup';

export const addCategorySchema = yup.object({
  name: yup.string().required('Category name is required'),
  image: yup.mixed().notRequired(),
});
export const editCategorySchema = yup.object({
  name: yup.string().required('Category name is required'),
  image: yup.mixed().notRequired(),
});
