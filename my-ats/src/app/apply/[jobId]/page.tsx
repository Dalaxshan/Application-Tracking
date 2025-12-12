'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ApplyPage() {
  const { jobId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append('jobId', jobId as string);

    await fetch('/api/applications', {
      method: 'POST',
      body: formData,
    });

    alert('Application submitted successfully!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Apply for Job</h1>
        <form onSubmit={handleSubmit}>
          <input name="name" required placeholder="Full Name" className="w-full p-3 border rounded mb-4" />
          <input name="email" type="email" required placeholder="Email" className="w-full p-3 border rounded mb-4" />
          <textarea name="coverLetter" rows={6} placeholder="Cover Letter (optional)" className="w-full p-3 border rounded mb-4" />
          <input name="resume" type="file" accept=".pdf,.doc,.docx" required className="w-full p-3 border rounded mb-6" />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
}