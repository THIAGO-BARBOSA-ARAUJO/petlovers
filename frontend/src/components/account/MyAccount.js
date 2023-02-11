import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../home/Header";
import BoxInfoAccount from "./BoxInfoAccount";
import axios from "axios";
import imguser from "../../img/icons/user.png";
import imgpointer from "../../img/icons/pointer.png";
import imghome from "../../img/icons/home.png";
import { useNavigate } from "react-router-dom";
import imgplus from "../../img/icons/mais.png";

export default function Account() {
  const [users, setUser] = useState([]);
  const [address, setAddress] = useState([]);
  const [editAddress, setEditAddress] = useState(false);
  const [cep, setCep] = useState();
  const [logradouro, setLogradouro] = useState();
  const [number, setNumber] = useState();
  const [complement, setComplement] = useState();
  const [district, setDistrict] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const navigate = useNavigate();

  async function getUser() {
    try {
      const resp = await axios.get("http://localhost/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(resp.data);
    } catch (error) {}
  }

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

  async function CreateAddress(event) {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost/api/address",
        {
          street: logradouro,
          num: number,
          complement: complement,
          district: district,
          city: city,
          state: state,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditAddress(false);
      getAddress();
    } catch (error) {
      console.log(error);
    }
  }

  async function DeletedAddress(id) {
    try {
      await axios.delete(`http://localhost/api/address?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      getAddress();
    } catch (error) {
      console.log(error);
    }
  }

  async function getCep(e) {
    const cep = e.target.value.replace(/\D/g, '')

    try {
      const cepp = await axios.get(`http://localhost/api/address/getcep?cep=${cep}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLogradouro(cepp.data.logradouro);
      setComplement(cepp.data.complemento);
      setDistrict(cepp.data.bairro);
      setCity(cepp.data.localidade);
      setState(cepp.data.uf);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
    getAddress();
  }, []);

  return (
    <>
      <Header />
      <div>
        <img src={imghome} />
        lalalala
      </div>
      <StyledAccount>
        <BoxInfoAccount />
        <div className="myaccount">
          <div className="title">
            <img src={imguser} /> <h1>Minha Conta</h1>
          </div>
          <div className="infos">
            <h2>Informações de Acesso</h2>
            {users.length > 0
              ? users.map((user, key) => (
                  <div key={key} className="infouser">
                    <p>
                      <strong>name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>email:</strong> {user.email}
                    </p>
                  </div>
                ))
              : ""}
            <div className="buttons">
              <button
                onClick={() => navigate("/account/edit")}
                className="editar"
              >
                Editar
              </button>
              <button className="msenha">Mudar Senha</button>
            </div>
          </div>
        </div>
        <div className="enderecos">
          <div className="titleenderecos">
            <img src={imgpointer} />
            <h2>Endereços Cadastrados</h2>
          </div>
          <div className="address">
            {editAddress ? (
              <div className="forms">
                <h3>Editar Endereço</h3>
                <form onSubmit={CreateAddress}>
                  <input
                    type="number"
                    id="cep"
                    placeholder="cep"
                    //value={cep}
                    onBlur={getCep}
                  />
                  <br />

                  <input
                    required
                    type="text"
                    id="logradouro"
                    placeholder="logradouro"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                  />
                  <br />

                  <input
                    required
                    type="number"
                    id="number"
                    placeholder="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <br />

                  <input
                    type="text"
                    id="comlement"
                    placeholder="complemento"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                  />
                  <br />

                  <input
                    required
                    type="text"
                    id="district"
                    placeholder="Bairro"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                  <br />

                  <input
                    required
                    type="text"
                    id="city"
                    placeholder="Cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <br />

                  <input
                    required
                    type="text"
                    id="state"
                    placeholder="Estado"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <br />

                  <button>SALVAR ENDEREÇOS</button>
                </form>
              </div>
            ) : (
              <div className="addr">
                {address.length > 0
                  ? address.map((addr, key) => (
                      <StyledBox key={key}>
                        <h3>Endereço {addr.id}</h3>
                        <p>
                          {addr.street} {addr.number} {addr.complement}{" "}
                          {addr.district}
                          <br />
                          {addr.city}, {addr.state}
                        </p>
                        <div className="buttons">
                          <button
                            onClick={() => {
                              DeletedAddress(addr.id);
                            }}
                          >
                            Excluir
                          </button>
                        </div>
                      </StyledBox>
                    ))
                  : ""}
                <div className="addaddress">
                  <button
                    onClick={() => {
                      setEditAddress(true);
                    }}
                  >
                    <img src={imgplus} />
                    ADICIONAR ENDEREÇO
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </StyledAccount>
    </>
  );
}

const StyledAccount = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #303030;
  padding-top: 100px;
  padding-left: 25px;
  display: flex;

  .myaccount {
    background-color: #515151;
    flex: 1;
    align-self: flex-start;
    border-radius: 5px;
  }

  .myaccount .title {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .myaccount .title img {
    width: 25px;
  }

  .myaccount .title h1 {
    font-size: 22px;
    color: white;
    font-family: "Roboto";
    margin-top: 5px;
    margin-left: 10px;
  }

  .infos {
    padding: 10px;
  }

  .infos h2 {
    font-size: 20px;
    color: white;
    margin-top: 20px;
    font-family: "Roboto";
  }

  .infouser {
    margin-top: 30px;
  }

  .infouser strong {
    font-size: 18px;
    font-weight: 500;
    margin-right: 5px;
  }

  .infouser p {
    color: white;
    font-size: 14px;
  }

  .buttons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .buttons button {
    margin-right: 30px;
    min-width: 60px;
    border-radius: 5px;
    padding: 5px;
    border: none;
    color: white;
    font-size: 13px;
  }

  .buttons .editar {
    background-color: #e90313;
  }

  .buttons .editar:hover {
    background-color: #a3020d;
  }

  .buttons .msenha {
    background-color: #009e2a;
  }

  .buttons .msenha:hover {
    background-color: #006e1d;
  }

  .enderecos {
    background-color: #515151;
    align-self: flex-start;
    flex: 1;
    margin-left: 20px;
    border-radius: 5px;
    padding: 10px;
  }

  .enderecos .titleenderecos {
    display: flex;
    justify-content: flex-start;
  }

  .enderecos .titleenderecos img {
    width: 25px;
    height: 25px;
    margin-right: 20px;
  }

  .enderecos .titleenderecos h2 {
    font-size: 22px;
    font-family: "Roboto";
    color: white;
    margin-right: 20px;
  }

  .enderecos .titleenderecos button {
    border: 1px solid #009e2a;
    background-color: transparent;
    color: #009e2a;
    border-radius: 5px;
    font-size: 15px;
    height: 25px;
    margin-top: 5px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .forms {
    //background-color: red;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  }

  .forms h3 {
    font-size: 26px;
    font-family: "Roboto";
    font-weight: 400;
    margin: 20px 0;
    color: white;
  }

  .form form {
    width: 100%;
  }

  .forms form input {
    width: 100%;
    max-width: 300px;
    height: 35px;
    outline: none;
    border: none;
    margin: 8px 0;
    border-radius: 10px;
    padding: 0 1%;
  }

  .forms form input::placeholder {
    //text-align: center;
  }

  .forms form input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  .forms form input[type="number"] {
    -moz-appearance: textfield;
  }

  .forms form button {
    margin-right: 30px;
    margin-top: 20px;
    width: 100%;
    max-width: 250px;
    height: 40px;
    border-radius: 5px;
    padding: 5px;
    border: none;
    color: white;
    font-size: 18px;
    font-weight: 400;
    font-family: "Roboto";
    background-color: #009e2a;
  }

  .forms form button:hover {
    background-color: #006e1d;
  }

  .forms form .addaddress {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 30px;
  }

  .addaddress button {
    background-color: transparent;
    border: none;
    padding: 10px;
    border-radius: 5px;
    color: white;
    background-color: #009e2a;
  }

  .addaddress button:hover {
    background-color: #006e1d;
  }

  .addaddress button img {
    width: 20px;
    margin-right: 10px;
  }
`;

const StyledBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  h3 {
    color: #d3d3d3;
    text-decoration: underline;
    font-family: "Roboto";
  }

  p {
    color: #d3d3d3;
    font-family: "Roboto";
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .buttons button {
    margin-right: 30px;
    min-width: 60px;
    border-radius: 5px;
    padding: 5px;
    border: none;
    color: white;
    font-size: 13px;
  }

  .buttons button:first-of-type {
    background-color: #e90313;
  }

  .buttons button:first-of-type:hover {
    background-color: #a3020d;
  }
`;
