import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  addCategorySchema,
  editCategorySchema,
} from '../schema/authSchema';
import { addProductSchema, editProductSchema } from '../schema/productSchema';

export const FormTypes = {
  login: {
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
      },
    ],
    Schema: loginSchema,
    submitButtonLabel: 'Login',
  },

  register: {
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
      },
      {
        name: 'confirmPassword',
        label: 'ConfirmPassword',
        type: 'password',
      },
    ],
    Schema: registerSchema,
    submitButtonLabel: 'Register',
  },
  resetPassword: {
    fields: [
      {
        name: 'newPassword',
        label: 'New Password',
        type: 'password',
      },
      {
        name: 'confirmNewPassword',
        label: 'Confirm New Password',
        type: 'password',
      },
    ],
    Schema: resetPasswordSchema,
    submitButtonLabel: 'Reset Password',
  },

  changePassword: {
    fields: [
      {
        name: 'currentPassword',
        label: 'Current Password',
        type: 'password',
      },
      {
        name: 'newPassword',
        label: 'New Password',
        type: 'password',
      },
      {
        name: 'confirmNewPassword',
        label: 'Confirm New Password',
        type: 'password',
      },
    ],
    Schema: changePasswordSchema,
    submitButtonLabel: 'Change Password',
  },
  forgotPassword: {
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
      },
    ],
    Schema: forgotPasswordSchema,
    submitButtonLabel: 'Send Reset Password Link',
  },
  addProduct: {
    fields: [
      { name: 'name', label: 'Product Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'price', label: 'Price', type: 'number' },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
      },
      { name: 'stock', label: 'Stock', type: 'number' },
      { name: 'images', label: 'Upload Images', type: 'file' },
    ],
    Schema: addProductSchema,
    submitButtonLabel: 'Add Product',
  },
  editProduct: {
    fields: [
      { name: 'name', label: 'Product Name', type: 'text' },
      { name: 'description', label: 'Description', type: 'text' },
      { name: 'price', label: 'Price', type: 'number' },
      {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
          { value: '', label: 'Select a category' },
          { value: 'electronics', label: 'Electronics' },
        ],
      },
      { name: 'stock', label: 'Stock', type: 'number' },
      { name: 'images', label: 'Upload Image', type: 'file' },
    ],
    Schema: editProductSchema,
    submitButtonLabel: 'Update Product',
  },
  addCategory: {
    fields: [
      { name: 'name', label: 'Category Name', type: 'text' },
      { name: 'image', label: 'Upload Image', type: 'file' },
    ],
    Schema: addCategorySchema,
    submitButtonLabel: 'Add Category',
  },
  editCategory: {
    fields: [
      { name: 'name', label: 'Category Name', type: 'text' },
      { name: 'image', label: 'Upload Image', type: 'file' },
    ],
    Schema: editCategorySchema,
    submitButtonLabel: 'Update Category',
  },
};
