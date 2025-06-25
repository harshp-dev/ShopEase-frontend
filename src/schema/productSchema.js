import * as Yup from 'yup';

export const addProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  category: Yup.string()
    .required('Category is required')
    .notOneOf([''], 'Please select a category'),
  stock: Yup.number()
    .typeError('Stock must be a number')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  images: Yup.mixed()
    .required('At least one image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) {
        return false;
      }

      return Array.from(value).every((file) => file.type.startsWith('image/'));
    }),
});

export const editProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  category: Yup.string()
    .required('Category is required')
    .notOneOf([''], 'Please select a category'),
  stock: Yup.number()
    .typeError('Stock must be a number')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  images: Yup.mixed().test('fileType', 'Only image files are allowed', (value) => {
    if (!value || value.length === 0) {
      return true;
    }
    return Array.from(value).every((file) => file.type.startsWith('image/'));
  }),
});
