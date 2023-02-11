import styled from "styled-components";
import React from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function BoxProduct(params) {
  const context = useContext(UserContext);

  async function addToCart(img_url, name, price, quantity, stock) {
    try {
      await api.post(
        "/cart",
        {
          img_url,
          name,
          price,
          quantity,
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast("🦄 Produto adicionado ao carrinho com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      context.setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StyledBoxProduct key={params.key}>
      <div
        className="container"
        onClick={() => {
          addToCart(
            params.product.img_url,
            params.product.name,
            params.product.price,
            1,
            params.product.stock
          );
        }}
      >
        <div className="image">
          <img src={params.product.img_url} alt="imgurl" />
        </div>
        <div className="informations">
          <h1>{params.product.name}</h1>
          <h2>{params.product.description}</h2>
          <h3>
            de <strong>R$ {`${params.product.price / 100}`.replace(".", ",")}</strong> por:
          </h3>
          <h4>R$ 
            {`${((params.product.price - params.product.price * 0.15) / 100).toFixed(2)}`.replace(".", ",")}
          </h4>
          <h5>No Pix com 15% de desconto</h5>
        </div>
      </div>
    </StyledBoxProduct>
  );
}

const StyledBoxProduct = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    margin-top: 60px;
    background-color: #ffee7c;
    padding: 30px;
    width: 100%;
    max-width: 300px;
    cursor: pointer;
  }

  .image {
    width: 150px;
    height: 150px;
    background-color: white;
    margin-bottom: 10px;
  }

  img {
    padding: 10px;
    width: 150px;
    height: 150px;
  }

  .informations {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .informations h1 {
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 20px;
  }

  .informations h2 {
    font-size: 13px;
    font-weight: 400;
    text-align: center;
  }

  .informations h3 {
    font-size: 13px;
    font-weight: 600;
    color: red;
  }

  .informations h3 strong {
  }

  .informations h4 {
    font-size: 25px;
    font-weight: 400;
    color: #515151;
    font-weight: 500;
  }

  .informations h5 {
    font-size: 13px;
    font-weight: 400;
  }
`;
