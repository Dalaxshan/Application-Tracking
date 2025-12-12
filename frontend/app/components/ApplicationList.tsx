"use client";

import { useEffect, useState } from "react";

export default function ApplicationList({ reload }: any) {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("/api/applications")
      .then((res) => res.json())
      .then(setApps);
  }, [reload]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Applications</h2>

      {apps.length === 0 && <p>No applications yet.</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Resume</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>

        <tbody>
          {apps.map((app: any) => (
            <tr key={app.id} className="text-center">
              <td className="border p-2">{app.name}</td>
              <td className="border p-2">{app.email}</td>
              <td className="border p-2">{app.position}</td>
              <td className="border p-2">
                <a href={app.resume} className="text-blue-500" target="_blank">
                  View
                </a>
              </td>
              <td className="border p-2">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
