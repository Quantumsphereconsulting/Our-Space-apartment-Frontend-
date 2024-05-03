import axios from "axios";
// baseURL: `https://apitest.ourspace.ng/api/`,

export const API = axios.create({
  baseURL: `http://127.0.0.1:8000/api/`,
});

export const apiConfig = (token, type) => {
  return { headers: getHeader(token, type) };
};

function getHeader(token, type) {
  const header = {};
  if (token) header.Authorization = `Bearer ${token}`;
  header.Accept = `application/json`;
  if (type !== "default") header["Content-Type"] = "multipart/form-data";
  return header;
}

export const ROUTES = {
  profile: `user`,
  updateProfile: `user/update`,
  update2fa: `user/update/2fa`,
  verify2fa: `user/verify`,
  register: `user/register`,
  login: `user/login`,
  loginGoogle: `user/login/google`,
  logout: `user/logout`,
  forgotPassword: `user/password/forgot`,
  resetPassword: `user/password/reset`,
  updateAvatar: `user/update/avatar`,
  updatePassword: `user/update/password`,
  fetchTenantBookings: `user/apartment-bookings`,
  fetchReceipts: `user/payment-transactions`,
  landlordRequest: `user/landlord-requests`,
  categories: `categories`,
  duration: `apartment-durations`,
  apartment: `user/apartments`,
  state: `states`,
  city: `cities`,
  lga: `local-governments`,
  amenities: `amenities`,
  rentals: `user/apartment-rentals`,
  bankAccounts: `user/bank-accounts`,
  resend2FA: `admin/verify/resend`,
  addFunds: `user/wallet/add-funds-with-paystack`,
  paymentTransactions: `user/payment-transactions`,
  withdrawalRequests: `user/withdrawal-requests`,
  fundingRequests: `user/wallet-funding-requests`,
  notifications: `user/notifications`,
  systemData: `system-data`,
  walletHistory: `user/wallet-history`,
};
