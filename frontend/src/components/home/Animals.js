import styled from "styled-components";
import cachorro from "../../img/dog.png";
import tartaruga from "../../img/michaelangelo.png";
import passaro from "../../img/passaro.png";
import peixe from "../../img/peixe-carpa.png";
import coelho from "../../img/coelho.png";
import gato from "../../img/black-cat.png";
import hamster from "../../img/bola-de-hamster.png";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import React from "react";

export default function Animals() {
  const context = useContext(UserContext);

  const navigate = useNavigate();
  return (
    <StyledAnimal>
      <h1>Categorias por pets.</h1>
      <div className="container-img">
        <div className="fileira1">
          <div className="card">
            <img src={tartaruga} alt="tartaruga" />
            <p>Tartarugas</p>
          </div>
          <div className="card">
            <img src={hamster} alt="hamster" />
            <p>Hamsters</p>
          </div>
          <div className="card">
            <img src={peixe} alt="peixe" />
            <p>Peixes</p>
          </div>
          <div className="card">
            <img src={coelho} alt="coelho" />
            <p>Coelhos</p>
          </div>
        </div>
        <div className="fileira2">
          <div className="card2">
            <img
              onClick={() => {
                context.setProductsAnimals("cat");
                navigate("/cats");
              }}
              src={gato}
              alt="gato"
            />
            <p>Gatos</p>
          </div>
          <div className="card2">
            <img src={passaro} alt="passaro" />
            <p>Passaros</p>
          </div>
          <div className="card2">
            <img
              onClick={() => {
                context.setProductsAnimals("dog");
                navigate("/dogs");
              }}
              src={cachorro}
              alt="cachorro"
            />
            <p>Cachorros</p>
          </div>
        </div>
      </div>
    </StyledAnimal>
  );
}

const StyledAnimal = styled.div`
  background-color: #ffee7c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    padding-top: 30px;
    font-size: 30px;
    font-weight: 400;
  }

  .container-img {
    margin-top: 40px;
  }

  .container-img .fileira1,
  .fileira2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .container-img .card {
    height: 150px;
    width: 130px;
    margin: 0 20px;
    background-color: #fde02c;
    box-shadow: 5px 9px 6px -1px #414141;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .container-img .card2 {
    height: 200px;
    width: 180px;
    margin: 0 20px;
    border-radius: 10px;
    box-shadow: 5px 9px 6px -1px #414141;
    background-color: #fde02c;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container-img .card img,
  .card2 img {
    margin-top: 15px;
    width: 100px;
    max-width: 100%;
    -moz-transition: all 0.3s;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .card:hover img,
  .card2:hover img {
    -moz-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .container-img .card p,
  .card2 p {
    margin-top: 10px;
    font-weight: 500;
    font-style: italic;
  }

  .container-img .card2 p {
    margin-top: 20px;
    border-bottom: 4px solid black;
  }
`;
