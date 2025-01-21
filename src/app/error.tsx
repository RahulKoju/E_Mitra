"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optional: Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="max-w-md p-6 text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-red-500" />

        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          Something went wrong!
        </h2>

        <p className="mt-2 text-gray-600">
          {error.message ||
            "An unexpected error occurred. Please try again later."}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  );
}
