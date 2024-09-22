import { useLocation } from "react-router-dom"

const Details = () => {

    const location = useLocation();
    const product = location?.state?.data
    console.log(location)
    console.log("product data : ",location.state.data)

  return (
    <div className="flex p-4">
      {product?.imageUrl ? (
        <img className="w-96 object-cover" src={product.imageUrl} alt={product.title} />
      ) : (
        <img className="w-96 object-cover" src="placeholder-image-url" alt="No image available" />
      )}
      <div>
        <h1 className="font-bold text-3xl">$ {location?.state?.data?.price}</h1>
        <h1 className="mt-5"><span className="font-semibold">Category</span> : {location?.state?.data?.category}</h1>
        <h1 className="mt-5"><span className="font-semibold">Title</span> : {location?.state?.data?.title}</h1>
        <h1 className="mt-5"><span className="font-semibold">Description</span> : {location?.state?.data?.description}</h1>
     </div>
    </div>
  )
}

export default Details