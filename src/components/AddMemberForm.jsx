
import React, { useState } from 'react';

export default function AddMemberForm({ contract }) {
  const [address, setAddress] = useState("");

  const submit = async () => {
    try {
      const tx = await contract.addMember(address);
      await tx.wait();
      alert("✅ Member added");
      setAddress("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add member");
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow mb-6">
      <h2 className="text-xl mb-4 font-bold">➕ Add Member</h2>
      <input className="border p-2 w-full mb-2 rounded" placeholder="Member Address" value={address} onChange={e => setAddress(e.target.value)} />
      <button onClick={submit} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Add Member
      </button>
    </div>
  );
}
