interface LogoProps {
    className?: string
  }
  
  export default function Logo({ className = "" }: LogoProps) {
    return (
      <div className={`flex items-center ${className}`}>
        {/* Palm Tree Icon */}
        <svg
          className="w-8 h-8 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2v20M7 8c0-3.314 2.686-6 6-6s6 2.686 6 6c0 0-2 2-6 2s-6-2-6-2z" className="text-white" />
        </svg>
        <span className="text-white text-2xl font-bold tracking-wider">adventurer</span>
      </div>
    )
  }

  