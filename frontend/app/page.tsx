"use client";

import { useState } from "react";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";


export default function Home() {
  const [reload, setReload] = useState(false);

  const refresh = () => setReload(!reload);

  return (
    <div className="max-w-3xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Simple ATS System
      </h1>

      <ApplicationForm refresh={refresh} />
      <ApplicationList reload={reload} />
    </div>
  );
}
