import * as yup from 'yup';
import { passwordRegex } from '../constants/constants';

export const registerSchema = yup.object({
  username: yup.string().trim().required('Username is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(passwordRegex.lowercase, 'Password must include lowercase character')
    .matches(passwordRegex.uppercase, 'Password must include uppercase character')
    .matches(passwordRegex.number, 'Password must include number character')
    .matches(passwordRegex.special, 'Password must include special character'),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const loginSchema = yup.object({
  username: yup.string().trim().required('Username is required'),
  password: yup.string().trim().required('Password is required'),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().trim().email('Invalid email').required('Email is required'),
});

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(passwordRegex.lowercase, 'Password must include lowercase character')
    .matches(passwordRegex.uppercase, 'Password must include uppercase character')
    .matches(passwordRegex.number, 'Password must include number character')
    .matches(passwordRegex.special, 'Password must include special character'),
  confirmNewPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().trim().required('Password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(passwordRegex.lowercase, 'Password must include lowercase character')
    .matches(passwordRegex.uppercase, 'Password must include uppercase character')
    .matches(passwordRegex.number, 'Password must include number character')
    .matches(passwordRegex.special, 'Password must include special character'),
  confirmNewPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const addProductSchema = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be a positive number')
    .required('Price is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  images: yup
    .mixed()
    .required('Image files are required')
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value || typeof value === 'string') {
        return false;
      }
      return ['image/jpeg', 'image/png'].includes(value.type);
    }),
});

export const editProductSchema = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be a positive number')
    .required('Price is required'),
  stock: yup
    .number()
    .typeError('Stock must be a number')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  images: yup
    .mixed()
    .nullable()
    .required('Image files are required')
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value || typeof value === 'string') {
        return false;
      }
      return ['image/jpeg', 'image/png'].includes(value.type);
    }),
});

export const addCategorySchema = yup.object({
  name: yup.string().required('Category name is required'),
  image: yup
    .mixed()
    .required('Image files are required')
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value || typeof value === 'string') {
        return false;
      }
      return value && ['image/jpeg', 'image/png'].includes(value.type);
    }),
});
