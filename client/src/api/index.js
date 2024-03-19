import axios from "axios";
import { jwtDecode } from "jwt-decode";
import getBaseUrl from './checkEnvironment';

const baseUrl = getBaseUrl();

export async function getUserApi() {
  return axios.get(`${baseUrl}/user/loggedInUser`);
}

export async function getAllCategories() {
  return axios.get(`${baseUrl}/products`);
}

export async function getAllOfferProducts(page, sortBy) {
  return axios.get(
    `${baseUrl}/products/offer?page=${page}&sortBy=actual_price&sortOrder=${sortBy}`
  );
}

export async function getAllProductsByCategory(
  category,
  page,
  filterArr,
  sortBy
) {
  let brands = "";
  filterArr.forEach((el) => {
    brands += `&brand=${el}`;
  });
  return axios.get(
    `${baseUrl}/products/category/${category}?page=${page}${brands}&sortBy=actual_price&sortOrder=${sortBy}`
  );
}
export async function getAllProductsBySubCategory(
  page,
  subcategory,
  category,
  filterArr,
  sortBy
) {
  let brands = "";
  filterArr.forEach((el) => {
    brands += `&brand=${el}`;
  });
  return axios.get(
    `${baseUrl}/products/category/${category}/${subcategory}?page=${page}${brands}&sortBy=actual_price&sortOrder=${sortBy}`
  );
}
export async function getSingleProduct(id) {
  return axios.get(`${baseUrl}/products/single/${id}`);
}

export async function getLatestProducts() {
  return axios.get(`${baseUrl}/products/latest`);
}

export async function getMostSellingProducts() {
  return axios.get(`${baseUrl}/products/mostselling`);
}

export async function AddItemToCart(id, quantity, userId) {
  return axios.post(`${baseUrl}/cart/${userId}`, {
    productId: id,
    quantity,
  });
}

export async function getUserCart(userId) {
  return axios.get(`${baseUrl}/cart/${userId}`);
}

export async function updateProduct(id, product) {
  return axios.put(`${baseUrl}/update/product/${id}`, {
    product: product,
  });
}

export async function deleteProduct(id) {
  return axios.delete(
    `${baseUrl}/admin/delete/product/${id}`
  );
}

export async function updateCartItem(id, quantity, userId) {
  return axios.patch(`${baseUrl}/cart/${id}/${userId}`, {
    quantity,
  });
}
export async function deleteCartItem(id, userId) {
  return axios.delete(`${baseUrl}/cart/${id}/${userId}`);
}

export async function getSearchProducts(q) {
  return axios.get(`${baseUrl}/products/search?q=${q}`);
}
export async function createOrder(userId, totalPrice) {
  return axios.post(`${baseUrl}/orders/create/${userId}`, {
    totalPrice,
  });
}

export async function getOrders(userId) {
  return axios.get(`${baseUrl}/orders/${userId}`);
}

export async function getOrderById(id) {
  return axios.get(`${baseUrl}/admin/orders/${id}`);
}

export async function updateOrderById(id, status) {
  return axios.patch(`${baseUrl}/admin/update-order/${id}`, {
    status,
  });
}

export async function getProductsOfSingleOrder(id) {
  return axios.get(
    `${baseUrl}/admin/orders/getProducts/${id}`
  );
}

export async function createProduct(product) {
  return axios.post(`${baseUrl}/products/create`, product);
}

export async function getAllProductsAdmin() {
  return axios.get(`${baseUrl}/products/all`);
}

export async function getAllUsersAdmin() {
  return axios.get(`${baseUrl}/admin/getUsers`);
}

export async function getAllOrdersAdmin() {
  return axios.get(`${baseUrl}/admin/getAllOrders`);
}

export async function getUserById(id) {
  return axios.get(`${baseUrl}/admin/getuser/${id}`);
}

export async function createDoctor(doctor) {
  return axios.post(`${baseUrl}/admin/doctor/create`, doctor);
}

export async function getDoctorById(id) {
  return axios.get(`${baseUrl}/admin/doctors/${id}`);
}

export async function updateDoctor(id, doctor) {
  return axios.put(`${baseUrl}/update/doctor/${id}`, {
    doctor,
  });
}

export async function deleteDoctor(id) {
  return axios.delete(`${baseUrl}/admin/delete/doctor/${id}`);
}

export async function getAllDoctorsAdmin() {
  return axios.get(`${baseUrl}/doctors/all`);
}

export async function getcustomerOrders(id) {
  return axios.get(
    `${baseUrl}/admin/getcustomerOrders/${id}`
  );
}

export async function bookAppointment(doctorId, userId) {
  return axios.patch(`${baseUrl}/doctor/bookAppointment/${doctorId}/${userId}`);
}

export async function getRemainingAppointments(doctorId) {
  return axios.get(`${baseUrl}/doctor/getRemainingAppointments/${doctorId}`);
}

export async function getCompletedAppointments(doctorId) {
  return axios.get(`${baseUrl}/doctor/getCompletedAppointments/${doctorId}`);
}

export async function updateAppointmentHistory(userId, doctorId) {
  return axios.patch(`${baseUrl}/updateAppointmenthistory/${userId}/${doctorId}`);
}

export async function updateAppointmentStatus(doctorId, userEmail) {
  return axios.patch(`${baseUrl}/doctor/updateApmtStatus/${doctorId}/${userEmail}`);
}

export async function getDashboardData(id) {
  return axios.get(`${baseUrl}/admin/getDashboardData`);
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  const decodedToken = token && jwtDecode(token);
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedToken?.exp > currentTime) return true;
  else return false;
};

export const loginAPI = `${baseUrl}/login`;
export const signupAPI = `${baseUrl}/signup`;
export const checkLoggedInAPI = `${baseUrl}/checkLoggedIn/`;
