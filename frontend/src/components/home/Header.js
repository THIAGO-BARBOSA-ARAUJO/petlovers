import styled from "styled-components";
import logo from "../../img/lobo.png";
import iconeuser from "../../img/user.png";
import deslogar from "../../img/power-off.png";
import carr from "../../img/icons/carrinho2.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import api from "../../services/api";
import React from "react";

export default function Header() {
  let logado = localStorage.getItem("nameuser");

  let navigate = useNavigate();

  const location = useLocation();

  const context = useContext(UserContext);

  async function getCart() {
    try {
      const resp = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      context.setContcar(resp.data.length);
      context.setRefresh(false);
    } catch (error) {}
  }

  useEffect(() => {
    getCart();
  }, [context.refresh]);

  async function Logout() {
    const resp = prompt("Gostaria mesmo de deslogar ?");
    if (resp === "Sim" || resp === "sim") {
      try {
        await api.delete("/logout", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        localStorage.removeItem("token");
        localStorage.removeItem("nameuser");
        localStorage.removeItem("userId")
        navigate(location.pathname);
        window.location.reload()
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <StyledHeader>
      <div className="img">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={logo}
          alt="logo.png"
        />
        <p>PetLovers</p>
      </div>

      <div className="busca">
        <input placeholder="Busque por um produto" type="text" />
      </div>

      <div className="icones">
        {logado ? (
          <>
            <div className="user">
              <img onClick={() => {navigate("/account")}} src={iconeuser} alt="iconeuser.png" />
              <p>olá, {logado}</p>
            </div>
            <div onClick={() => navigate("/cart")} className="car">
              <img src={carr} alt="carr" />
              <p>{context.contcar}</p>
            </div>
            <img onClick={() => Logout()} src={deslogar} alt="deslogar" />
          </>
        ) : (
          <>
            <div className="user">
              <img
                onClick={() => navigate("/login")}
                src={iconeuser}
                alt="iconeuser"
              />
              <p>
                Olá, <br />
                faça seu login
              </p>
            </div>
          </>
        )}
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  background-color: #fde02c;
  height: 100%;
  max-height: 80px;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  //align-items: center;
  position: fixed;
  width: 100%;
  left: 50%;
  transform: translatex(-50%);
  padding-top: 20px;
  z-index: 999;

  .img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .img img {
    width: 50px;
  }

  .img p {
    font-size: 20px;
    font-weight: 600;
  }

  .busca input {
    width: 600px;
    height: 50px;
    border-radius: 30px;
    outline: none;
    border: 1px solid black;
    padding-left: 20px;

    font-size: 20px;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
  }

  .busca input::placeholder {
    text-align: center;
    padding-left: -20px;
  }

  .icones {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }

  .icones .car {
    display: flex;
    position: relative;
    cursor: pointer;
  }

  .icones .car p {
    position: absolute;
    right: 8px;
    top: 0px;
    //color: white;
  }

  .icones .user {
    display: flex;
    justify-content: center;
    align-items: center;
    //margin-right: 20px;
  }

  .icones .user p {
    font-weight: 500;
    font-family: "Montserrat", sans-serif;
    margin-top: 13px;
  }

  .icones img {
    cursor: pointer;
  }

  .icones .user img {
    margin-right: 10px;
    cursor: pointer;
  }
`;
