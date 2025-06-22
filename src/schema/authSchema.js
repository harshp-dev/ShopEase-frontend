import * as yup from 'yup';

export const registerSchema = yup.object({
  username: yup.string().trim().required('Username is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
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
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
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
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmNewPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
