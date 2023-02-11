import React from "react";
import styled from "styled-components";
import imggithub from "../../img/github.png";

export default function ButtonGitHub() {
  async function redirectToGitHub() {
    const GITHUB_URL = "https://github.com/login/oauth/authorize";

    const link = `${GITHUB_URL}?response_type=code&scope=user:email&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;

    window.location.href = link;
  }

  return (
    <StyledButtonGitHub onClick={() => redirectToGitHub()}>
      <img src={imggithub} alt="github.png" />
      Login Com GitHub
    </StyledButtonGitHub>
  );
}

const StyledButtonGitHub = styled.button`
  background-color: #262626;
  color: white;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;
