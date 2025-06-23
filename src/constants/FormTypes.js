import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '../schema/authSchema';

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
};
