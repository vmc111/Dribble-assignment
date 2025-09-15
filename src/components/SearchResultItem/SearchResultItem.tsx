import React from 'react'

interface SearchResultItemProps {
  type: 'person' | 'folder' | 'file' | 'video' | 'image'
  title: string
  subtitle?: string
  metadata?: string
  avatar?: string
  isOnline?: boolean
  fileCount?: number
  className?: string
  onClick?: () => void
  url?: string
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
  onClick,
  url
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
      case 'image':
        return (
          <div className="w-10 h-10 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  const handleOpenInNewTab = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (url) {
      window.open(url, '_blank')
    }
  }

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (url) {
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <div
      className={`group flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${className}`}
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
      {type === 'image' && url && (
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleCopyLink}
            className="px-2 py-1 text-xs bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            title="Copy link"
          >
            Copy link
          </button>
          <button
            onClick={handleOpenInNewTab}
            className="px-2 py-1 text-xs bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center space-x-1"
            title="Open in new tab"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>New Tab</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchResultItem
