export const endpoints = {
  AUTH: {
    REGISTER_ENDPOINT: '/auth/register',
    LOGIN_ENDPOINT: '/auth/login',
    ADMIN_LOGIN_ENDPOINT: '/auth/admin-login',
    CHANGE_PASSWORD_ENDPOINT: '/auth/change-password',
    FORGOT_PASSWORD_ENDPOINT: '/auth/forgot-password',
    RESET_PASSWORD_ENDPOINT: '/auth/reset-password',
    REFRESH_TOKEN_ENDPOINT: '/auth/refresh-token',
    LOGOUT_ENDPOINT: '/auth/logout',
    ME_ENDPOINT: 'auth/me',
  },
  CATEGORY: {
    GET_ALL_CATEGORIES: '/category',
    GET_CATEGORIES: '/category',
    DELETE_CATEGORY: '/category/delete',
    UPDATE_CATEGORY: '/category',
    ADD_CATEGORY: '/category/add',
  },

  PRODUCT: {
    GET_PRODUCT_BY_ID_ENDPOINT: '/products',
    DELETE_PRODUCT: '/products',
    UPDATE_PRODUCT: '/products',
    GET_PRODUCT: '/products',
  },
};
