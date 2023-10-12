import React from 'react';
import { auth } from '../../firebase';
import styled, { css } from 'styled-components';

const Message = ({ message }) => {
  const messageAuthor = message.uid;

  const messageStyles = css`
    position: relative;
    margin-bottom: 10px;
    padding: 10px;
    max-width: 50%;
    width: fit-content;
    text-align: left;
    font: 400 0.9em 'Open Sans', sans-serif;
    border-radius: 10px;
    align-self: ${messageAuthor === auth.currentUser.uid ? 'flex-end' : 'flex-start'};
  `;

  const MessageContainer = styled.div`
    ${messageStyles}
    background-color: ${messageAuthor === auth.currentUser.uid ? '#ffc8c7' : '#c7ffcb'};
    border: 1px solid ${messageAuthor === auth.currentUser.uid ? '#ffc8c7' : '#c7ffcb'};

    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      top: 0;
      left: ${messageAuthor === auth.currentUser.uid ? 'auto' : '-15px'};
      right: ${messageAuthor === auth.currentUser.uid ? '-15px' : 'auto'};
      border-top: 15px solid ${messageAuthor === auth.currentUser.uid ? '#ffc8c7' : '#c7ffcb'};
      border-left: ${messageAuthor === auth.currentUser.uid ? '15px solid transparent' : 'transparent'};
      border-right: ${messageAuthor === auth.currentUser.uid ? 'transparent' : '15px solid transparent'};
    }

    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      top: -1px;
      left: ${messageAuthor === auth.currentUser.uid ? 'auto' : '-17px'};
      right: ${messageAuthor === auth.currentUser.uid ? '-17px' : 'auto'};
      border-top: 17px solid ${messageAuthor === auth.currentUser.uid ? '#ffc8c7' : '#97c6e3'};
      border-left: ${messageAuthor === auth.currentUser.uid ? '16px solid transparent' : 'transparent'};
      border-right: ${messageAuthor === auth.currentUser.uid ? 'transparent' : '16px solid transparent'};
    }
  `;

  return (
    <MessageContainer>
      <p className="message-content">{message.name}</p>
      <p>{message.text}</p>
    </MessageContainer>
  );
};

export default Message;