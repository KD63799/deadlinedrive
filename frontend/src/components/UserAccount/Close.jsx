import React from "react";

// Close component that renders a button with an SVG icon
function Close() {
  return (
    <button aria-label="Fermer le menu" className="ml-auto h-6 w-6 flex items-center justify-center hover:bg-gray-100">
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

export default Close;