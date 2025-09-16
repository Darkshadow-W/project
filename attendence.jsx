import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- MOCK DATA ---
// In a real application, this data would come from an API.
const students = {
    "S12345": { name: "Alex Johnson", password: "password123" },
    "S67890": { name: "Maria Garcia", password: "password456" }
};

const attendanceData = [
    // Alex's Data
    { studentId: "S12345", subjectCode: "CS101", subjectName: "Intro to Programming", date: "2025-09-01", status: "Present" },
    { studentId: "S12345", subjectCode: "MA202", subjectName: "Calculus II", date: "2025-09-01", status: "Present" },
    { studentId: "S12345", subjectCode: "CS101", subjectName: "Intro to Programming", date: "2025-09-03", status: "Present" },
    { studentId: "S12345", subjectCode: "MA202", subjectName: "Calculus II", date: "2025-09-03", status: "Absent" },
    { studentId: "S12345", subjectCode: "PH150", subjectName: "Modern Physics", date: "2025-09-04", status: "Present" },
    { studentId: "S12345", subjectCode: "CS101", subjectName: "Intro to Programming", date: "2025-09-05", status: "Present" },
    { studentId: "S12345", subjectCode: "MA202", subjectName: "Calculus II", date: "2025-09-05", status: "Present" },
    { studentId: "S12345", subjectCode: "PH150", subjectName: "Modern Physics", date: "2025-09-06", status: "Absent" },
    { studentId: "S12345", subjectCode: "CS101", subjectName: "Intro to Programming", date: "2025-09-08", status: "Present" },
    { studentId: "S12345", subjectCode: "MA202", subjectName: "Calculus II", date: "2025-09-08", status: "Present" },
    { studentId: "S12345", subjectCode: "CS101", subjectName: "Intro to Programming", date: "2025-09-10", status: "Absent" },
    { studentId: "S12345", subjectCode: "PH150", subjectName: "Modern Physics", date: "2025-09-11", status: "Present" },
    { studentId: "S12345", subjectCode: "MA202", subjectName: "Calculus II", date: "2025-09-12", status: "Present" },

    // Maria's Data
    { studentId: "S67890", subjectCode: "BIO101", subjectName: "General Biology", date: "2025-09-02", status: "Present" },
    { studentId: "S67890", subjectCode: "CHM210", subjectName: "Organic Chemistry", date: "2025-09-02", status: "Present" },
    { studentId: "S67890", subjectCode: "BIO101", subjectName: "General Biology", date: "2025-09-04", status: "Absent" },
    { studentId: "S67890", subjectCode: "CHM210", subjectName: "Organic Chemistry", date: "2025-09-04", status: "Present" },
    { studentId: "S67890", subjectCode: "BIO101", subjectName: "General Biology", date: "2025-09-09", status: "Present" },
    { studentId: "S67890", subjectCode: "CHM210", subjectName: "Organic Chemistry", date: "2025-09-09", status: "Present" },
];


// --- Helper Components ---

const LoginSelector = ({ onStudentLoginClick }) => (
    <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Portal</h1>
            <p className="text-gray-500 mb-8">Please select your role to continue.</p>
            <div className="space-y-4">
                <button onClick={onStudentLoginClick} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105">
                    I am a Student
                </button>
                <button className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all cursor-not-allowed" disabled>
                    I am a Teacher <span className="text-xs font-normal">(Coming Soon)</span>
                </button>
            </div>
        </div>
        <p className="text-center text-gray-400 text-xs mt-6">&copy; 2025 University Portal. All rights reserved.</p>
    </div>
);

