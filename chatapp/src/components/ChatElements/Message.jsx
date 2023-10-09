import React from 'react'
import { auth } from "../../firebase";
const Message = ({message}) => {
  const messageAuthor = message.uid
  const messageClass = 
  messageAuthor === auth.currentUser.uid 
  ? `${'message-sent'}`
  : `${'message-received'}`
  return (
  
        <div className={`${messageClass}`}>
            <p class="message-content">{message.name}</p>
            <p>{message.text}</p>
        </div>

    
  )
}

export default Message
// .message-received {
//     position: relative;
//     margin-right: 20px;
//     margin-left: 20px;
//     margin-bottom: 10px;
//     padding: 10px;
//     max-width: 50%;
//     background-color: #a8ddfd;
//     width: fit-content;
//     text-align: left;
//     font: 400 0.9em "Open Sans", sans-serif;
//     border: 1px solid #97c6e3;
//     border-radius: 10px;
//     align-self: flex-start;
//   }
//   .message-content {
//     padding: 0;
//     margin: 0;
//   }
  
//   .message-received:after {
//     content: "";
//     position: absolute;
//     width: 0;
//     height: 0;
//     border-top: 15px solid #a8ddfd;
//     border-left: 15px solid transparent;
//     border-right: 15px solid transparent;
//     top: 0;
//     left: -15px;
//   }
  
//   .message-received:before {
//     content: "";
//     position: absolute;
//     width: 0;
//     height: 0;
//     border-top: 17px solid #97c6e3;
//     border-left: 16px solid transparent;
//     border-right: 16px solid transparent;
//     top: -1px;
//     left: -17px;
//   }
  
//   .message-sent {
//     position: relative;
//     margin-left: 20px;
//     margin-right: 20px;
//     margin-bottom: 10px;
//     padding: 10px;
//     max-width: 50%;
//     background-color: #f8e896;
//     width: fit-content;
//     text-align: left;
//     font: 400 0.9em "Open Sans", sans-serif;
//     border: 1px solid #f8e896;
//     border-radius: 10px;
//     background-color: #f8e896;
//     align-self: flex-end;
//   }
  
//   .message-sent:after {
//       content: '';
//       position: absolute;
//       width: 0;
//       height: 0;
//       border-bottom: 15px solid #f8e896;
//       border-left: 15px solid transparent;
//       border-right: 15px solid transparent;
//       bottom: 0;
//       right: -15px;
    
//   }
  
//   .message-sent:before {
//       content: '';
//       position: absolute;
//       width: 0;
//       height: 0;
//       border-bottom: 17px solid #dfd087;
//       border-left: 16px solid transparent;
//       border-right: 16px solid transparent;
//       bottom: -1px;
//       right: -17px;
//   }
  