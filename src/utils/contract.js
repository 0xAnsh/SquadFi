import { ethers } from 'ethers';
import SquadWalletABI from '../contracts/SquadWallet.json';

const CONTRACT_ADDRESS = '0xd692FAc20aA8852FE5cCadAf26c23B07F434CAeD';

export const getContract = () => {
  if (!window.ethereum) {
    throw new Error('MetaMask not found');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    SquadWalletABI.abi,
    signer
  );

  return contract;
};
