import styled from "styled-components"
import Header from "./Header"
import background from '../../img/banner-dog-4.png'
import Categorias from "./Categorias"
import Animals from "./Animals"
import BestSellers from "./BestSellers"
import Contacts from "./Contats"
import Email from "./Email"
import Footer from "./Footer"
import React from "react";


export default function Homepage (){
    return(
        <StyledHomepage>
            <Header/>
            <StyledBanermain>
                <div className="textos">
                    <h1>Uma loja para quem ama pets</h1>
                    <p>Busque pelo site, nois temos tudo para o seu pet.</p>
                    <button name="button">Busque</button>
                </div>
            </StyledBanermain>
            <div className="catgorias">
                <Categorias/>
            </div>
            <Animals/>
            <BestSellers/>
            <div className="contact">
                <Contacts />
                <Email/>
            </div>
            <Footer/>
        </StyledHomepage>
        
    )
}

const StyledHomepage = styled.div`
    height: 100vh;
    width: 100%;
    //max-width: 1370px;
    background-color: #ffffff;
    .products {
        max-width: 800px;
        max-height: 300px;
        margin: 0 auto;
        
    }

    .contact {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        margin-top: 40px;
        border-top: 2px dashed black;
        padding-top: 50px;
    }

`

const StyledBanermain = styled.div`
    background-color: #FDE02C;
    height: 100vh;
    display: flex;
    padding: 150px 150px 0 150px;
    justify-content: flex-end;
    background-image: url(${background});
    background-size: cover;

    .textos {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .textos h1{
        margin-top: 50px;
        font-size: 50px;
        max-width: 450px;
        font-weight: 800;
        line-height: 80px;
        color: #060519;
    }

    .textos p {
        margin-top: 20px;
        font-size: 17px;
        font-weight: 400;
        color: #8d8f92;
        align-self: flex-start;
    }

    .textos button {
        margin-top: 40px;
        width: 150px;
        height: 50px;
        border-radius: 10px;
        background-color: white;
        //border: none;
        cursor: pointer;
        box-shadow: 4px 4px 3px 1px #8D8F92;

        font-family:  Roboto, sans-serif;
        font-size: 17px;
        font-weight: 500;
    }

`