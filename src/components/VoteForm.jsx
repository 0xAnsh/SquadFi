
import React, { useState } from 'react';

export default function VoteForm({ contract }) {
  const [id, setId] = useState("");

  const submit = async () => {
    try {
      const tx = await contract.vote(id);
      await tx.wait();
      alert("✅ Voted");
      setId("");
    } catch (err) {
      console.error(err);
      alert("❌ Vote failed");
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow mb-6">
      <h2 className="text-xl mb-4 font-bold">🗳️ Vote on Proposal</h2>
      <input className="border p-2 w-full mb-2 rounded" placeholder="Proposal ID" value={id} onChange={e => setId(e.target.value)} />
      <button onClick={submit} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Vote
      </button>
    </div>
  );
}
