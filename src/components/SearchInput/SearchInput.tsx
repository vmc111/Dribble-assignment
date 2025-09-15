import React, { useState, forwardRef } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
  isLoading?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({
  placeholder = "Search",
  onSearch,
  defaultValue = "",
  isLoading = false
}, ref) => {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <div className="absolute left-4 flex items-center pointer-events-none">
          {isLoading ? (
            <svg className="h-6 w-6 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
        <input
          ref={ref}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full pl-12 pr-32 py-2 text-gray-900 text-lg bg-transparent border-none outline-none focus:outline-none transition-all duration-200 placeholder-gray-400"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors underline"
          >
            Clear
          </button>
        )}
        {!isFocused && !query && (
          <div className="absolute right-4 flex items-center space-x-2 text-sm text-gray-400 pointer-events-none">
            <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono text-gray-500 border border-gray-300">s</kbd>
            <span className="text-gray-400">quick access</span>
          </div>
        )}
      </div>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';

export default SearchInput;
