import { useEffect, useState } from "react"
import Menubar from "./Menubar"
import Navbar from "./Navbar"
import Home from "./Home"
import Footer from "./Footer"
import axios from 'axios'

const Main = () => {

  const [prod,setProd] = useState([])
  const [search,setSearch] = useState("")
  const [menu,setMenu] = useState("")

  const getProducts = async() =>{
    const data = await axios.get('https://dummyjson.com/products')
    console.log(data.data.products[0])
    setProd(data.data.products)
  }

  useEffect(()=>{
    getProducts()
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