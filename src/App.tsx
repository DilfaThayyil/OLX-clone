import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import SellProduct from "./components/sellProduct"

const App = () => {
  return (
   <>
   <Routes>
   <Route path="/" element={<Main/>}/>
   <Route path="/details" element={<Details/>}/>
   <Route path="/sellProduct" element={<SellProduct/>}/>
   </Routes>
   </>
  )
}

export default App