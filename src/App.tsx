import { Route, Routes } from "react-router-dom"
import Main from "./components/Main"
import Details from "./components/Details"
import SellProduct from "./components/sellProduct"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductProvider } from "./components/ProductContext";

const App = () => {
  return (
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details" element={<Details />} />
          <Route path="/sell" element={<SellProduct />} />
        </Routes>
        <ToastContainer />
      </ProductProvider>
  );
};


export default App