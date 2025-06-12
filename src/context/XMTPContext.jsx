// src/context/XMTPContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { Client } from '@xmtp/xmtp-js';

const XMTPContext = createContext(null);

export const XMTPProvider = ({ children }) => {
  const [xmtp, setXmtp] = useState(null);
  const [conversation, setConversation] = useState(null);

  const initXMTP = async (signer, recipientAddress) => {
    const client = await Client.create(signer, { env: 'production' });
    const convo = await client.conversations.newConversation(recipientAddress);
    setXmtp(client);
    setConversation(convo);
  };

  const sendMessage = async (msg) => {
    if (conversation) {
      await conversation.send(msg);
    }
  };

  return (
    <XMTPContext.Provider value={{ initXMTP, sendMessage }}>
      {children}
    </XMTPContext.Provider>
  );
};

export const useXMTP = () => useContext(XMTPContext);
