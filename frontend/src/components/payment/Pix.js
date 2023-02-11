import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import UserContext from "../context/UserContext";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Header from "../home/Header";
import axios from "axios";

function QrCode() {
  return (
    <div
      className="qrcode"
      style={{
        height: 200,
        //margin: "0 auto",
        maxWidth: 200,
        width: "100%",
        background: "white",
        padding: 20,
      }}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value="linkedin.com/in/thiagobarbosaaraujo"
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}

export default function Pix() {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [date, setDate] = useState()
  const [numOrder, setNumOrder] = useState()

  async function CreateOrder() {
    try {
      const order = await axios.post(
        "http://localhost/api/orders",
        {
          method: "PIX",
          total: context.totalProducts * 100,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const dati = order.data.date;
      const datisplit = dati.split("/");
      const day = Number(datisplit[0]) + 1;
      const daystring = `${day}/${datisplit[1]}/${datisplit[2]}`;
      setDate(daystring);
      setNumOrder(order.data.num_order)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    CreateOrder();
  }, []);

  return (
    <>
      <Header />
      <StyledPix>
        <div className="container">
          <div className="infoOrders">
            <h2>Pedido #{numOrder}</h2>
            <h3>Seu pedido foi criado e está em processamento.</h3>
            <p>Acompanhe a situação do seu pedido:</p>
            <button onClick={() => navigate("/account/orders")}>
              VER PEDIDOS
            </button>
            <p className="nv" onClick={() => navigate("/")}>
              Continue Navegando
            </p>
          </div>
          <div className="infopay">
            <div className="title">
              <h1>Pagamento com o PIX</h1>
            </div>
            <p>
              O seu QR Code é válido até{"  "}
              <strong>{date}</strong>
            </p>
            <p>A confirmação do pagamento será realizado em até 20 minutos.</p>
            <div className="qr">
              <QrCode />
              <div className="paywhithpix">
                <h3>Como pagar com o Pix:</h3>
                <p>1 - Acesse o app ou o site do seu banco</p>
                <p>2 - Busque a opção de pagar com o Pix</p>
                <p>3 - Lei o QRCode</p>
                <p>4 - Pronto! Você verá a confirmação do pagamento</p>
              </div>
            </div>
          </div>
        </div>
      </StyledPix>
    </>
  );
}

const StyledPix = styled.div`
  background-color: #ffee7c;
  width: 100vw;
  min-height: 100vh;
  padding-top: 180px;

  .container {
    display: flex;
    //background-color: red;
    justify-content: space-between;
    max-width: 1200px;
  }

  .infoOrders {
    h2 {
      margin-top: 50px;
      color: #505050;
    }
    h3 {
      font-size: 20px;
      color: #505050;
      margin-top: 40px;
    }
    p {
      color: #505050;
      margin-top: 20px;
    }

    button {
      width: 100px;
      height: 30px;
      border-radius: 8px;
      background-color: #009e2a;
      border: none;
      font-size: 13px;
      color: white;
      cursor: pointer;
    }
    .nv {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .infopay {
    background-color: #505050;
    padding: 30px;
  }

  .infopay .title h1 {
    color: white;
    font-family: "Roboto";
    font-weight: 400;
    text-align: center;
  }

  .infopay > p {
    margin-top: 20px;
    color: #d5d5d5;
    text-align: center;
  }

  .infopay > p strong {
    color: white;
  }

  .qr {
    display: flex;
  }

  .qr {
    margin-left: 40px;
    margin-top: 40px;
    text-align: none;
  }

  .paywhithpix {
    margin-left: 40px;
  }

  .paywhithpix h3 {
    color: white;
    font-family: "Roboto";
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .paywhithpix p {
    color: white;
  }
`;
