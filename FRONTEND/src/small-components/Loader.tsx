// Loader.tsx
import React from "react";

const Loader: React.FC = () => {
  return (
    <>
      <style>
        {`
          .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            height: 40px;
          }

          .loader span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #3498db;
            animation: dotPulse 1.2s infinite ease-in-out;
          }

          .loader span:nth-child(1) {
            animation-delay: 0s;
          }

          .loader span:nth-child(2) {
            animation-delay: 0.2s;
          }

          .loader span:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes dotPulse {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}
      </style>

      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default Loader;
