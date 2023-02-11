import { useState, useContext } from "react"
import UserContext from "../context/UserContext"
import styled from "styled-components"
import axios from "axios"
import { useEffect } from "react"
import Header from "../home/Header"
import Footer from "../home/Footer"

export default function Dogs() {

    const [products, setProducts] = useState([])

    const context = useContext(UserContext);

   async function renderProducsDogs() {
        try {
            const resp = await axios.get("http://localhost/api/products/dog");
            setProducts(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function addToCart(img, name, price) {
        try {
            await axios.post("http://localhost/api/cart", {
                img,
                name,
                price
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            context.setRefresh(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
		renderProducsDogs()
	}, [])

    return (
        <StyledDogs>
            <Header/>
            <div className="container-products">
            
            </div>

            <Footer/>
            </StyledDogs>
    )
}



const StyledDogs = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #FDE02C;
    display: flex;
    flex-direction: column;
    .container-products {
        margin-top: 70px;
    }
    .product {
        margin: 50px auto;
        background-color: #ffee7c; //#ffee7c
        max-width: 700px;
        max-height: 300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
    }

    .product img {
        max-width: 250px;
        height: 250px;
    }

    .product .infos {
        padding: 5px;
        border-radius: 5px;
    }

    .product .infos h2 {
        font-size: 22px;
    }

    .infos .preco {
        font-size: 35px;
        font-weight: 300;
        margin-top: 20px;
    }

    .infos h3 {
        font-size: 18px;
        margin-bottom: 25px;
        font-weight: 400;
    }

    .infos input {
        max-width: 60px;
        margin-left: 10px;
        outline: none;
        margin-right: 5px;
    }

    .infos button {
        background-color: #2968c8;
        color: white;
        height: 50px;
        width: 300px;
        border-radius: 15px;
        margin-top: 20px;
        cursor: pointer;
    }
`

                