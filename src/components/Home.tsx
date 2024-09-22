import { Link } from "react-router-dom";

type ProductsProp = {
  products: any[];
  search: string;
  menu: string;
};


const Home = ({ products, search, menu }: ProductsProp) => {
  console.log(products[0])
  return (
    <div className="grid grid-cols-4 p-5">
      {products
        .filter((data) => data.title.includes(search || menu))
        .map((data) => (
          <Link to="/details" state={{ data }} key={data.id}>
            <div className="border border-spacing-1 p-2 ml-3 mt-3">
              {data.imageUrl ? (
                <img src={data.imageUrl} className="w-60 h-48" alt={data.title} />
              ) : data.images && data.images.length > 0 ? (
                <img src={data.images[0]} className="w-60 h-48" alt={data.title} />
              ) : (
                <img src="placeholder-image-url" className="w-60 h-48" alt="No image available" />
              )}
              <h1 className="font-bold text-xl">$ {data.price}</h1>
              <h1>{data.title}</h1>
              <h1>{data.category}</h1>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Home;
