import React from 'react'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterBarProps {
  categories: FilterOption[]
  sortOptions: FilterOption[]
  activeCategory: string
  activeSortOption: string
  onCategoryChange: (categoryId: string) => void
  onSortChange: (sortId: string) => void
  resultCount?: number
  className?: string
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  sortOptions,
  activeCategory,
  activeSortOption,
  onCategoryChange,
  onSortChange,
  resultCount,
  className = ""
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      {/* Results Count */}
      {resultCount !== undefined && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">{resultCount.toLocaleString()}</span> results found
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Categories:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
                {category.count !== undefined && (
                  <span className={`ml-1 ${
                    activeCategory === category.id ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    ({category.count})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
          <select
            value={activeSortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
