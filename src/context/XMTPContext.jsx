import React, { createContext, useContext, useState } from 'react';
import { Client } from '@xmtp/xmtp-js';
import { ethers } from 'ethers';

const XMTPContext = createContext();

export const XMTPProvider = ({ children }) => {
  const [xmtpClient, setXmtpClient] = useState(null);
  const [conversation, setConversation] = useState(null);

  const initXMTP = async (signer, peerAddress) => {
    try {
      const client = await Client.create(signer, { env: 'production' });
      setXmtpClient(client);

      const convo = await client.conversations.newConversation(peerAddress);
      setConversation(convo);
    } catch (error) {
      console.error('❌ XMTP init error:', error);
      throw new Error('Failed to initialize XMTP');
    }
  };

  const sendMessage = async (content) => {
    try {
      if (!conversation) throw new Error('Conversation not initialized');
      await conversation.send(content);
    } catch (error) {
      console.error('❌ Send message error:', error);
      throw new Error('Failed to send message');
    }
  };

  return (
    <XMTPContext.Provider value={{ initXMTP, sendMessage }}>
      {children}
    </XMTPContext.Provider>
  );
};

export const useXMTP = () => useContext(XMTPContext);
