"use client";

import { useState } from "react";
import api from "../services/api";

const ORGANIZATION_ID = "62e0331f-7d85-4f8f-8524-b9b66d54e00a";

export default function CreateProject() {

  const [name, setName] = useState("");
  const [project, setProject] = useState(null);

  const createProject = async () => {

    const res = await api.post("/projects", {
      name,
      organization_id: ORGANIZATION_ID
    });

    setProject(res.data.project[0]);

  };

  return (

    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

      <h2 className="text-xl font-semibold mb-4">
        Create Project
      </h2>

      <input
        className="w-full p-3 rounded bg-gray-800 mb-4"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={createProject}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Create Project
      </button>

      {project && (
        <div className="mt-6">

          <p className="text-green-400">
            Project Created
          </p>

          <p className="mt-2 text-sm text-gray-400">
            API Key
          </p>

          <code className="block bg-gray-800 p-3 rounded mt-2">
            {project.api_key}
          </code>

        </div>
      )}

    </div>

  );
}