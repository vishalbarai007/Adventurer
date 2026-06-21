import React from "react";

interface LargeSuccessLoaderProps {
  /** Text shown under the animation */
  label?: string;
}

const LargeSuccessLoader: React.FC<LargeSuccessLoaderProps> = ({
  label = "Loading your journey",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-7 rounded-3xl px-12 py-14">
      {/* Orbit */}
      <div className="relative h-28 w-28">
        {/* Dashed flight path */}
        <svg
          className="absolute inset-0 w-full h-full drop-shadow-lg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="46.5"
            fill="none"
            stroke="#012c18"
            strokeOpacity="0.25"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        </svg>

        {/* Destination marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#012c18] opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#012c18]" />
          </span>
        </div>

        {/* Orbiting plane */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
          <div
            className="absolute"
            style={{
              top: "-12px",
              left: "50%",
              transform: "translateX(-50%) rotate(90deg)",
            }}
          >
            {/* Airplane SVG */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-lg"
            >
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                fill="#012c18"
              />
            </svg>
            {/* Trail behind airplane */}
            <div
              className="absolute top-[65px] -left-[18px] w-16 h-[3px] rounded-full -rotate-90"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(1,44,24,0.6))",
              }}
            />
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="flex items-center gap-1.5 text-sm font-medium tracking-wide text-[#012c18]/90">
        <span>{label}</span>
        <span className="flex gap-0.5">
          <span className="h-1 w-1 animate-bounce rounded-full bg-[#012c18] [animation-delay:-0.3s]" />
          <span className="h-1 w-1 animate-bounce rounded-full bg-[#012c18] [animation-delay:-0.15s]" />
          <span className="h-1 w-1 animate-bounce rounded-full bg-[#012c18]" />
        </span>
      </p>
    </div>
  );
};

export default LargeSuccessLoader;