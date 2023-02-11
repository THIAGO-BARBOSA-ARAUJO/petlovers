import React, { useEffect, useState } from "react";
import BoxInfoAccount from "./BoxInfoAccount";
import imgpointer from "../../img/icons/pointer.png";
import styled from "styled-components";
import Header from "../home/Header";
import axios from "axios";

function BoxAddress({ address }) {
  const name = localStorage.getItem("nameuser");
  return (
    <StyledBox>
      <h3>Endereço {address.id}</h3>
      <p>{name}</p>
      <p>
        {address.street} {address.number} {address.complement}{" "}
        {address.district}
        <br />
        {address.city}, {address.state}
      </p>
    </StyledBox>
  );
}

export default function Address() {
  const [address, setAddress] = useState([]);

  async function getAddress() {
    try {
      const resp = await axios.get("http://localhost/api/address", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAddress(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAddress();
  }, []);

  console.log(address);
  return (
    <>
      <Header />
      <StyledBoxAddress>
        <BoxInfoAccount />
        <div className="address">
          <div className="titleenderecos">
            <img src={imgpointer} />
            <h2>Endereços Cadastrados</h2>
            <button>ADICIONAR NOVO ENDEREÇO</button>
          </div>
          <div className="addr">
            {address.length > 0
              ? address.map((addr) => {
                  return <BoxAddress address={addr} />;
                })
              : ""}
          </div>
        </div>
      </StyledBoxAddress>
    </>
  );
}

const StyledBoxAddress = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #303030;
  padding-left: 25px;
  padding-top: 132px;
  display: flex;
    
  .address {
    height: 100%;
    flex: 1;
    flex-wrap: wrap;
    border-radius: 5px;
    min-height: 265px;
  }

  .titleenderecos {
    display: flex;
    justify-content: center;
  }

  .titleenderecos img {
    width: 25px;
    height: 25px;
    margin-right: 20px;
  }

  .titleenderecos h2 {
    font-size: 22px;
    font-family: "Roboto";
    color: white;
    margin-right: 20px;
  }

  .addr {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
  }

  button {
    background-color: #5dff88;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    padding: 5px 5px;
    color: white;
  }
`;

const StyledBox = styled.div`
  margin-top: 20px;

  h3 {
    color: #d3d3d3;
    text-decoration: underline;
    font-family: "Roboto";
  }
  p {
    color: #d3d3d3;
    font-family: "Roboto";
  }
`;
