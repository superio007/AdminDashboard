// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState('Overview');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Initialize charts
    const initCharts = () => {
      const errorChartContainer = document.getElementById('error-chart');
      const warningChartContainer = document.getElementById('warning-chart');
      const noticeChartContainer = document.getElementById('notice-chart');
      
      if (errorChartContainer && warningChartContainer && noticeChartContainer) {
        const errorChart = echarts.init(errorChartContainer);
        const warningChart = echarts.init(warningChartContainer);
        const noticeChart = echarts.init(noticeChartContainer);
        
        const errorOption = {
          animation: false,
          grid: { top: 5, right: 10, bottom: 5, left: 10 },
          xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            show: false,
          },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [650, 730, 780, 790, 750, 806],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              color: theme === 'light' ? 'rgba(255, 100, 100, 0.2)' : 'rgba(255, 100, 100, 0.3)'
            },
            lineStyle: { color: '#ff6464' }
          }],
          tooltip: { show: false }
        };
        
        const warningOption = {
          animation: false,
          grid: { top: 5, right: 10, bottom: 5, left: 10 },
          xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            show: false,
          },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [1800, 1900, 2100, 2300, 2500, 2778],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              color: theme === 'light' ? 'rgba(255, 150, 50, 0.2)' : 'rgba(255, 150, 50, 0.3)'
            },
            lineStyle: { color: '#ff9632' }
          }],
          tooltip: { show: false }
        };
        
        const noticeOption = {
          animation: false,
          grid: { top: 5, right: 10, bottom: 5, left: 10 },
          xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            show: false,
          },
          yAxis: { type: 'value', show: false },
          series: [{
            data: [400, 450, 500, 530, 580, 611],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              color: theme === 'light' ? 'rgba(64, 158, 255, 0.2)' : 'rgba(64, 158, 255, 0.3)'
            },
            lineStyle: { color: '#409eff' }
          }],
          tooltip: { show: false }
        };
        
        errorChart.setOption(errorOption);
        warningChart.setOption(warningOption);
        noticeChart.setOption(noticeOption);
      }
    };
    
    initCharts();
    
    // Cleanup
    return () => {
      const charts = document.querySelectorAll('.chart-container');
      charts.forEach(chart => {
        const instance = echarts.getInstanceByDom(chart as HTMLElement);
        if (instance) {
          instance.dispose();
        }
      });
    };
  }, [theme]);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900 text-white'} transition-colors duration-300`}>
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-16 fixed left-0 top-0 bottom-0 ${theme === 'light' ? 'bg-white border-r border-gray-200' : 'bg-gray-800 border-r border-gray-700'} flex flex-col items-center py-4 z-10`}>
          <div className="mb-8 text-center">
            <i className="fas fa-chart-line text-xl cursor-pointer"></i>
          </div>
          <div className="flex flex-col space-y-6 items-center">
            <div className={`p-2 rounded-lg ${theme === 'light' ? 'bg-blue-50 text-blue-500' : 'bg-blue-900 text-blue-300'} cursor-pointer`}>
              <i className="fas fa-home"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-pen"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-table"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-chart-bar"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-globe"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-search"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-link"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-cog"></i>
            </div>
            <div className="p-2 cursor-pointer">
              <i className="fas fa-sync-alt"></i>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="ml-16 w-full">
          {/* Header */}
          <header className={`flex justify-between items-center px-6 py-3 ${theme === 'light' ? 'bg-white border-b border-gray-200' : 'bg-gray-800 border-b border-gray-700'}`}>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">SEO Scientist</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full flex items-center space-x-2 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                <i className="fas fa-building text-sm"></i>
                <span className="text-sm">agencyspot.seoscientist</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                {theme === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
              </button>
              <button className="p-2 rounded-full cursor-pointer !rounded-button whitespace-nowrap">
                <i className="fas fa-expand-alt"></i>
              </button>
            </div>
          </header>
          
          {/* Main Content Area */}
          <main className="p-6">
            {/* Site Audit Header */}
            <div className={`mb-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg p-6 shadow-sm`}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-semibold">Site Audit</h2>
                    <div className={`px-3 py-1 rounded-full flex items-center space-x-2 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                      <i className="fas fa-globe text-sm"></i>
                      <span className="text-sm">No website selected</span>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                      <i className="far fa-clock mr-2"></i>
                      <span>Updated: April 6, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-tag mr-2"></i>
                      <span>Campaign #4</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-redo"></i>
                    <span>Rerun Audit</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border rounded cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-download"></i>
                    <span>Export</span>
                    <i className="fas fa-chevron-down text-xs ml-1"></i>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border rounded cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-share-alt"></i>
                    <span>Share</span>
                  </button>
                  <button className="p-2 border rounded cursor-pointer !rounded-button whitespace-nowrap">
                    <i className="fas fa-cog"></i>
                  </button>
                </div>
              </div>
              
              {/* Status Bar */}
              <div className={`flex flex-wrap items-center p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                <div className="flex items-center mr-6">
                  <i className="fas fa-mobile-alt mr-2"></i>
                  <span>Mobile</span>
                </div>
                <div className="flex items-center mr-6">
                  <i className="fas fa-code mr-2"></i>
                  <span>JS rendering: Disabled</span>
                </div>
                <div className="flex items-center mr-6">
                  <i className="fas fa-file mr-2"></i>
                  <span>Pages crawled: 159/500</span>
                </div>
                <div className="flex items-center mr-6">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span>Health Score: 80%</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    <span>Issues: 806</span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-6 border-b">
                {['Overview', 'Issues', 'Crawled Pages', 'Statistics', 'Compare Crawls', 'Progress', 'JS Impact', 'Keywords', 'On-Page', 'Technical'].map((tab) => (
                  <button
                    key={tab}
                    className={`pb-3 px-1 font-medium whitespace-nowrap cursor-pointer !rounded-button ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Overview Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Site Health Card */}
              <div className={`p-6 rounded-lg shadow-sm ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <h3 className="text-lg font-semibold mb-4">Site Health</h3>
                <div className="flex justify-center mb-4">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="45" fill="none" stroke={theme === 'light' ? '#f0f0f0' : '#4a4a4a'} strokeWidth="10" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="10" 
                        strokeDasharray="283" 
                        strokeDashoffset="56.6" 
                        transform="rotate(-90 50 50)" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold">80</span>
                      <span className="text-sm text-gray-500">Site Health</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                      <span>Your site</span>
                    </div>
                    <span>80%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      <span>Top-10% websites</span>
                    </div>
                    <span>92%</span>
                  </div>
                </div>
              </div>
              
              {/* Errors Card */}
              <div className={`p-6 rounded-lg shadow-sm ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-red-500">806 <span className="text-sm text-green-500">+283</span></h3>
                </div>
                <h4 className="text-lg mb-4">Errors</h4>
                <div id="error-chart" className="chart-container w-full h-32"></div>
                <div className="flex justify-between mt-2">
                  <span>0</span>
                  <span>806</span>
                </div>
              </div>
              
              {/* Warnings Card */}
              <div className={`p-6 rounded-lg shadow-sm ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-yellow-500">2778 <span className="text-sm text-green-500">+1,066</span></h3>
                </div>
                <h4 className="text-lg mb-4">Warnings</h4>
                <div id="warning-chart" className="chart-container w-full h-32"></div>
                <div className="flex justify-between mt-2">
                  <span>0</span>
                  <span>2778</span>
                </div>
              </div>
              
              {/* Notices Card */}
              <div className={`p-6 rounded-lg shadow-sm ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-blue-500">611 <span className="text-sm text-green-500">+237</span></h3>
                </div>
                <h4 className="text-lg mb-4">Notices</h4>
                <div id="notice-chart" className="chart-container w-full h-32"></div>
                <div className="flex justify-between mt-2">
                  <span>0</span>
                  <span>611</span>
                </div>
              </div>
            </div>
            
            {/* Thematic Reports */}
            <div className={`p-6 rounded-lg shadow-sm mb-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
              <h3 className="text-lg font-semibold mb-6">Thematic Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Crawlability Card */}
                <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Crawlability</h4>
                    <i className="fas fa-robot"></i>
                  </div>
                  <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
                </div>
                
                {/* HTTPS Card */}
                <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">HTTPS</h4>
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="text-3xl font-bold text-yellow-500 mb-2">84%</div>
                </div>
                
                {/* International SEO Card */}
                <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">International SEO</h4>
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    International SEO is not implemented on this site.
                  </div>
                </div>
                
                {/* Core Web Vitals Card */}
                <div className={`p-6 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Core Web Vitals</h4>
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  <div className="text-3xl font-bold text-red-500 mb-2">0%</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;

