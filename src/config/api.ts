const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  endpoints: {
    orders: "orders",
    customers: "customers",
    orderItems: "order-items",
    products: "products",
    sellers: "sellers",
    platforms: "platforms",
    statuses: "status",
  },
};

export const getApiUrl = (endpoint: keyof typeof config.endpoints) => {
  return `${config.apiBaseUrl}/${config.endpoints[endpoint]}`;
};

export default config;
