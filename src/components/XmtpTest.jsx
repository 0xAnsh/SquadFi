import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useXMTP } from '../context/XMTPContext';

const AGENT_ADDRESS = '0x64f32a233eEA20217acB7AAdcD66dbF1e6a1580d';

export default function XMTPTest() {
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState([]);
  const { initXMTP, sendMessage } = useXMTP();

  const handleSend = async () => {
    try {
      if (!window.ethereum) return alert('Please connect MetaMask');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      await initXMTP(signer, AGENT_ADDRESS);
      await sendMessage(message);
      setLogs((prev) => [...prev, `Sent: ${message}`]);
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to send XMTP message');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">🧪 XMTP Test Console</h2>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 rounded bg-white text-black mb-2"
        placeholder="Type: create proposal ..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Send Test Message
      </button>
      <div className="mt-4 bg-gray-900 p-3 rounded text-yellow-400">
        <h3 className="text-lg font-semibold">📜 Message Logs:</h3>
        <pre>{logs.join('\n')}</pre>
      </div>
    </div>
  );
}
