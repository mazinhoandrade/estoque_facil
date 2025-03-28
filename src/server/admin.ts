import { Category } from "@prisma/client";

import { Product } from "../types/product";
import { req } from "./axios";

export const getProducts = async (): Promise<Product[] | []> => {
  try {
    const result = await req.get("products");
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const setProduct = async (
  data: Omit<Product, "id">,
): Promise<Product> => {
  try {
    const result = await req.post("products", data);
    return result.data;
  } catch (error) {
    console.log(error);
    return {} as Product;
  }
};

export const delProduct = async (id: string) => {
  try {
    return await req.delete(`products/${id}`);
  } catch (error) {
    return error;
  }
};

// category

export const getCategories = async (): Promise<Category[] | []> => {
  try {
    const result = await req.get("categories");
    return result.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const setCategory = async (
  data: Omit<Category, "id">,
): Promise<Category> => {
  try {
    const result = await req.post("categories", data);
    return result.data;
  } catch (error) {
    console.log(error);
    return {} as Product;
  }
};

export const delCategory = async (id: string) => {
  try {
    return await req.delete(`categories/${id}`);
  } catch (error) {
    return error;
  }
};
// export const editUser = async (data: User): Promise<User> => {
//   const result = await req.patch(`api/user/${data.id}`, data, {
//     headers: {
//       Authorization: `Bearer ${getCookie("BearerUser")}`,
//     },
//   });
//   return result.data;
// };

// //booking

// export const getBookingActive = async (idUser: string, token: string) => {
//   const result = await req.get(`api/booking/active/${idUser}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   return result.data;
// };

// export const setBooking = (data: Omit<CreateBooking, "id">) => {
//   const result = req.post(`api/booking`, data, {
//     headers: {
//       Authorization: `Bearer ${getCookie("BearerUser")}`,
//     },
//   });
//   return result;
// };

//favorite
