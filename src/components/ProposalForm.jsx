import React, { useState } from 'react';
import { useXMTP } from '../context/XMTPContext';
import { ethers } from 'ethers';

const AGENT_ADDRESS = '0x64f32a233eEA20217acB7AAdcD66dbF1e6a1580d'; 

export default function ProposalForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const { initXMTP, sendMessage } = useXMTP();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    await initXMTP(signer, AGENT_ADDRESS);

    const message = `create proposal: ${description} to ${recipient} for ${amount} ETH`;
    await sendMessage(message);

    alert("Proposal sent via XMTP!");
    setDescription('');
    setAmount('');
    setRecipient('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg space-y-4">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded"
        placeholder="Proposal description"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 rounded"
        placeholder="Amount in ETH"
        type="number"
      />
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 rounded"
        placeholder="Recipient address"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Submit Proposal
      </button>
    </form>
  );
}
