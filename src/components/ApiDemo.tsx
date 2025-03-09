import React, { useState, useEffect } from "react";
import { Server, Send, RefreshCw } from "lucide-react";

/**
 * API Demo component to demonstrate API connectivity
 * Works with static and dynamic APIs
 */
const ApiDemo: React.FC = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string>("");

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      setError("Failed to fetch API data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // In static mode, this will load the pre-rendered response
      // In production with Cloudflare Workers, this would be a real API call
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setApiData(data);
      setUserInput("");
    } catch (err) {
      setError("Failed to send data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title flex items-center">
          <Server className="h-5 w-5 mr-2" />
          API Connectivity Demo
        </h2>

        <div className="mt-4">
          <button
            className="btn btn-sm btn-outline gap-2"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </button>

          {loading && (
            <div className="mt-4 flex justify-center">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          )}

          {error && (
            <div className="mt-4 alert alert-error">
              <span>{error}</span>
            </div>
          )}

          {apiData && (
            <div className="mt-4 p-4 bg-base-200 rounded-lg overflow-x-auto">
              <pre className="text-sm">{JSON.stringify(apiData, null, 2)}</pre>
            </div>
          )}

          <div className="divider">Send Data</div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter a message to send"
                className="input input-bordered flex-grow"
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApiDemo;
