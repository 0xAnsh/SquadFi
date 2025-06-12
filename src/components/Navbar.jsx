
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ account, connectWallet, disconnectWallet }) {
  const links = [
    { name: "Proposals", path: "/proposals" },
    { name: "Create", path: "/create" },
    { name: "Vote", path: "/vote" },
    { name: "Add Member", path: "/add-member" },
    { name: "XMTP Test", path: "/xmtp-test" }

  ];

  return (
    <div className="p-4 bg-gradient-to-r from-purple-800 to-indigo-900 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <div className="flex space-x-6 items-center">
        <h1 className="text-2xl font-bold">SquadFi 🛡️</h1>
        {account && links.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-purple-300 border-b-2 border-purple-300 pb-1"
                : "hover:text-purple-200 transition pb-1"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        {!account ? (
          <button
            onClick={connectWallet}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-xl"
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <span className="bg-gray-800 px-3 py-1 rounded-xl text-sm">
              {account.slice(0, 6)}…{account.slice(-4)}
            </span>
            <button
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-xl"
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  );
}
