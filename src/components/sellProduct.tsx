import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/setup"; 
import axios from "axios";
import { toast } from 'react-toastify'; 

const SellProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e: any) => {
    setImages(e.target.files);
  };

  const uploadImagesToFirebase = async () => {
    const uploadedUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const storageRef = ref(storage, `products/${image.name}`);

      const snapshot = await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedUrls.push(downloadURL);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setUploading(true);

    try {
      const uploadedImageUrls = await uploadImagesToFirebase();

      const productData = {
        title,
        price,
        description,
        category,
        images: uploadedImageUrls, 
      };

      await axios.post("your-api-endpoint/sell-product", productData);
      toast.success("Product listed successfully!"); 
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Error listing the product. Please try again."); 
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full mt-2"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mt-2"
      ></textarea>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full mt-2"
      />
      <input
        type="file"
        multiple
        onChange={handleImageUpload}
        className="mt-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 mt-4"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Sell Product"}
      </button>
    </form>
  );
};

export default SellProduct;
