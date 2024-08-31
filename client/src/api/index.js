import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function getUserApi() {
  return axios.get(`/api/user/loggedInUser`);
}

export async function getAllCategories() {
  return axios.get(`/api/products`);
}

export async function getAllOfferProducts(page, sortBy) {
  return axios.get(
    `/api/products/offer?page=${page}&sortBy=actual_price&sortOrder=${sortBy}`
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
    `/api/products/category/${category}?page=${page}${brands}&sortBy=actual_price&sortOrder=${sortBy}`
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
    `/api/products/category/${category}/${subcategory}?page=${page}${brands}&sortBy=actual_price&sortOrder=${sortBy}`
  );
}
export async function getSingleProduct(id) {
  return axios.get(`/api/products/single/${id}`);
}

export async function getLatestProducts() {
  return axios.get(`/api/products/latest`);
}

export async function getMostSellingProducts() {
  return axios.get(`/api/products/mostselling`);
}

export async function AddItemToCart(id, quantity, userId) {
  return axios.post(`/api/cart/${userId}`, {
    productId: id,
    quantity,
  });
}

export async function getUserCart(userId) {
  return axios.get(`/api/cart/${userId}`);
}

export async function updateProduct(id, product) {
  return axios.put(`/api/update/product/${id}`, {
    product: product,
  });
}

export async function deleteProduct(id) {
  return axios.delete(
    `/api/admin/delete/product/${id}`
  );
}

export async function updateCartItem(id, quantity, userId) {
  return axios.patch(`/api/cart/${id}/${userId}`, {
    quantity,
  });
}
export async function deleteCartItem(id, userId) {
  return axios.delete(`/api/cart/${id}/${userId}`);
}

export async function getSearchProducts(q) {
  return axios.get(`/api/products/search?q=${q}`);
}
export async function createOrder(userId, totalPrice) {
  return axios.post(`/api/orders/create/${userId}`, {
    totalPrice,
  });
}

export async function getOrders(userId) {
  return axios.get(`/api/orders/${userId}`);
}

export async function getOrderById(id) {
  return axios.get(`/api/admin/orders/${id}`);
}

export async function updateOrderById(id, status) {
  return axios.patch(`/api/admin/update-order/${id}`, {
    status,
  });
}

export async function getProductsOfSingleOrder(id) {
  return axios.get(
    `/api/admin/orders/getProducts/${id}`
  );
}

export async function createProduct(product) {
  return axios.post(`/api/products/create`, product);
}

export async function getAllProductsAdmin() {
  return axios.get(`/api/products/all`);
}

export async function getAllUsersAdmin() {
  return axios.get(`/api/admin/getUsers`);
}

export async function getAllOrdersAdmin() {
  return axios.get(`/api/admin/getAllOrders`);
}

export async function getUserById(id) {
  return axios.get(`/api/admin/getuser/${id}`);
}

export async function createDoctor(doctor) {
  return axios.post(`/api/admin/doctor/create`, doctor);
}

export async function getDoctorById(id) {
  return axios.get(`/api/admin/doctors/${id}`);
}

export async function updateDoctor(id, doctor) {
  return axios.put(`/api/update/doctor/${id}`, {
    doctor,
  });
}

export async function deleteDoctor(id) {
  return axios.delete(`/api/admin/delete/doctor/${id}`);
}

export async function getAllDoctorsAdmin() {
  return axios.get(`/api/doctors/all`);
}

export async function getcustomerOrders(id) {
  return axios.get(
    `/api/admin/getcustomerOrders/${id}`
  );
}

export async function bookAppointment(doctorId, userId) {
  return axios.patch(`/api/doctor/bookAppointment/${doctorId}/${userId}`);
}

export async function getRemainingAppointments(doctorId) {
  return axios.get(`/api/doctor/getRemainingAppointments/${doctorId}`);
}

export async function getCompletedAppointments(doctorId) {
  return axios.get(`/api/doctor/getCompletedAppointments/${doctorId}`);
}

export async function updateAppointmentHistory(userId, doctorId) {
  return axios.patch(`/api/updateAppointmenthistory/${userId}/${doctorId}`);
}

export async function updateAppointmentStatus(doctorId, userEmail) {
  return axios.patch(`/api/doctor/updateApmtStatus/${doctorId}/${userEmail}`);
}

export async function getDashboardData(id) {
  return axios.get(`/api/admin/getDashboardData`);
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

export const loginAPI = `/api/login`;
export const signupAPI = `/api/signup`;
export const checkLoggedInAPI = `/api/checkLoggedIn/`;
