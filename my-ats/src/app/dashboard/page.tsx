'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [filterJob, setFilterJob] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const loadData = () => {
    fetch('/api/jobs').then(r => r.json()).then(setJobs);
    fetch(`/api/applications?${filterJob ? `jobId=${filterJob}&` : ''}${filterStatus ? `status=${filterStatus}` : ''}`)
      .then(r => r.json())
      .then(setApps);
  };

  useEffect(() => { loadData(); }, [filterJob, filterStatus]);

  const postJob = async () => {
    await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, description: newDesc }),
    });
    setNewTitle(''); setNewDesc('');
    loadData();
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch('/api/applications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Recruiter Dashboard</h1>

        {/* Post Job */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold mb-4">Post New Job</h2>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Job Title" className="w-full p-3 border mb-3" />
          <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Description" className="w-full p-3 border mb-3" rows={3} />
          <button onClick={postJob} className="bg-indigo-600 text-white px-6 py-3 rounded">Post Job</button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select onChange={e => setFilterJob(e.target.value)} className="p-3 border rounded">
            <option value="">All Jobs</option>
            {jobs.map((j: any) => <option key={j._id} value={j._id}>{j.title}</option>)}
          </select>
          <select onChange={e => setFilterStatus(e.target.value)} className="p-3 border rounded">
            <option value="">All Status</option>
            <option>New</option><option>Reviewed</option><option>Interview</option><option>Rejected</option><option>Offer</option>
          </select>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Job</th>
                <th className="px-6 py-3 text-left">Resume</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app: any) => (
                <tr key={app._id} className="border-t">
                  <td className="px-6 py-4">{app.name} ({app.email})</td>
                  <td className="px-6 py-4">{app.jobId?.title}</td>
                  <td className="px-6 py-4">
                    <a href={app.resumeUrl} target="_blank" className="text-blue-600 underline">Download Resume</a>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      app.status === 'New' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      app.status === 'Offer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select defaultValue={app.status} onChange={e => updateStatus(app._id, e.target.value)} className="p-2 border rounded">
                      <option>New</option>
                      <option>Reviewed</option>
                      <option>Interview</option>
                      <option>Rejected</option>
                      <option>Offer</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}