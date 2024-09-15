import { create } from "zustand";
import { ProductTypes } from "../types";

interface ProductStore {
  createProduct: (data: any) => Promise<any>;
  deleteProduct: (pid: any) => Promise<any>;
  editProduct: (pid: any, data: any) => Promise<any>;
  products: ProductTypes[];
  setProducts: (products: ProductTypes[]) => void;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [] as ProductTypes[],
  setProducts: (products: ProductTypes[]) =>
    set((state: any) => ({ ...state, products })),
  createProduct: async (newProduct: ProductTypes) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { sucess: false, message: "All fields are required" };
    }
    const response = await fetch("http://localhost:3000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    set((state: any) => ({ ...state, products: [...state.products, data] }));
    return { sucess: true, message: "Product Created" };
  },
  fetchProducts: async () => {
    const response = await fetch("http://localhost:3000/api/product");
    const data = await response.json();
    set({ products: data.products });
  },
  deleteProduct: async (pid) => {
    const response = await fetch(`http://localhost:3000/api/product/${pid}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if(!data.sucess) return { sucess: false, message: data.message };
    set(state => ({products: state.products.filter((product: ProductTypes) => product._id !== pid)}));
    return {sucess: true, message: data.message}
  },
  editProduct: async (pid, data) => {
    const response = await fetch(`http://localhost:3000/api/product/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if(!result.sucess) return { sucess: false, message: result.message };
    set(state => ({products: state.products.map((product: ProductTypes) => product._id === pid ? result.data : product)}));
    return {sucess: true, message: result.message}
  }
}));
