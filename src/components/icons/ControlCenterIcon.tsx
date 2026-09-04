import React from 'react'

export const AppleControlCenterIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Toggle Superior */}
    <rect x="2" y="4" width="20" height="7" rx="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="6.5" cy="7.5" r="2" fill="currentColor" />
    {/* Toggle Inferior */}
    <rect x="2" y="13" width="20" height="7" rx="3.5" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="16.5" r="2" fill="currentColor" />
  </svg>
)
