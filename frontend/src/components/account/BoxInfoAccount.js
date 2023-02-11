import React from "react";
import styled from "styled-components";
import userAccount from "../../img/icons/user.png"
import requests from "../../img/icons/pedido.png"
import { useNavigate } from "react-router-dom";

export default function BoxInfoAccount() {

    const navigate = useNavigate()

    return (
      <StyledBoxInfoAccount>
        <div onClick={() => navigate("/")} className="myaccount">
          <img src={userAccount} />
          Inicio
        </div>
        <div onClick={() => navigate("/account")} className="myaccount">
          <img src={userAccount} />
          Minha conta
        </div>
        <div onClick={() => navigate("/account/orders")} className="myaccount">
          <img src={requests} />
          Meus pedidos
        </div>
      </StyledBoxInfoAccount>
    );
}

const StyledBoxInfoAccount = styled.div`
  height: 195px;
  width: 290px;
  background-color: #515151;
  border-radius: 5px;
  margin-right: 30px;
  margin-left: 30px;

  .myaccount {
    border-radius: 5px;
    height: 65px;
    border-bottom: 1px solid #808080;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding: 0 20px;

    font-size: 16px;
    color: white;
  }

  .myaccount:last-of-type {
    border-bottom: none;
  }

  .myaccount:hover {
    background-color: #5f5f5f;
  }

  .myaccount img {
    width: 28px;
    border-radius: 5px;
    margin-right: 10px;
  }
`;

//heigth: 225px whidth: 312px
