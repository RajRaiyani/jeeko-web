import axiosInstance from "./httpServices";


export async function listProductCategories(): Promise<any> {
  const url = '/product-categories';
  return axiosInstance({ method: 'GET', url });
}