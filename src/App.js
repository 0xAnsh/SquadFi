
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SquadWalletJSON from './contracts/SquadWallet.json';

import Navbar from './components/Navbar';
import ProposalForm from './components/ProposalForm';
import VoteForm from './components/VoteForm';
import AddMemberForm from './components/AddMemberForm';
import ProposalList from './components/ProposalList';
import XmtpTest from './components/XmtpTest';
import { Buffer } from 'buffer';
window.Buffer = Buffer;


const CONTRACT_ADDRESS = "0xd692FAc20aA8852FE5cCadAf26c23B07F434CAeD";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("🔌 Please install MetaMask");
    try {
      const prov = new ethers.BrowserProvider(window.ethereum);
      await prov.send("eth_requestAccounts", []);
      const signer = await prov.getSigner();
      const address = await signer.getAddress();
      const walletContract = new ethers.Contract(CONTRACT_ADDRESS, SquadWalletJSON.abi, signer);
      setProvider(prov);
      setSigner(signer);
      setAccount(address);
      setContract(walletContract);
    } catch (err) {
      console.error("Wallet connect error:", err);
      alert("❌ Connection failed");
    }
  };
  const disconnectWallet = () => {
  setAccount(null);
  setSigner(null);
  setContract(null);
  setProvider(null);
  };
  
  useEffect(() => {
    const checkNetwork = async () => {
      if (!window.ethereum) return;
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== "0x14a34") {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x14a34' }],
          });
        } catch (err) {
          if (err.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x14a34', chainName: 'Base Sepolia',
                rpcUrls: ['https://sepolia.base.org'],
                nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                blockExplorerUrls: ['https://sepolia.basescan.org'],
              }],
            });
          }
        }
      }
    };
    checkNetwork();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <Navbar account={account} connectWallet={connectWallet}  disconnectWallet={disconnectWallet} />
        <div className="p-6">
          {!account ? (
            <div className="text-center text-lg py-20">
              🔌 Please connect your wallet to access SquadFi features.
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/proposals" />} />
              <Route path="/proposals" element={<ProposalList contract={contract} />} />
              <Route path="/create" element={<ProposalForm contract={contract} />} />
              <Route path="/vote" element={<VoteForm contract={contract} />} />
              <Route path="/add-member" element={<AddMemberForm contract={contract} />} />
              <Route path="/xmtp-test" element={<XmtpTest />} />

            </Routes>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