const StudentLoginModal = ({ onLogin, onClose }) => {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (students[studentId] && students[studentId].password === password) {
            setError('');
            onLogin({ id: studentId, ...students[studentId] });
        } else {
            setError('Invalid Student ID or password.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Student Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="student-id" className="block text-gray-700 text-sm font-bold mb-2">Student ID</label>
                        <input type="text" id="student-id" value={studentId} onChange={(e) => setStudentId(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g., S12345" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password-modal" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input type="password" id="password-modal" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="******************" required />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all" type="submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Dashboard = ({ student, onLogout, studentRecords }) => {
    const [activeTab, setActiveTab] = useState('subjects');
    const [dateRange, setDateRange] = useState({ start: '2025-09-01', end: '2025-09-14' });
    const [filteredRecords, setFilteredRecords] = useState([]);

    useEffect(() => {
        // Initial filter on load and when student data changes
        const filtered = studentRecords.filter(record => {
            const isAfterStart = !dateRange.start || record.date >= dateRange.start;
            const isBeforeEnd = !dateRange.end || record.date <= dateRange.end;
            return isAfterStart && isBeforeEnd;
        });
        setFilteredRecords(filtered);
    }, [studentRecords, dateRange]);
    
    const handleFilter = () => {
         // This effect is handled by the useEffect above when dateRange changes.
         // This function is kept to be called by the button for clarity.
         // No logic needed here as state change triggers the filter.
         // We just ensure the state is set correctly via the inputs' onChange.
    };

    const summary = useMemo(() => {
        const total = filteredRecords.length;
        const attended = filteredRecords.filter(r => r.status === 'Present').length;
        const percentage = total > 0 ? ((attended / total) * 100).toFixed(1) : 0;
        return { total, attended, percentage };
    }, [filteredRecords]);

    const subjectBreakdown = useMemo(() => {
        const stats = {};
        filteredRecords.forEach(record => {
            if (!stats[record.subjectCode]) {
                stats[record.subjectCode] = { name: record.subjectName, total: 0, present: 0 };
            }
            stats[record.subjectCode].total++;
            if (record.status === 'Present') {
                stats[record.subjectCode].present++;
            }
        });
        return Object.entries(stats).map(([code, data]) => {
            const percentage = data.total > 0 ? ((data.present / data.total) * 100).toFixed(1) : 0;
            return { code, ...data, percentage };
        });
    }, [filteredRecords]);

    const dailyLog = useMemo(() => {
        return [...filteredRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [filteredRecords]);
    
    const getPercentageColor = (p) => {
        if (p >= 90) return 'text-green-600';
        if (p >= 75) return 'text-blue-600';
        if (p >= 50) return 'text-yellow-500';
        return 'text-red-600';
    };
    
    const getStatusBadge = (p) => {
        if (p >= 75) return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Safe</span>;
        if (p >= 50) return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Warning</span>;
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Critical</span>;
    };
    
    const TabButton = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tabId ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
        >
            {children}
        </button>
    );

    return (
        <div className="w-full max-w-7xl mx-auto">
            <header className="bg-white shadow-md rounded-2xl p-4 mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance Dashboard</h1>
                    <p className="text-gray-600">Welcome, {student.name}!</p>
                </div>
                <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-red-300 transition-all">
                    Logout
                </button>
            </header>

            <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
                <h3 className="font-bold text-lg mb-2">Filter by Date</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div>
                        <label htmlFor="start-date" className="text-sm font-medium text-gray-700">Start Date:</label>
                        <input type="date" id="start-date" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="end-date" className="text-sm font-medium text-gray-700">End Date:</label>
                        <input type="date" id="end-date" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
                    </div>
                    {/* The button is now just for show as filtering is reactive */}
                    <button onClick={handleFilter} className="w-full sm:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2 sm:mt-5">Apply Filter</button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Overall Percentage</h2>
                    <p className={`text-5xl font-bold ${getPercentageColor(summary.percentage)}`}>{summary.percentage}%</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Classes Attended</h2>
                    <p className="text-5xl font-bold text-green-600">{summary.attended}</p>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <h2 className="text-lg font-semibold text-gray-600 mb-2">Total Classes</h2>
                    <p className="text-5xl font-bold text-gray-700">{summary.total}</p>
                </div>
            </div>
            
            <div className="bg-white shadow-md rounded-2xl">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                        <TabButton tabId="subjects">Subject Breakdown</TabButton>
                        <TabButton tabId="chart">Attendance Chart</TabButton>
                        <TabButton tabId="log">Daily Log</TabButton>
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'subjects' && (
                        <div className="overflow-x-auto">
                           <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attended / Total</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {subjectBreakdown.length > 0 ? subjectBreakdown.map(s => (
                                        <tr key={s.code}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.code}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.present} / {s.total}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{s.percentage}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadge(s.percentage)}</td>
                                        </tr>
                                    )) : <tr><td colSpan="5" className="text-center py-4 text-gray-500">No attendance data for the selected period.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'chart' && <AttendanceChart breakdown={subjectBreakdown} />}
                    {activeTab === 'log' && (
                        <div className="overflow-x-auto max-h-96">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {dailyLog.length > 0 ? dailyLog.map((log, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.subjectName}</td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${log.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>{log.status}</td>
                                        </tr>
                                    )) : <tr><td colSpan="3" className="text-center py-4 text-gray-500">No attendance data for the selected period.</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AttendanceChart = ({ breakdown }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Ensure window.Chart is available before using it
        if (chartContainer.current && breakdown && typeof window.Chart !== 'undefined') {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartContainer.current.getContext("2d");
            chartInstance.current = new window.Chart(ctx, {
                type: 'bar',
                data: {
                    labels: breakdown.map(s => s.name),
                    datasets: [{
                        label: 'Attendance Percentage',
                        data: breakdown.map(s => s.percentage),
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: value => value + '%'
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: context => `Attendance: ${context.raw.toFixed(1)}%`
                            }
                        }
                    }
                }
            });
        }
        // Cleanup function to destroy chart instance on component unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [breakdown]);

    return (
        <div className="w-full h-96">
            <canvas ref={chartContainer} />
        </div>
    );
};

// --- Main App Component ---

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        // Dynamically load the Chart.js script to make it available globally
        const scriptId = 'chartjs-script';
        if (document.getElementById(scriptId)) {
            return; 
        }
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://cdn.jsdelivr.net/npm/chart.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    const handleLogin = (user) => {
        setCurrentUser(user);
        setShowLogin(false);
    };

    const handleLogout = () => {
        setCurrentUser(null);
    };

    const studentRecords = useMemo(() => {
        if (!currentUser) return [];
        return attendanceData.filter(record => record.studentId === currentUser.id);
    }, [currentUser]);

    return (
        <>
            {/* These styles would typically be in an index.css file */}
            <style>{`
                body { font-family: 'Inter', sans-serif; background-color: #f3f4f6; }
                .transition-all { transition: all 0.3s ease-in-out; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #f1f1f1; }
                ::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #555; }
            `}</style>
            <div className="min-h-screen flex flex-col items-center justify-center p-4 antialiased text-gray-800">
                {!currentUser ? (
                    <LoginSelector onStudentLoginClick={() => setShowLogin(true)} />
                ) : (
                    <Dashboard student={currentUser} onLogout={handleLogout} studentRecords={studentRecords} />
                )}
                {showLogin && <StudentLoginModal onLogin={handleLogin} onClose={() => setShowLogin(false)} />}
            </div>
        </>
    );
}


