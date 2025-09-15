import React, { useState, useMemo, useRef, useEffect } from 'react'
import SearchInput from '../SearchInput'
import TabNavigation from '../TabNavigation'
import SearchResultItem from '../SearchResultItem'
import SettingsDropdown from '../SettingsDropdown'
import SkeletonLoader from '../SkeletonLoader'

interface SearchResult {
  id: string
  type: 'person' | 'folder' | 'file' | 'video' | 'image'
  title: string
  subtitle?: string
  metadata?: string
  avatar?: string
  isOnline?: boolean
  fileCount?: number
  url?: string
}

interface TabVisibility {
  files: boolean
  people: boolean
  chats: boolean
  lists: boolean
}

const SearchResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [tabVisibility, setTabVisibility] = useState<TabVisibility>({
    files: true,
    people: true,
    chats: false,
    lists: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 's' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const activeElement = document.activeElement
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          event.preventDefault()
          searchInputRef.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSearch = (query: string) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (query.trim()) {
      setIsLoading(true)
      searchTimeoutRef.current = setTimeout(() => {
        setSearchQuery(query)
        setIsLoading(false)
      }, 800)
    } else {
      setSearchQuery(query)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  const sampleResults: SearchResult[] = useMemo(() => [
    {
      id: '1',
      type: 'person',
      title: 'Caroline Dribsson',
      subtitle: 'Unactivated',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      isOnline: false
    },
    {
      id: '2',
      type: 'person',
      title: 'Javier Alaves',
      subtitle: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: '3',
      type: 'image',
      title: 'creative_file_frankies.jpg',
      subtitle: 'in Photos/Assets',
      metadata: 'Edited 12m ago',
      url: 'https://example.com/creative_file_frankies.jpg'
    },
    {
      id: '4',
      type: 'video',
      title: 'Dribbble Video.mp4',
      subtitle: 'in Dribbble Folder',
      metadata: 'Edited 5m ago',
      fileSize: '15.2 MB'
    },
    {
      id: '5',
      type: 'file',
      title: 'Dribbble Design.fig',
      subtitle: 'in Dribbble Folder',
      metadata: 'Edited 1h ago',
      fileSize: '8.1 MB'
    },
    {
      id: '6',
      type: 'folder',
      title: 'Dribbble Folder',
      subtitle: 'in Projects',
      metadata: 'Edited 2m ago',
      fileCount: 12
    }
  ], [])

  const getFilteredCount = (type: string) => {
    let filtered = sampleResults;
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    switch (type) {
      case 'files':
        return filtered.filter(result => ['file', 'folder', 'video', 'image'].includes(result.type)).length
      case 'people':
        return filtered.filter(result => result.type === 'person').length
      case 'chats':
        return 0
      case 'lists':
        return 0
      default:
        return filtered.length
    }
  }

  const tabs = [
    {
      id: 'all',
      label: 'All',
      count: getFilteredCount('all'),
      visible: true
    },
    {
      id: 'files',
      label: 'Files',
      count: getFilteredCount('files'),
      icon: '📄',
      visible: tabVisibility.files
    },
    {
      id: 'people',
      label: 'People',
      count: getFilteredCount('people'),
      icon: '👤',
      visible: tabVisibility.people
    },
    {
      id: 'chats',
      label: 'Chats',
      count: getFilteredCount('chats'),
      icon: '💬',
      visible: tabVisibility.chats
    },
    {
      id: 'lists',
      label: 'Lists',
      count: getFilteredCount('lists'),
      icon: '📋',
      visible: tabVisibility.lists
    }
  ]

  const filteredResults = useMemo(() => {
    let filtered = sampleResults

    if (searchQuery.trim()) {
      filtered = filtered.filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    switch (activeTab) {
      case 'files':
        filtered = filtered.filter(result => ['file', 'folder', 'video', 'image'].includes(result.type))
        break
      case 'people':
        filtered = filtered.filter(result => result.type === 'person')
        break
      case 'chats':
        filtered = []
        break
      case 'lists':
        filtered = []
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, activeTab, sampleResults])

  const handleTabVisibilityChange = (newVisibility: TabVisibility) => {
    setTabVisibility(newVisibility)
    
    if (activeTab === 'files' && !newVisibility.files) {
      setActiveTab('all')
    } else if (activeTab === 'people' && !newVisibility.people) {
      setActiveTab('all')
    } else if (activeTab === 'chats' && !newVisibility.chats) {
      setActiveTab('all')
    } else if (activeTab === 'lists' && !newVisibility.lists) {
      setActiveTab('all')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out">
        <div className="p-3 px-6">
          <SearchInput
            ref={searchInputRef}
            placeholder="Searching is easier"
            defaultValue=""
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>

        
        {(searchQuery.trim() || isLoading) && (
          <div className="px-6 pb-2">
            <TabNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              settingsComponent={
                <SettingsDropdown
                  tabVisibility={tabVisibility}
                  onTabVisibilityChange={handleTabVisibilityChange}
                  className='ml-auto'
                />
              }
            />
          </div>
        )}

        {/* Results List - Show when there's search text, loading, or results */}
        <div className="px-4 transition-all duration-300 ease-in-out overflow-y-auto scrollbar-hide" style={{
          height: (searchQuery.trim() || isLoading) ? 
            (isLoading ? '300px' : filteredResults.length === 0 ? '200px' : `${Math.min(384, filteredResults.length * 72 + 32)}px`) : 
            '0px',
          minHeight: (searchQuery.trim() || isLoading) ? '180px' : '0px',
          opacity: (searchQuery.trim() || isLoading) ? 1 : 0
        }}>
          {(searchQuery.trim() || isLoading) && (
            isLoading ? (
              <div className="space-y-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonLoader key={index} />
                ))}
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-1">
                {filteredResults.map((result) => (
                  <SearchResultItem
                    key={result.id}
                    type={result.type}
                    title={result.title}
                    subtitle={result.subtitle}
                    metadata={result.metadata}
                    avatar={result.avatar}
                    isOnline={result.isOnline}
                    fileCount={result.fileCount}
                    url={result.url}
                    onClick={() => console.log('Clicked:', result.title)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">No results found</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchResults
