import facebook from "../../img/icons/facebook-footer.png"
import instagram from "../../img/icons/instagram-footer.png"
import youtube from "../../img/icons/youtube-footer.png"
import linkedin from "../../img/icons/linkedin-footer.png"
import logo from "../../img/lobo.png"
import styled from "styled-components"
import React from "react"

export default function Footer(){
    return (
      <FooterStyled>
        <div className="img">
          <img src={logo} alt="logo.png" />
          <p>PetLovers</p>
        </div>
        <div className="texts">
          <p>Home</p>
          <p>Fale conosco</p>
          <p>Doações</p>
        </div>
        <div className="redes">
          <img src={facebook} alt="facebook" />
          <img src={instagram} alt="instagram" />
          <img src={youtube} alt="youtube" />
          <img src={linkedin} alt="linkedin" />
        </div>
      </FooterStyled>
    );
}

const FooterStyled = styled.div`
    background-color: #FED02C;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;

    .img {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 110px;
    }

    .img img {
        max-width: 80px;
    }

    .img p {
        font-size: 25px;
        font-weight: 400;
        font-style: italic;
    }

    .texts {
        display: flex;
        gap: 20px;
    }

    .texts p {
        text-decoration: underline;
        font-size: 18px;
        cursor: pointer;
        margin-bottom: 25px;
    }

    .redes {
        display: flex;
        gap: 25px;
        margin-bottom: 25px;
    }

    .redes img {
        cursor: pointer;
    }

`