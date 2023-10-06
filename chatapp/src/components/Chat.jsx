import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
const Chat = () => {
  return (
    <ChatWrapper>
      <Navbar/>
      <ContentWrapper></ContentWrapper>
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 15vw; /* Adjust the left margin to match the Navbar width */
`;
