import React from 'react'

interface SearchResultItemProps {
  type: 'person' | 'folder' | 'file' | 'video'
  title: string
  subtitle?: string
  metadata?: string
  avatar?: string
  isOnline?: boolean
  fileCount?: number
  className?: string
  onClick?: () => void
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  type,
  title,
  subtitle,
  metadata,
  avatar,
  isOnline,
  fileCount,
  className = "",
  onClick
}) => {
  const getIcon = () => {
    switch (type) {
      case 'person':
        return (
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {avatar ? (
                <img src={avatar} alt={title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">
                  {title.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
        )
      case 'folder':
        return (
          <div className="w-10 h-10 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          </div>
        )
      case 'file':
        return (
          <div className="w-10 h-10 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        )
      case 'video':
        return (
          <div className="w-10 h-10 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${className}`}
      onClick={onClick}
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
          {fileCount && (
            <span className="text-xs text-gray-500 font-normal">{fileCount} Files</span>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        )}
        {metadata && (
          <p className="text-xs text-gray-400 truncate">{metadata}</p>
        )}
      </div>
    </div>
  )
}

export default SearchResultItem
