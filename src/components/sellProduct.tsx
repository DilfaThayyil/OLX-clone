import { useState } from "react"
import {ref,uploadBytes,getDownloadURL} from "firebase/storage"
import { storage } from "../firebase/setup"
import axios from "axios"

const SellProduct = ()=>{
    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [images,setImage] = useState<File[]>([])
    const [uploading,setUploading] = useState(false)

    const handleImageUpload = (e:any)=>{
        setImage(e.target.files)
    }

    const uploadImagesToFirebase = ()=>{

        const uploadedUrls:string[] = []

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const storageRef = ref(storage, `products/${image.name}`);
            const snapshot = await uploadBytes(storageRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);
            uploadedUrls.push(downloadURL);
        }
        return uploadedUrls
    }

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
        setUploading(true)
    }

    try{
        const uploadedImageUrls = await uploadImagesToFirebase()
        const productData = {
            title,
            price,
            description,
            category,
            images:uploadedImageUrls
        }
        await axios.post("",productData)
        
    }

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <input type="text" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value )}/>
            <input type="number" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <textarea placeholder="description" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            <input type="text" placeholder="category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            <input type="file" multiple onChange={handleImageUpload} />
            <button type="submit">Sell Product</button>
        </form>

    )
}

export default SellProduct