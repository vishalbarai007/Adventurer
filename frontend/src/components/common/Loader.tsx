import React from "react";

interface LargeSuccessLoaderProps {
  /** Optional text label */
  label?: string;
}

const LargeSuccessLoader: React.FC<LargeSuccessLoaderProps> = ({
  label = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 font-jakarta">
      {/* Sleek, Fast Minimal Ring Spinner */}
      <div className="w-9 h-9 border-2 border-gray-200 border-t-[#111827] rounded-full animate-spin" />
      {label && (
        <span className="text-xs font-semibold text-gray-500 tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
};

export default LargeSuccessLoader;