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
        name: 'confirmpassword',
        label: 'ConfirmPassword',
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
