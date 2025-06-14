import React, { useState } from 'react';
import { ethers } from 'ethers';

export default function ProposalForm({ contract }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!window.ethereum) return alert('🦊 Please install MetaMask');

      // Block ENS and non-address inputs
      if (
        recipient.endsWith('.eth') ||
        recipient.endsWith('.xyz') ||
        !recipient.startsWith('0x') ||
        recipient.length !== 42
      ) {
        return alert('❌ ENS names are not supported. Please enter a valid Ethereum address (0x...)');
      }

      // Validate recipient address format
      try {
        ethers.getAddress(recipient); // throws error if invalid
      } catch {
        return alert('❌ Invalid Ethereum address format');
      }

      // Log recipient value for debugging
      console.log('Recipient address to be used:', recipient);

      const ethAmount = ethers.parseEther(amount);

      // IMPORTANT: Match your Solidity function's parameter order:
      // function createProposal(address to, uint256 amount, string calldata description)
      const tx = await contract.createProposal(recipient, ethAmount, description);
      await tx.wait();

      alert('✅ Proposal submitted successfully!');
      setDescription('');
      setAmount('');
      setRecipient('');
    } catch (error) {
      console.error('❌ Proposal creation error:', error);
      alert('❌ Failed to create proposal:\n' + (error?.message || error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg space-y-4">
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 rounded text-black bg-white"
        placeholder="Proposal description"
        required
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 rounded text-black bg-white"
        placeholder="Amount in ETH"
        type="text"
        required
      />
      <input
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="w-full p-2 rounded text-black bg-white"
        placeholder="Recipient address (0x...)"
        required
      />
      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Submit Proposal
      </button>
    </form>
  );
}
