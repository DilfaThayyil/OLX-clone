import { useProductContext } from "../context/productContext";

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => (
        <div key={index} className="border p-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-40 object-cover"
          />
          <h2 className="mt-2 text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-500">Price: ${product.price}</p>
          <p className="text-gray-600">Category: {product.category}</p>
          <p className="mt-2">{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
