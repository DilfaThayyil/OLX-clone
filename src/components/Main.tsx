import { useEffect, useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"
import axios from 'axios'
import { fetchItemsFromFireStore } from "../firebase/setup"


interface Product{
  id: string
  title: string
  description: string
  price: number
  category: string
  imageUrl: string
}

const Main = () => {

  const [prod,setProd] = useState<Product[]>([])
  const [search,setSearch] = useState("")
  const [menu,setMenu] = useState("")

  const getProducts = async() =>{
    try{
      const {data} = await axios.get('https://dummyjson.com/products')
      return data.products
    }catch(err){
      console.error(err)
    }
  }

  const getFirebaseProducts = async()=>{
    try{
      const firebaseProducts = await fetchItemsFromFireStore()
      return firebaseProducts
    }catch(err){
      console.error(err)
    }
  }

  const fetchAllProducts = async()=>{
    const [dummyProducts,firebaseProducts] = await Promise.all([
      getProducts(),
      getFirebaseProducts()
    ])

    const combinedProducts = [...firebaseProducts || [], ...dummyProducts]
    setProd(combinedProducts)
  }

  useEffect(()=>{
    fetchAllProducts()
  },[])

  return (
    <div>
      <Navbar setSearch={setSearch}/>
      <Menubar setMenu={setMenu}/>
      <Home products={prod} search={search} menu={menu}/>
      <Footer/>
    </div>
  )
}

export default Main