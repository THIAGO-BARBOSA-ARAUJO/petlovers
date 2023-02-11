import styled from "styled-components"
import api from "../../services/api";
import { useEffect, useState } from "react";
import React from "react";


export default function BestSellers(){

     const [bestsellers, setBestSellers] = useState([])

     async function rendersMoreBuyers(){
         try {
             const request = await api.get("/bestsellers")
             setBestSellers(request.data)
         } catch (error) {
             console.log(error)
         }
     }

     useEffect(() => {
	 	rendersMoreBuyers()
	 }, [])

    return (
      <BestSellersStyled>
        <>
          <h2>Mais Vendidos</h2>
          <>
            {bestsellers.length > 0 ? (
              <div className="best">
                {bestsellers.map((bestseller) => (
                  <div className="container">
                    <img src={bestseller.img} alt="bestseller" />
                    <p>{bestseller.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              "Não há lista de mais vendidos"
            )}
          </>
        </>
      </BestSellersStyled>
    );
}

const BestSellersStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    background-color: #ffffff;
    
    .best {
        display: flex;
        //background-color: purple;
        margin-top: 50px;
    }

    .best .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 20px;
        height: 350px;
        width: 300px;
        //background-color: #ffee7c;
        border: 5px solid #fde02c;
        cursor: pointer;
    }

    .container p {
        font-weight: 700;
        margin-top: 20px;
    }

    .best img {
        max-height: 250px;
        max-width: 250px;
    }
`