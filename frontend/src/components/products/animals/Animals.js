import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import styled from "styled-components";
import api from "../../../services/api";
import { useEffect } from "react";
import Header from "../../home/Header";
import Footer from "../../home/Footer";
import BoxProduct from "./BoxProductAnimals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

export default function ProductsAnimals() {
  const [products, setProducts] = useState([]);

  const context = useContext(UserContext);

  async function renderProducsDogs() {
    try {
      const resp = await api.get(
        `/products/${context.productsAnimals}`
      );
      setProducts(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    renderProducsDogs();
  }, []);

  return (
    <StyledDogs>
      <Header />
      <ToastContainer autoClose={2500} pauseOnHover={false} />
      <div className="container-products">
        {products.length > 0 ? (
          <>
            {products.map((product, key) => (
              <BoxProduct product={product} key={key} />
            ))}
          </>
        ) : (
          "Não existe intens para dogs"
        )}
      </div>

      <Footer />
    </StyledDogs>
  );
}

const StyledDogs = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #fde02c;
  display: flex;
  flex-direction: column;
  .container-products {
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  .product {
    margin: 50px auto;
    background-color: #ffee7c; //#ffee7c
    max-width: 700px;
    max-height: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
  }

  .product img {
    max-width: 250px;
    height: 250px;
  }

  .product .infos {
    padding: 5px;
    border-radius: 5px;
  }

  .product .infos h2 {
    font-size: 22px;
  }

  .infos .preco {
    font-size: 35px;
    font-weight: 300;
    margin-top: 20px;
  }

  .infos h3 {
    font-size: 18px;
    margin-bottom: 25px;
    font-weight: 400;
  }

  .infos input {
    max-width: 60px;
    margin-left: 10px;
    outline: none;
    margin-right: 5px;
  }

  .infos button {
    background-color: #2968c8;
    color: white;
    height: 50px;
    width: 300px;
    border-radius: 15px;
    margin-top: 20px;
    cursor: pointer;
  }
`;
