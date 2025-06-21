export const FormTypes = {
  login: {
    fields: [
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
    ],
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
  },
  resetPassword: {
    fields: [
      {
        name: 'newPassword',
        label: 'New Password',
        type: 'password',
      },
      {
        name: 'confirmPassword',
        label: 'Confirm NewP assword',
        type: 'password',
      },
    ],
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
  },
  forgot: {
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
      },
    ],
  },
};
