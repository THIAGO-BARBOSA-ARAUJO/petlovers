import React from "react";
import styled from "styled-components";
import trash from "../../img/icons/trash.png";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";

export default function InfoProducts(props) {
  const context = useContext(UserContext);

  async function removeToCart(id) {
    try {
      await api.delete(`/cart?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast("🦄 Produto removido do carrinho com sucesso!", {
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

  async function updateQuantityCart(id, method) {
    try {
      await api.patch(
        `/cart?id=${id}`,
        {
          method,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      context.setRefresh(true);
    } catch (error) {}
  }

  useEffect(() => {
    context.contcar < 1 ? props.setVazio(true) : props.setVazio(false);
  }, [context.contcar]);

  return (
    <StyledInfoProduct>
      <div className="img-product">
        <img src={props.product.img_url} alt="img_url" />
      </div>
      <div className="characteristics">
        <p>{props.product.name}</p>
      </div>
      <div className="qtd">
        <button
          onClick={() => {
            updateQuantityCart(props.product.id, "remove");
          }}
        >
          -
        </button>
        <p>{props.product.quantity}</p>
        <button
          onClick={() => {
            updateQuantityCart(props.product.id, "add");
          }}
        >
          +
        </button>
      </div>
      <div className="price">
        <p>
          {props.product.quantity} x R$ {(props.product.price / 100).toFixed(2)}
        </p>
      </div>
      <div className="delete">
        <img
          onClick={() => removeToCart(props.product.id)}
          src={trash}
          alt="trash"
        />
      </div>
    </StyledInfoProduct>
  );
}

const StyledInfoProduct = styled.div`
  width: 100%;
  flex: 1;
  //min-width: 1000px;
  margin-top: 20px;
  height: 100%;
  max-height: 150px;
  background-color: #fde02c;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 5px 9px 6px -1px #414141;

  .img-product img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    cursor: pointer;
  }

  .characteristics {
    flex: 1;
  }

  .characteristics p {
    max-width: 485px;
    font-size: 16px;
    color: black;
    font-family: "Roboto", sans-serif;
  }

  .qtd {
    display: flex;
  }

  .qtd button {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    font-size: 28px;
    margin: 0 8px;
    color: #414141;
  }

  .qtd p {
    color: #515151;
  }

  .qtd button:hover {
    background-color: transparent;
    border-radius: 5px;
    padding-bottom: 5px;
  }

  .price {
    margin: 0 25px;
  }

  .price p {
    color: black;
    font-family: "Roboto";
    font-weight: 500;
  }

  .delete {
    padding-bottom: 12px;
  }

  .delete img {
    width: 28px;
    height: 28px;
    cursor: pointer;
  }
`;
