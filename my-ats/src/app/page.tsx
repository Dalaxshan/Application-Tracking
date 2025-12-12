import Link from 'next/link';

async function getJobs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/jobs`, {
    next: { revalidate: 10 }
  });
  console.log('res value:', res);
  return res.json();
}

export default async function Home() {
  const jobs = await getJobs();

  console.log('Jobs:', jobs);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Open Positions</h1>
        <div className="text-center mb-8">
          <Link href="/dashboard" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700">
            Go to Recruiter Dashboard →
          </Link>
        </div>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs posted yet.</p>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job: any) => (
              <div key={job._id} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold">{job.title}</h2>
                <p className="text-gray-600 mt-2">{job.description}</p>
                <Link
                  href={`/apply/${job._id}`}
                  className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                >
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}