import styled from "styled-components"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import iconvisionopen from "../../img/icons/eye.png"
import iconvisionclosed from "../../img/icons/hidden.png"
import React from "react";

import registerfundo from "../../img/img-cadastro.jpg"

export default function Register() {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")
    const [confirmaSenha, setConfirmaSenha] = useState("")
    const [username, setUserName] = useState("")
    const [mostrarsenha, setMostrasenha] = useState(false)
    const [mostrarsenha2, setMostrasenha2] = useState(false)
    const [passwordsmatch, setPasswordsmatch] = useState(true)

    let navigate = useNavigate()

    async function sendRegister(event) {
        event.preventDefault();
        
        if(senha === confirmaSenha) {
  
            try{
                await axios.post("http://localhost/api/register", {
                    email: email,
                    name: nome,
                    password: senha,
                    username: username
                });
          
                navigate("/login")
          
            }catch {
                console.log("deu ruim na requisição")
            }
  
        }else {
          console.log("As senhas não coencidem")
          setConfirmaSenha("")
          setPasswordsmatch(false)
          
        } 
          
    }

    return (
      <RegisterStyled passwordsmatch={passwordsmatch}>
        <div className="img">
          <img src={registerfundo} alt="registerfundo" />
        </div>
        <div className="forms">
          <form onSubmit={sendRegister}>
            <h1>Faça seu cadastro!</h1>

            <input
              required
              type="text"
              id="campoNome"
              placeholder="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <br />

            <input
              required
              type="text"
              id="nomeUsuario"
              placeholder="nome de usuário"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />

            <input
              required
              type="email"
              id="campoEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <div className="caixasenha">
              <input
                required
                type={mostrarsenha ? "text" : "password"}
                id="camposenha"
                placeholder="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <img
                src={mostrarsenha ? iconvisionopen : iconvisionclosed}
                alt="mostrarsenha"
                onClick={() =>
                  mostrarsenha ? setMostrasenha(false) : setMostrasenha(true)
                }
              />
            </div>

            <div className="caixasenha">
              <input
                required
                type={mostrarsenha2 ? "text" : "password"}
                id="campoconfirmasenha"
                placeholder={
                  passwordsmatch
                    ? "confirme a senha"
                    : "as senhas não são iguais"
                }
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
              />
              <img
                src={mostrarsenha2 ? iconvisionopen : iconvisionclosed}
                alt="mostrarsenha2"
                onClick={() =>
                  mostrarsenha2 ? setMostrasenha2(false) : setMostrasenha2(true)
                }
              />
            </div>

            <button>Cadastra</button>
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              Já tem uma conta? Faça login!
            </p>
          </form>
        </div>
      </RegisterStyled>
    );
}

const RegisterStyled = styled.div`
    display: flex;
    background-color: #fde3a8;
    height: 100vh;
    overflow: hidden;

    .img {
        width: 50%;
    }

    .img img {
        width: 100%;
    }

    .forms {
        background-color: #fde3a8;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .forms form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
    }

    .forms form .caixasenha {
        display: flex;
        //background-color: red;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-bottom: 1px solid #060519;
        height: 45px;
    }

    .forms form div:last-of-type {
        margin-top: 10px;
    }

    

    .forms form .caixasenha > input {
        border-bottom: none;
        //margin-bottom: 0;
        padding-top: 6px;
    }

    .forms form div:last-of-type input::placeholder {
        color: ${(props) => props.passwordsmatch === true ? "black" : "red"};
    }

    .forms form .caixasenha > img {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }

    .forms h1 {
        margin-bottom: 20px;
    }

    .forms input{
        margin: 8px 0;
        background-color: #fde3a8;
        height: 40px;
        border: none;
        border-bottom: 1px solid #060519;
        outline: none;
        width: 100%;
    }

    .forms button {
        width: 78%;
        margin-top: 30px;
        height: 40px;
        background-color: #ffee7c;
        outline: none;
        border: 1px solid #060519;
        border-radius: 5px;
    }

    .forms button:hover {
        background-color: #FDE02C;
    }

    .forms p {
        margin-top: 20px;
        text-decoration: underline;
        text-align: center;
        cursor: pointer;
    }
`