import React from 'react';

interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  visible?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  settingsComponent?: React.ReactNode;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  settingsComponent,
  className = ""
}) => {
  const visibleTabs = tabs.filter(tab => tab.visible !== false);

  return (
    <div className="flex items-end justify-between border-b border-gray-200">
      <div className={`flex items-end space-x-4 overflow-x-auto scrollbar-hide flex-1 ${className}`}>
        {visibleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-1.5 pb-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-black text-black font-medium'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.icon && <span className="text-sm">{tab.icon}</span>}
            <span className="text-sm font-medium">{tab.label}</span>
            {tab.count !== undefined && (
              <span className="text-xs text-gray-400 font-normal">{tab.count}</span>
            )}
          </button>
        ))}
      </div>
      {settingsComponent && (
        <div className="flex-shrink-0 ml-3">
          {settingsComponent}
        </div>
      )}
    </div>
  );
};

export default TabNavigation;
