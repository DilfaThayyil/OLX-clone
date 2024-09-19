import { useState } from "react";
import { storage, db } from "../firebase/setup"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const SellProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null); 
  const [uploading, setUploading] = useState(false);
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
    const storageRef = ref(storage, `products/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        toast.error(`Error uploading image: ${error.message}`);
        setUploading(false);
      },
      async () => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        
        try {
          await addDoc(collection(db, "products"), {
            title,
            description,
            price: Number(price),
            category,
            imageUrl,
          });
          toast.success("Product uploaded successfully!");
          setUploading(false);
          navigate("/");
        } catch (err) {
          if (err instanceof Error) {
            toast.error(`Error saving product: ${err.message}`);
          } else {
            toast.error("An unknown error occurred");
          }
          setUploading(false);
        }
      }
    );
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
          ></textarea>
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
