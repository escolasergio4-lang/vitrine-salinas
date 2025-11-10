// Constantes do projeto

export const VALIDATION = {
  PRODUCT_NAME_MIN_LENGTH: 3,
  PRODUCT_NAME_MAX_LENGTH: 100,
  MARKET_NAME_MIN_LENGTH: 3,
  MARKET_NAME_MAX_LENGTH: 100,
  ADDRESS_MIN_LENGTH: 5,
  ADDRESS_MAX_LENGTH: 200,
  WHATSAPP_MIN_LENGTH: 10,
  WHATSAPP_MAX_LENGTH: 11,
  MAX_PRICE: 999999,
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  MERCADOS: '/dashboard/mercados',
  OFERTAS: '/dashboard/ofertas',
} as const;
