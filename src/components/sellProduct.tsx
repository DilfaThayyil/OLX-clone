import { useState } from "react"

const SellProduct = ()=>{
    const [title,setTitle] = useState('')
    const [price,setPrice] = useState('')
    const [description,setDescription] = useState('')
    const [category,setCategory] = useState('')
    const [image,setImage] = useState<File[]>([])

    const handleImageUpload = (e:any)=>{
        setImage(e.target.files)
    }

    const handleSubmit = async(e:any)=>{
        e.preventDefault()
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