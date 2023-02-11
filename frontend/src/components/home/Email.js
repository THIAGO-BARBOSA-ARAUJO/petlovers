import styled from "styled-components"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import Modal from 'react-bootstrap/Modal';
import React from "react";

export default function Email(){

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [titulo, setTitulo] = useState("")
    const [message, setMessage] = useState("")
    const [smShow, setSmShow] = useState(false);

    async function enviarEmail(event) {
        event.preventDefault()
        
        const template = {
            from_name: firstName,
            message: message,
            email: email,
            from_sobrenome: lastName,
            from_titulo: titulo
        }

        emailjs.send("service_u2nazj6", "template_mbzd2vo", template, "aqhIdBmVH6C1qwkIt")
        .then((response) => {
            console.log("Email enviado!", response.status, response.text)
            setFirstName("")
            setMessage("")
            setEmail("")
            setLastName("")
            setTitulo("")
            setSmShow(true)
        }, (err) => {
            console.log("ERROR: ", err)
        })
	}


    return (
        <EmailStyled>
            <form onSubmit={enviarEmail}>
                <div className="linha1">
                    <div className="primeiro_nome">
                        <p>Primeiro Nome</p>
                        <input required type="text" id="campoprimeironome" placeholder="Primeiro Nome" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>
                    
                    <div className="segundo_nome">
                        <p>Segundo Nome</p>
                        <input required type="text" id="camposegundonome" placeholder="Segundo Nome" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>
                
                <div className="linha2">
                    <div className="email">
                        <p>Email</p>  
                        <input required type="email" id="campoemail" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="titulo">
                        <p>Titulo</p>
                        <input required type="text" id="campotitulo" placeholder="Titulo" value={titulo} onChange={e => setTitulo(e.target.value)} /><br/>
                    </div>
                </div>

                <p>Message</p>
                <textarea required type="text" id="campomessage" value={message} onChange={e => setMessage(e.target.value)} /><br/>
                <button>Enviar Email</button>
            </form>

            <>
                <Modal
                    size="sm"
                    show={smShow}
                    onHide={() => setSmShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Email Enviado
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>Mensagem Enviada com Sucesso!</Modal.Body>
                </Modal>
            </>

        </EmailStyled>
    )
}

const EmailStyled = styled.div`
    background-color: #ffffff;
    
    input{
        max-width: 300px;
        min-height: 50px;
        border-radius: 5px;
        outline: none;
        padding-left: 5px;
    }

     p {
        font-size: 18px;
        margin-bottom: 10px;
    }

    textarea {
        resize: none;
        width: 100%;
        height: 150px;
        outline: none;
        border-radius: 5px;
        margin-bottom: 20px;
    }

    button {
        width: 100%;
        height: 50px;
        border-radius: 13px;
        border: 3px solid #060519;
        background-color: white;
    }

    .linha1, .linha2 {
        display: flex;
        margin-bottom: 20px;
    }

    .primeiro_nome, .email {
        margin-right: 15px;
    }

`