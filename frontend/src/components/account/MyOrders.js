import React, { useEffect, useState } from "react";
import api from "../../services/api";
import styled from "styled-components";
import Header from "../home/Header";
import BoxInfoAccount from "./BoxInfoAccount";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  async function getOrders(e) {
    try {
      const oders = await api.get(`/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(oders.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <Header />
      <StyledMyOrders>
        <BoxInfoAccount />
        <div className="orders">
          {orders.map((order) => {
            return (
              <div className="order">
                <p className="numOrder">{order.num_order}</p>
                <p>{order.date}</p>
                <p>{order.method}</p>
                <p>R$ {`${order.total / 100}`.replace(".", ",")}</p>
                <p>{order.status}</p>
                <button>VER PEDIDO</button>
              </div>
            );
          })}
        </div>
      </StyledMyOrders>
    </>
  );
}

const StyledMyOrders = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #303030;
  padding-top: 132px;
  padding-left: 25px;
  display: flex;

  .orders {
    width: 100%;
  }

  .order {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    margin-bottom: 20px;
    border-bottom: 1px solid #515151;
  }

  .order .numOrder {
    width: 100%;
    height: 30px;
    max-width: 100px;
    background-color: #616161;
    padding: 2px 30px;
    border-radius: 20px;
    color: white;
    text-align: center;
  }

  .order p {
    color: white;
    width: 100px;
  }

  .order button {
    margin-right: 30px;
    min-width: 60px;
    border-radius: 5px;
    padding: 5px;
    border: none;
    color: white;
    font-size: 13px;
    background-color: #009e2a;
  }

  .order button:hover {
    background-color: #006e1d;
  }
`;
