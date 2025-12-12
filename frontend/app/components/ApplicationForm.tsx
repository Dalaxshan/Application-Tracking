"use client";

import { useState } from "react";

export default function ApplicationForm({ refresh }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    resume: "",
    status: "Pending",
  });

  const submit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/applications", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      email: "",
      position: "",
      resume: "",
      status: "Pending",
    });

    refresh();
  };

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Application</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Applicant Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Applying Position"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Resume Link"
          value={form.resume}
          onChange={(e) => setForm({ ...form, resume: e.target.value })}
        />
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        type="submit"
      >
        Add Application
      </button>
    </form>
  );
}
