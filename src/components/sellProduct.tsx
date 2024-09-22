import { useState } from "react";
import { db } from "../firebase/setup"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import { useProductContext } from "../context/productContext";

const SellProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null); 
  const [uploading, setUploading] = useState(false);
  const { addProduct } = useProductContext();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price || !category || !image) {
      toast.error("Please fill all fields");
      return;
    }
  
    setUploading(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `products/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Error uploading image:", error);
          toast.error(`Error uploading image: ${error.message}`);
          setUploading(false);
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          
          console.log({
            title,
            description,
            price: Number(price),
            category,
            imageUrl,
          });

          try {
            const docRef = await addDoc(collection(db, "products"), {
              title: title.trim(),
              description: description.trim(),
              price: Number(price),
              category: category.trim(),
              imageUrl,
            });

            addProduct({ id: docRef.id, title, description, price: Number(price), category, imageUrl });

            toast.success("Product uploaded successfully!");
            setUploading(false);
            navigate("/"); 
          } catch (err) {
            console.error("Error saving product: ", err instanceof Error ? err.message : err);
            toast.error(`Error saving product: ${err instanceof Error ? err.message : "Unknown error"}`);
            setUploading(false);
          }
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Failed to upload product. Please try again.");
      setUploading(false);
    }
  };
  
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Sell Your Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 mb-4 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
};

export default SellProduct;
