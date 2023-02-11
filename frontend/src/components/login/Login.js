import { useState, useEffect } from "react";
import styled from "styled-components";
import backlogin from "../../img/img-login.jpg";
import imglogin from "../../img/user-login.png";
import imgpass from "../../img/pass-login.png";
import { useNavigate } from "react-router-dom";
import React from "react";
import api from "../../services/api";
import loading from "../../img/loading.gif";
import ButtonGitHub from "./ButtonLoginGitHub";

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);

  async function sendLogin(event) {
    event.preventDefault();

    try {
      const resposta = await api.post("/login", {
        email: email,
        password: senha,
      });

      localStorage.setItem("nameuser", resposta.data.username);
      localStorage.setItem("token", resposta.data.token);
      localStorage.setItem("userId", resposta.data.userId);
      navigate("/");
    } catch (error) {
      console.log(error);
      MostrarError();
    }
  }

  function MostrarError() {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
    clearTimeout();
  }

  const buscaDadosDoUsuario = () => {
    setTimeout(async () => {
      const url = window.location.href;
      const urlarray = url.split("=");
      const code = urlarray[1];
      setLoader(true);
      if (code) {
        try {
          const response = await api.post(
            "/logingithub",
            { code }
          );
          console.log(response.data)
          localStorage.setItem("nameuser", response.data.user.username);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.user.id);
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("não tem código");
      }
      setLoader(false);
    }, 100);
  };

  useEffect(() => {
    buscaDadosDoUsuario();
  }, []);

  return (
    <FooterStyled erro={error}>
      <form onSubmit={sendLogin}>
        <div className="container-login">
          <p className="error">Email ou senha errados</p>
          <div className="caixa-login">
            <div className="login">
              <img src={imglogin} alt="imglogin" />
              <input
                required
                type="email"
                id="campologin"
                placeholder="Digite seu Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="caixa-pass">
            <div className="pass">
              <img src={imgpass} alt="imgpass" />
              <input
                required
                type="password"
                id="camposenha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>
          <button>Login</button>
          {loader ? (
            <StyledLoader>
              <img className="loader" src={loading} alt="loading" />
            </StyledLoader>
          ) : (
            <ButtonGitHub />
          )}
          <p onClick={() => navigate("/register")}>
            Não possui uma conta? Crie sua conta!
          </p>
        </div>
      </form>
    </FooterStyled>
  );
}

const FooterStyled = styled.div`
  background-image: url(${backlogin});
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
  position: relative;

  .container-login {
    width: 700px;
    min-height: 350px;
    background-color: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -20%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .container-login .error {
    color: red;
    text-decoration: none;
    font-size: 16px;
    display: ${(props) => (props.erro === true ? "block" : "none")};
  }

  .container-login img {
    width: 32px;
    margin-right: 15px;
  }

  .container-login input {
    height: 40px;
    border-radius: 5px;
    border: none;
    border-bottom: 2px solid #e9e9e9;
    outline: none;
  }

  .caixa-login {
    margin-bottom: 40px;
  }

  button {
    margin-top: 30px;
    width: 255px;
    height: 40px;
    box-shadow: none;
    margin-left: 45px;
    border-radius: 5px;
    font-size: 18px;
    font-weight: 500;
  }

  .container-login > p {
    padding-top: 20px;
    font-size: 14px;
    margin-left: 45px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const StyledLoader = styled.div`
  width: 100%;
  max-width: 60px;
  margin-left: 45px;
  margin-top: 7px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    width: 60px;
  }
`;
