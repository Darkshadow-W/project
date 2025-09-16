<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Student Attendance Portal</title>
  {/* Tailwind CSS for styling */}
  {/* Chart.js for graphical representation */}
  {/* Google Fonts: Inter */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />
  {/* Custom Styles */}
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body {\n            font-family: 'Inter', sans-serif;\n            background-color: #f3f4f6; /* A light gray background */\n        }\n        /* Simple transition for better UX */\n        .transition-all {\n            transition: all 0.3s ease-in-out;\n        }\n        /* Custom scrollbar for a cleaner look */\n        ::-webkit-scrollbar {\n            width: 8px;\n        }\n        ::-webkit-scrollbar-track {\n            background: #f1f1f1;\n        }\n        ::-webkit-scrollbar-thumb {\n            background: #888;\n            border-radius: 4px;\n        }\n        ::-webkit-scrollbar-thumb:hover {\n            background: #555;\n        }\n    "
    }}
  />
  {/* Main Container */}
  <div
    id="app"
    className="min-h-screen flex flex-col items-center justify-center p-4"
  >
    {/* Login Selection View */}
    <div id="login-selection-view" className="w-full max-w-md">
      <div className="bg-white shadow-2xl rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Attendance Portal
        </h1>
        <p className="text-gray-500 mb-8">
          Please select your role to continue.
        </p>
        <div className="space-y-4">
          <button
            id="show-student-login-btn"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105"
          >
            I am a Student
          </button>
          <button
            className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all cursor-not-allowed"
            disabled=""
          >
            I am a Teacher{" "}
            <span className="text-xs font-normal">(Coming Soon)</span>
          </button>
        </div>
      </div>
      <p className="text-center text-gray-400 text-xs mt-6">
        © 2025 University Portal. All rights reserved.
      </p>
    </div>
    {/* Student Login Modal (initially hidden) */}
    <div
      id="student-login-modal"
      className="hidden fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 relative">
        <button
          id="close-login-modal-btn"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Student Login
        </h2>
        <form id="student-login-form">
          <div className="mb-4">
            <label
              htmlFor="student-id"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Student ID
            </label>
            <input
              type="text"
              id="student-id"
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., S12345"
              required=""
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="******************"
              required=""
            />
            <p id="login-error" className="text-red-500 text-xs italic hidden">
              Invalid Student ID or password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
    {/* Student Dashboard View (initially hidden) */}
    <div id="dashboard-view" className="hidden w-full max-w-7xl mx-auto">
      {/* Header */}
      <header className="bg-white shadow-md rounded-2xl p-4 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Attendance Dashboard
          </h1>
          <p id="welcome-message" className="text-gray-600">
            Welcome, Student!
          </p>
        </div>
        <button
          id="logout-btn"
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 transition-all"
        >
          Logout
        </button>
      </header>
      {/* Date Filter */}
      <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
        <h3 className="font-bold text-lg mb-2">Filter by Date</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div>
            <label
              htmlFor="start-date"
              className="text-sm font-medium text-gray-700"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="start-date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="text-sm font-medium text-gray-700"
            >
              End Date:
            </label>
            <input
              type="date"
              id="end-date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
          </div>
          <button
            id="filter-btn"
            className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2 sm:mt-5"
          >
            Apply Filter
          </button>
        </div>
      </div>
      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Overall Percentage
          </h2>
          <p
            id="overall-percentage"
            className="text-5xl font-bold text-blue-600"
          >
            0%
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Classes Attended
          </h2>
          <p
            id="classes-attended"
            className="text-5xl font-bold text-green-600"
          >
            0
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">
            Total Classes
          </h2>
          <p id="total-classes" className="text-5xl font-bold text-gray-700">
            0
          </p>
        </div>
      </div>
      {/* Tabbed Interface for Detailed Views */}
      <div className="bg-white shadow-md rounded-2xl">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
            <button
              data-tab="subjects"
              className="tab-btn border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Subject Breakdown
            </button>
            <button
              data-tab="chart"
              className="tab-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Attendance Chart
            </button>
            <button
              data-tab="log"
              className="tab-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
            >
              Daily Log
            </button>
          </nav>
        </div>
        <div className="p-6">
          {/* Subject Breakdown View */}
          <div id="tab-content-subjects" className="tab-content">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subject Code
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subject Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Attended / Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Percentage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody
                  id="subject-table-body"
                  className="bg-white divide-y divide-gray-200"
                >
                  {/* Rows will be injected by JavaScript */}
                </tbody>
              </table>
            </div>
          </div>
          {/* Attendance Chart View */}
          <div id="tab-content-chart" className="tab-content hidden">
            <div className="w-full h-96">
              <canvas id="attendanceChart" />
            </div>
          </div>
          {/* Daily Log View */}
          <div id="tab-content-log" className="tab-content hidden">
            <div className="overflow-x-auto max-h-96">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subject
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody
                  id="daily-log-body"
                  className="bg-white divide-y divide-gray-200"
                >
                  {/* Log rows will be injected by JavaScript */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
