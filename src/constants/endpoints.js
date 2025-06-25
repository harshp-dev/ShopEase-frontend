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
    GET_CATEGORIES: '/category',
  },
  PRODUCT: {
    GET_PRODUCT: '/products',
  },
  CART: {
    GET_CART: '/cart',
    ADD_TO_CART: '/cart',
    UPDATE_CART_ITEM: '/cart',
    REMOVE_CART_ITEM: '/cart',
  },
};
