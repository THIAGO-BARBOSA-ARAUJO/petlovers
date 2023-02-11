import phone from "../../img/icons/call.png"
import email from "../../img/icons/email.png"
import location from "../../img/icons/pin.png"
import redes from "../../img/icons/janela-de-conversa.png"
import facebook from "../../img/icons/facebook.png"
import instagram from "../../img/icons/instagram.png"
import linkedin from "../../img/icons/linkedin.png"
import twitter from "../../img/icons/twitter.png"
import styled from "styled-components"
import React from "react";

export default function Contacts(){

    return (
      <ContactsStyled>
        <h1>Entre em contato</h1>
        <div className="container_contacts">
          <div className="linha1">
            <div className="box_contact">
              <div className="icon">
                <img src={location} alt="location" />
              </div>
              <div className="texts">
                <h2>Endereço</h2>
                <p>Rua Inexistente 03</p>
              </div>
            </div>

            <div className="box_contact phone">
              <div className="icon">
                <img src={phone} alt="phone" />
              </div>
              <div className="texts">
                <h2>Telefone</h2>
                <p>021-2477-2528</p>
              </div>
            </div>
          </div>

          <div className="linha2">
            <div className="box_contact">
              <div className="icon">
                <img src={email} alt="email" />
              </div>
              <div className="texts">
                <h2>E-mail</h2>
                <p>petlovers@gmail.com</p>
              </div>
            </div>

            <div className="box_contact">
              <div className="icon">
                <img src={redes} alt="redes" />
              </div>
              <div className="texts redes">
                <h2>Redes Sociais</h2>
                <div className="imgs">
                  <a target="_blank" href="https://www.facebook.com/">
                    <img src={facebook} alt="facebook" />
                  </a>
                  <a target="_blank" href="https://twitter.com/i/flow/login?">
                    <img src={twitter} alt="twitter" />
                  </a>
                  <a target="_blank" href="https://www.instagram.com/">
                    <img src={instagram} alt="instagram" />
                  </a>
                  <a target="_blank" href="https://www.linkedin.com/">
                    <img src={linkedin} alt="linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContactsStyled>
    );
}

const ContactsStyled = styled.div`
    display: flex;
    flex-direction: column;
    //justify-content: center;
    //align-items: center;
    width: 100%;
    max-width: 500px;
    margin-right: 50px;
    background-color: #ffffff;

    h1 {
        text-align: center;
        margin-bottom: 100px;
    }

    .linha1 {
        margin-bottom: 70px;
    }

    .linha1, .linha2 {
        display: flex;
        justify-content: space-between;
    }


    .linha1 .box_contact, .linha2 .box_contact {
        display: flex;
    }

    .linha1 .phone {
        margin-right: 20px;
    }

    .box_contact .icon {
        margin-right: 15px;
    }

    .box_contact .icon img {
        width: 25px;
        height: 25px;
    }

    .box_contact .texts h2 {
        font-size: 20px;
    }

    .box_contact .texts p {
        color: #948c8b;
        font-weight: 500;
    }

    .box_contact .redes .imgs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }

    .box_contact .redes img {
        width: 22px;
        height: 22px;
        cursor: pointer;
    }
    //
`