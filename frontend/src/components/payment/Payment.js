import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../home/Header";
import axios from "axios";

export default function Payment() {
  const navigate = useNavigate();

  async function DellAllCart() {
    try {
      await axios.delete("http://localhost/api/cart/delallcart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/payment/pix")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <StyledPayment>
        <h2>Métodos de Pagamento</h2>
        <div
          onClick={() => { 
            DellAllCart();
          }}
          className="pix"
        >
          <div className="bolinha"></div>
          <p>PAGUE VIA PIX</p>
        </div>
        <div className="boleto">
          <div className="bolinha"></div>
          <p>BOLETO BANCÁRIO</p>
        </div>
        <div className="cartao">
          <div className="bolinha"></div>
          <p>CARTÃO DE CŔEDITO</p>
        </div>
      </StyledPayment>
    </>
  );
}

const StyledPayment = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fde02c;

  h2 {
    margin-bottom: 60px;
  }
  .pix,
  .boleto,
  .cartao {
    background-color: #424242;
    width: 50%;
    height: 10%;
    display: flex;
    margin-bottom: 20px;
    border-radius: 10px;
    align-items: center;
    cursor: pointer;
  }

  .bolinha {
    background-color: transparent;
    border: 3px solid #d1d1d1;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 10px;
  }

  p {
    color: white;
    margin-top: 12px;
  }
`;
