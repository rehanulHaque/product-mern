// import { Button } from '@chakra-ui/react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/add"  element={<CreateProduct/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
