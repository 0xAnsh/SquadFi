
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function ProposalList({ contract }) {
  const [list, setList] = useState([]);

  const load = async () => {
    try {
      const count = await contract.proposalCount();
      const arr = [];
      for (let i = 0; i < count; i++) {
        const p = await contract.proposals(i);
        arr.push({
          id: i,
          to: p.to,
          amount: ethers.formatEther(p.amount),
          description: p.description,
          approvals: p.approvals.toString(),
          executed: p.executed
        });
      }
      setList(arr);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, [contract]);

  const exec = async (id) => {
    try {
      await (await contract.executeProposal(id)).wait();
      alert("✅ Executed");
      load();
    } catch (err) {
      console.error(err);
      alert("❌ Execution failed");
    }
  };

  if (!list.length) return <p>No proposals yet.</p>;

  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl mb-4 font-bold">📋 Proposals</h2>
      {list.map(p => (
        <div key={p.id} className="border p-4 rounded-xl bg-gray-50">
          <p><strong>ID:</strong> {p.id}</p>
          <p><strong>To:</strong> {p.to}</p>
          <p><strong>Amount:</strong> {p.amount} ETH</p>
          <p><strong>Description:</strong> {p.description}</p>
          <p><strong>Approvals:</strong> {p.approvals}</p>
          <p><strong>Status:</strong> {p.executed ? "✅ Executed" : "❌ Pending"}</p>
          {!p.executed && (
            <button
              onClick={() => exec(p.id)}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Execute
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
