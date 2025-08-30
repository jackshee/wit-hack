// Mock data for Dougie's reading progress (5-year-old child)
export const mockUserData = {
  username: "Dougie",
  email: "dougie@example.com",
  joinDate: "2024-01-15",
  
  // Reading progress data for the past 12 months (realistic for a 5-year-old)
  readingProgress: [
    { month: "Jan 2024", booksRead: 28, pagesRead: 420, timeSpent: 140 },
    { month: "Feb 2024", booksRead: 25, pagesRead: 375, timeSpent: 125 },
    { month: "Mar 2024", booksRead: 31, pagesRead: 465, timeSpent: 155 },
    { month: "Apr 2024", booksRead: 30, pagesRead: 450, timeSpent: 150 },
    { month: "May 2024", booksRead: 31, pagesRead: 465, timeSpent: 155 },
    { month: "Jun 2024", booksRead: 30, pagesRead: 450, timeSpent: 150 },
    { month: "Jul 2024", booksRead: 31, pagesRead: 465, timeSpent: 155 },
    { month: "Aug 2024", booksRead: 31, pagesRead: 465, timeSpent: 155 },
    { month: "Sep 2024", booksRead: 30, pagesRead: 450, timeSpent: 150 },
    { month: "Oct 2024", booksRead: 31, pagesRead: 465, timeSpent: 155 },
    { month: "Nov 2024", booksRead: 30, pagesRead: 450, timeSpent: 150 },
    { month: "Dec 2024", booksRead: 31, pagesRead: 465, timeSpent: 155 }
  ],
  
  // Recent books read (realistic children's books)
  recentBooks: [
    { title: "The Very Hungry Caterpillar", author: "Eric Carle", date: "2024-12-15", rating: 5, pages: 22 },
    { title: "Where the Wild Things Are", author: "Maurice Sendak", date: "2024-12-14", rating: 4, pages: 48 },
    { title: "Goodnight Moon", author: "Margaret Wise Brown", date: "2024-12-13", rating: 5, pages: 32 },
    { title: "The Gruffalo", author: "Julia Donaldson", date: "2024-12-12", rating: 4, pages: 32 },
    { title: "We're Going on a Bear Hunt", author: "Michael Rosen", date: "2024-12-11", rating: 5, pages: 36 }
  ],
  
  // Reading statistics (realistic totals)
  totalStats: {
    totalBooks: 365, // About 1 book per day for a year
    totalPages: 5475, // Average 15 pages per book
    totalTime: 1825, // About 5 minutes per book
    averageRating: 4.7,
    favoriteGenre: "Picture Books",
    readingStreak: 15 // days
  }
};

// Helper function to get data for specific time range
export const getReadingDataForRange = (months = 3) => {
  const data = mockUserData.readingProgress;
  return data.slice(-months);
};

// Helper function to get chart data
export const getChartData = (months = 3) => {
  const data = getReadingDataForRange(months);
  
  return {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Books Read',
        data: data.map(item => item.booksRead),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Pages Read',
        data: data.map(item => item.pagesRead),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1'
      }
    ]
  };
}; 