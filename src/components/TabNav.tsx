import React from 'react';

interface TabNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { name: 'All', count: 3 },
  { name: 'Pass', count: 1 },
  { name: 'Fail', count: 1 },
  { name: 'Pending', count: 1 },
];

const TabNav: React.FC<TabNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-6 border-b-2 mb-8 text-lg">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === tab.name
              ? 'border-b-4 border-[--color-orange] text-[--color-orange]'
              : 'text-[--color-gray]'
          }`}
        >
          {tab.name} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default TabNav;