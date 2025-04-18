import React from "react";

const LargeSuccessLoader: React.FC = () => {
  return (
    <div className="flex  items-center justify-center gap-2 text-green-900">
      <div className="h-10 w-10 rounded-full border-8 border-t-transparent border-green-600 text-green-600 animate-spin"></div>
      Loading . . .
    </div>
  );
};

export default LargeSuccessLoader;