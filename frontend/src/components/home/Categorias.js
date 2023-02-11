import styled from "styled-components";
import brinquedos from "../../img/brinquedos.png";
import casinha from "../../img/casinha.png";
import coleiras from "../../img/coleira.png";
import comidacao from "../../img/racao.png";
import React from "react";

export default function Categorias() {
  return (
    <StyledCategorias>
      <div className="box">
        <div className="item1">
          <div className="textos">
            <h2>Brinquedos</h2>
            <p>Vamos lá</p>
          </div>
          <img src={brinquedos} alt="brinquedos" />
        </div>
        <div className="item2">
          <div className="textos">
            <h2>Acessórios</h2>
            <p>Vamos lá</p>
          </div>
          <img src={casinha} alt="casinha" />
        </div>
      </div>

      <div className="box2">
        <div className="item1">
          <div className="textos">
            <h2>Coleiras</h2>
            <p>Vamos lá</p>
          </div>
          <img src={coleiras} alt="coleiras" />
        </div>
        <div className="item2">
          <div className="textos">
            <h2>Alimentos</h2>
            <p>Vamos lá</p>
          </div>
          <img src={comidacao} alt="ração" />
        </div>
      </div>
    </StyledCategorias>
  );
}

const StyledCategorias = styled.div`
  background-color: white;
  padding-top: 30px;

  img {
    width: 120px;
    height: 120px;
  }

  .box,
  .box2 {
    max-width: 65%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
  }
  .box2 {
    flex-direction: row-reverse;
  }

  .item1 {
    background-color: #fde02c;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    width: 500px;
    height: 150px;
    border-radius: 10px;
    -webkit-box-shadow: 5px 5px 2px -1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 2px -1px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 5px 2px -1px rgba(0, 0, 0, 0.9);
  }

  .item1 img {
    width: 180px;
    height: 150px;
  }

  .item1 .textos {
    margin-left: 20px;
  }

  .item2 {
    background-color: #ffee7c;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
    height: 150px;
    border-radius: 10px;
    -webkit-box-shadow: 5px 5px 2px -1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 5px 5px 2px -1px rgba(0, 0, 0, 0.75);
    box-shadow: 5px 5px 2px -1px rgba(0, 0, 0, 0.9);
  }

  .item2 img {
    width: 130px;
    height: 130px;
  }

  .item2 .textos {
    margin-left: 20px;
    margin-right: 20px;
  }
`;
