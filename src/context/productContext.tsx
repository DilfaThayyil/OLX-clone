import { createContext, useContext, useState, ReactNode } from "react";

interface ProductContextType {
  products: any[];
  addProduct: (product: any) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<any[]>([]);

  const addProduct = (product: any) => {
    setProducts((prevProducts) => [product, ...prevProducts]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
