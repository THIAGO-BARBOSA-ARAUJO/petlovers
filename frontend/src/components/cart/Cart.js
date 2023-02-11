import React from "react";
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import Header from "../home/Header";
import { ToastContainer } from "react-toastify";
import InfoProducts from "./BoxInfoProducts";
import clearCart from "../../img/icons/clearcart.png";
import buttonFinalIcon from "../../img/icons/carrinho-de-compras.png";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState();
  const [total, seTotal] = useState();
  const [vazio, setVazio] = useState(false);
  const navigate = useNavigate()

  const context = useContext(UserContext);

  async function getCart() {
    try {
      const resp = await axios.get("http://localhost/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setProducts(resp.data);
      context.setContcar(resp.data.length);
      context.setRefresh(false);
    } catch (error) {}
  }

  async function deleteAllCart() {
    try {
      const resp = await axios.delete("http://localhost/api/cart/deletecart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      context.setContcar(resp.data.length);
      context.setRefresh(true);
    } catch (error) {}
  }

  async function calculaPrecos(products) {
    let totalproduct = 0;
    const item = products.map(
      ({ price, quantity }) => (price / 100) * quantity
    );

    for (let i = 0; i <= item.length - 1; i++) {
      const val = item[i];
      totalproduct += val;
    }

    seTotal(totalproduct.toFixed(2));
    setSubtotal(totalproduct.toFixed(2));
    context.setTotalProducts(totalproduct.toFixed(2));
  }

  useEffect(() => {
    context.contcar < 1 ? setVazio(true) : setVazio(false);
  }, []);

  setTimeout(() => {
    calculaPrecos(products);
  }, 5);

  useEffect(() => {
    getCart();
  }, [context.refresh]);

  return (
    <>
      <Header />
      <ToastContainer autoClose={2500} pauseOnHover={false} />
      <StyledCart vazio={vazio}>
        <div className="cart">
          <div className="container-info-products">
            {products.length > 0 ? (
              products.map((product, key) => (
                <InfoProducts setVazio={setVazio} product={product} key={key} />
              ))
            ) : (
              <div className="naoexisteproduto">
                <h2>Não existe produtos no seu carrinho!</h2>
              </div>
            )}
            <div
              onClick={() => {
                deleteAllCart();
                setVazio(true);
              }}
              className="clearCart"
            >
              <img src={clearCart} alt="clearCart.png" />
              <p>LIMPAR CARRINHO</p>
            </div>
          </div>
          <div className="container-info-compra">
            <div className="info-compra">
              <div className="title">
                <h1>Resumo</h1>
              </div>
              <div className="subtotal">
                <p>Subtotal</p>
                <p>R$ {subtotal}</p>
              </div>
              <div className="total">
                <p>Total</p>
                <p>R$ {total}</p>
              </div>
              <div className="pix">
                <p className="avista">á vista</p>
                <p className="pricepix">
                  R$ {(total - total * 0.15).toFixed(2)}
                </p>
                <p className="infos">no PIX com 15% de desconto</p>
                <p className="parcelas">Ou em até 12x no cartão de crédito</p>
              </div>
            </div>
            <button onClick={() => navigate("/payment")}>
              <img src={buttonFinalIcon} alt="buttonfinalicon.png" />
              FINALIZAR PEDIDO
            </button>
          </div>
        </div>
      </StyledCart>
    </>
  );
}

const StyledCart = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #ffee7c;
  padding-top: 130px;

  .cart {
    display: flex;
    justify-content: center;
    padding: 0 0 0 15px;
    width: 100%;
  }

  .container-info-products {
    display: flex;
    flex-direction: column;
  }

  .naoexisteproduto {
    height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .naoexisteproduto h2 {
    color: #505050;
  }

  .clearCart {
    width: 100%;
    max-width: 180px;
    height: 30px;
    background-color: #d5d5d5;
    display: ${(props) => (props.vazio === true ? "none" : "flex")};
    align-items: center;
    justify-content: space-around;
    margin: 30px 0;
    padding: 20px 0;
    border-radius: 10px;
    cursor: pointer;
    align-self: flex-end;
  }

  .clearCart img {
    width: 15px;
    height: 20px;
  }

  .clearCart p {
    font-size: 14px;
    margin-top: 12px;
  }

  .container-info-compra {
    width: 100%;
    max-width: 300px;
    height: 380px;
    margin: 10px 20px;
    background-color: #424242;
    display: ${(props) => (props.vazio === true ? "none" : "block")};
  }

  .container-info-compra button {
    margin-top: 40px;
    width: 100%;
    height: 70px;
    border-radius: 5px;
    background-color: #04b303;
    border: none;
    color: white;
    font-family: "Roboto";
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container-info-compra button:hover {
    background-color: #006e1d;
  }

  .container-info-compra button img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  /* .info-compra {
    width: 100%;
    max-width: 300px;
    height: 380px;
    margin: 10px 20px;
    background-color: #424242;
    display: ${(props) => (props.vazio === true ? "none" : "block")};
  } */

  .info-compra .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    border-bottom: 1px solid #505050;
  }

  .info-compra .title h1 {
    font-size: 24px;
    color: white;
    font-weight: 400;
    font-family: "Roboto";
  }

  .info-compra .subtotal {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;
  }

  .info-compra .subtotal p {
    color: white;
    font-family: "Roboto";
    font-size: 14px;
  }

  .info-compra .total {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #595959;
  }

  .info-compra .total p {
    margin-top: 13px;
    color: white;
    font-family: "Roboto";
    font-size: 23px;
  }

  .info-compra .pix {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .info-compra .pix .avista {
    font-size: 10px;
    color: #00a202;
    font-family: "Roboto";
    margin-bottom: 2px;
  }

  .info-compra .pix .pricepix {
    font-size: 24px;
    color: #00a202;
    font-family: "Roboto";
    font-weight: 600;
    margin-bottom: 3px;
  }

  .info-compra .pix .infos {
    font-size: 11px;
    color: #ffffff;
    margin-bottom: 3px;
  }

  .info-compra .pix .parcelas {
    font-size: 13px;
    color: #ffffff;
    width: 150px;
    text-align: center;
    color: #ff0000;
  }
`;
