import React from 'react'

interface SkeletonLoaderProps {
  className?: string
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="flex items-center space-x-3 p-3">
        {/* Avatar/Icon skeleton */}
        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        
        {/* Content skeleton */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        {/* Right side skeleton */}
        <div className="w-16 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default SkeletonLoader
