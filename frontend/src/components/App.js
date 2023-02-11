import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Homepage from "./home/Homepage";
import Login from "./login/Login";
import Register from "./register/Register";
import UserContext from "../components/context/UserContext";
import ProductsAnimals from "./products/animals/Animals";
import Cart from "./cart/Cart";
import useLocalStorage from "./hooks/useLocalStorage";
import MyAccount from "./account/MyAccount";
import Address from "./account/Address";
import PaymentCard from "./payment/Card";
import Payment from "./payment/Payment";
import Pix from "./payment/Pix";
import MyOrders from "./account/MyOrders";

export default function App() {
  const [contcar, setContcar] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [productsAnimals, setProductsAnimals] = useState("");
  const [userData, setUserData] = useLocalStorage("userData", {});
   const [totalProducts, setTotalProducts] = useState(0);

  return (
    <UserContext.Provider
      value={{
        productsAnimals,
        setProductsAnimals,
        contcar,
        setContcar,
        refresh,
        setRefresh,
        userData,
        setUserData,
        totalProducts,
        setTotalProducts,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dogs" element={<ProductsAnimals />} />
          <Route path="/cats" element={<ProductsAnimals />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/address" element={<Address />} />
          <Route path="/account/orders" element={<MyOrders />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/pix" element={<Pix />} />
          <Route path="/payment/card" element={<PaymentCard />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
