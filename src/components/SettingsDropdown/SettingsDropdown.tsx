import React, { useState, useRef, useEffect } from 'react';
import Switch from '../Switch';

interface TabVisibility {
  files: boolean;
  people: boolean;
  chats: boolean;
  lists: boolean;
}

interface SettingsDropdownProps {
  tabVisibility: TabVisibility;
  onTabVisibilityChange: (visibility: TabVisibility) => void;
  className?: string;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  tabVisibility,
  onTabVisibilityChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleToggle = (key: keyof TabVisibility) => {
    onTabVisibilityChange({
      ...tabVisibility,
      [key]: !tabVisibility[key]
    });
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => isOpen ? handleClose() : handleOpen()}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
      >
        <svg className={`w-6 h-6 transition-transform duration-200 ease-in-out ${isOpen ? 'rotate-90' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ease-out transform ${
          isAnimating 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2'
        }`}>
          <div className="py-2">
            <button 
              onClick={() => handleToggle('files')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <svg className={`w-5 h-5 ${tabVisibility.files ? 'text-gray-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className={`text-sm font-medium ${tabVisibility.files ? 'text-gray-700' : 'text-gray-400'}`}>Files</span>
              </div>
              <Switch
                size="sm"
                isSelected={tabVisibility.files}
                onChange={() => {}}
              />
            </button>

            <button 
              onClick={() => handleToggle('people')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <svg className={`w-5 h-5 ${tabVisibility.people ? 'text-gray-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className={`text-sm font-medium ${tabVisibility.people ? 'text-gray-700' : 'text-gray-400'}`}>People</span>
              </div>
              <Switch
                size="sm"
                isSelected={tabVisibility.people}
                onChange={() => {}}
              />
            </button>

            <button 
              onClick={() => handleToggle('chats')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <svg className={`w-5 h-5 ${tabVisibility.chats ? 'text-gray-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className={`text-sm font-medium ${tabVisibility.chats ? 'text-gray-700' : 'text-gray-400'}`}>Chats</span>
              </div>
              <Switch
                size="sm"
                isSelected={tabVisibility.chats}
                onChange={() => {}}
              />
            </button>

            <button 
              onClick={() => handleToggle('lists')}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <svg className={`w-5 h-5 ${tabVisibility.lists ? 'text-gray-500' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span className={`text-sm font-medium ${tabVisibility.lists ? 'text-gray-700' : 'text-gray-400'}`}>Lists</span>
              </div>
              <Switch
                size="sm"
                isSelected={tabVisibility.lists}
                onChange={() => {}}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
