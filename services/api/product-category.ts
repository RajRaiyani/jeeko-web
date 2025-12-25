import axiosInstance from "./httpServices";


export async function listProductCategories() {
  const url = '/product-categories';
  return axiosInstance({ method: 'GET', url });
}