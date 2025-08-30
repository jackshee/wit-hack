import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { mockUserData, getChartData } from '../data/mockUserData';
import Navbar from './Navbar';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState(3); // Default to 3 months
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Reading Progress - Last ${timeRange} Months`,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Books Read'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Pages Read'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const handleTimeRangeChange = (months) => {
    setTimeRange(months);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="profile" />

      {/* Profile Content */}
      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button 
            className="inline-flex items-center space-x-2 text-primary hover:text-blue-700 font-medium mb-8 transition-colors duration-200"
            onClick={handleBackToHome}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>

          {/* Profile Header */}
          <div className="bg-content-bg rounded-xl p-8 mb-8 shadow-lg border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {mockUserData.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-text mb-2">
                  Welcome back, {mockUserData.username}! 👋
                </h1>
                <p className="text-lg text-text/70">
                  Member since {new Date(mockUserData.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-content-bg rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-text/70 mb-2">Total Books</h3>
              <p className="text-3xl font-bold text-primary">{mockUserData.totalStats.totalBooks}</p>
            </div>
            <div className="bg-content-bg rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-text/70 mb-2">Total Pages</h3>
              <p className="text-3xl font-bold text-primary">{mockUserData.totalStats.totalPages}</p>
            </div>
            <div className="bg-content-bg rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-text/70 mb-2">Reading Streak</h3>
              <p className="text-3xl font-bold text-primary">{mockUserData.totalStats.readingStreak} days</p>
            </div>
            <div className="bg-content-bg rounded-xl p-6 shadow-lg border border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-text/70 mb-2">Average Rating</h3>
              <p className="text-3xl font-bold text-primary">{mockUserData.totalStats.averageRating}/5</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-content-bg rounded-xl p-8 mb-8 shadow-lg border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-4 lg:mb-0">
                Reading Progress
              </h2>
              <div className="flex space-x-2">
                <button 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    timeRange === 3 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-100 text-text hover:bg-gray-200'
                  }`}
                  onClick={() => handleTimeRangeChange(3)}
                >
                  3 Months
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    timeRange === 6 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-100 text-text hover:bg-gray-200'
                  }`}
                  onClick={() => handleTimeRangeChange(6)}
                >
                  6 Months
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    timeRange === 12 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-100 text-text hover:bg-gray-200'
                  }`}
                  onClick={() => handleTimeRangeChange(12)}
                >
                  12 Months
                </button>
              </div>
            </div>
            
            <div className="h-80 sm:h-96">
              <Line data={getChartData(timeRange)} options={chartOptions} />
            </div>
          </div>

          {/* Recent Books */}
          <div className="bg-content-bg rounded-xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-6">
              Recently Read
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUserData.recentBooks.map((book, index) => (
                <div key={index} className="bg-background rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-20 bg-secondary rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      📚
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text text-lg mb-1 truncate">{book.title}</h3>
                      <p className="text-text/70 text-sm mb-1">by {book.author}</p>
                      <p className="text-text/50 text-xs mb-2">{new Date(book.date).toLocaleDateString()}</p>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-sm ${i < book.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 