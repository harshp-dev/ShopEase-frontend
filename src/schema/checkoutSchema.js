import * as yup from 'yup';
export const checkoutSchema = yup.object().shape({
  address: yup.object().shape({
    street: yup
      .string()
      .trim()
      .min(3, 'Street must be at least 3 characters')
      .max(100, 'Street cannot exceed 100 characters')
      .required('Street is required'),
    city: yup
      .string()
      .trim()
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City cannot exceed 50 characters')
      .required('City is required'),
    state: yup
      .string()
      .trim()
      .min(2, 'State must be at least 2 characters')
      .max(50, 'State cannot exceed 50 characters')
      .required('State is required'),
    zip: yup
      .string()
      .trim()
      .matches(/^\d{6}$/, 'Zip Code must be 6 digits')
      .required('Zip Code is required'),
  }),
  mobileNo: yup
    .string()
    .trim()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
});
