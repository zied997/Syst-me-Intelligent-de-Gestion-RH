import { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingDown, 
  AlertCircle, 
  Briefcase, 
  Brain, 
  LogOut,
  LayoutDashboard,
  UserCircle,
  FileText,
  Upload,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';
import { KPICard } from './KPICard';
import { AbsenteeismChart } from './AbsenteeismChart';
import { TurnoverChart } from './TurnoverChart';
import { WorkloadChart } from './WorkloadChart';
import { DepartmentPerformance } from './DepartmentPerformance';
import { RiskTable } from './RiskTable';
import { TrainingImpact } from './TrainingImpact';
import { employees } from '../data/hrData';
import { Button } from './ui/button';

interface HRDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

type ActivePage = 'dashboard' | 'employees' | 'ai-insights' | 'reports' | 'data-import' | 'settings';

export function HRDashboard({ userEmail, onLogout }: HRDashboardProps) {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Calcul des KPIs
  const totalEmployees = employees.length;
  const avgAbsences = Math.round(employees.reduce((sum, emp) => sum + emp.absences, 0) / employees.length);
  const highTurnoverRisk = employees.filter(emp => emp.turnoverRisk === 'high').length;
  const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length);
  const overloadedEmployees = employees.filter(emp => emp.workload > 85).length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-blue-400' },
    { id: 'employees', label: 'Employees', icon: Users, color: 'text-emerald-400' },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain, color: 'text-purple-400' },
    { id: 'reports', label: 'Reports', icon: FileText, color: 'text-amber-400' },
    { id: 'data-import', label: 'Data Import', icon: Upload, color: 'text-cyan-400' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-400' },
  ];

  // Sample reports data
  const reports = [
    { name: 'Monthly Turnover Report', date: 'Oct. 2023', format: 'PDF', size: '2.4 MB' },
    { name: 'Department Performance Analysis', date: 'Sep. 2023', format: 'Excel', size: '1.8 MB' },
    { name: 'Absenteeism Trends - AI', date: 'Q1 2023', format: 'PDF', size: '3.1 MB' },
    { name: 'Employee Satisfaction Survey', date: 'Aug. 2023', format: 'CSV', size: '0.9 MB' },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gestionnaire RH</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Here's what's happening with your workforce today.
              </p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <KPICard 
                title="Employés Total" 
                value={totalEmployees} 
                icon={Users}
                iconColor="text-blue-500 dark:text-blue-400"
              />
              <KPICard 
                title="Absences Moy./An" 
                value={avgAbsences} 
                change={8}
                trend="up"
                icon={AlertCircle}
                iconColor="text-orange-500 dark:text-orange-400"
              />
              <KPICard 
                title="Risque Turnover" 
                value={highTurnoverRisk} 
                change={12}
                trend="up"
                icon={TrendingDown}
                iconColor="text-red-500 dark:text-red-400"
              />
              <KPICard 
                title="Performance Moy." 
                value={`${avgPerformance}%`} 
                change={3}
                trend="down"
                icon={Briefcase}
                iconColor="text-green-500 dark:text-green-400"
              />
              <KPICard 
                title="Surcharge Travail" 
                value={overloadedEmployees} 
                change={5}
                trend="up"
                icon={AlertCircle}
                iconColor="text-purple-500 dark:text-purple-400"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <AbsenteeismChart />
              <TurnoverChart />
              <WorkloadChart />
              <DepartmentPerformance />
            </div>

            {/* Training Impact */}
            <div className="mb-8">
              <TrainingImpact />
            </div>

            {/* Risk Table */}
            <RiskTable />

            {/* Footer Info */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">Analyse IA en temps réel</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Les prédictions sont générées par des algorithmes d'apprentissage automatique analysant l'âge, 
                    l'ancienneté, les absences, les formations et la performance. Les données sont anonymisées et 
                    conformes au RGPD.
                  </p>
                </div>
              </div>
            </div>
          </>
        );
      
      case 'reports':
        return (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Reports Center</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Connected and manage your HR analytics reports.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Report Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Date Generated
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Format
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {reports.map((report, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {report.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {report.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                            {report.format}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {report.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-6">
                {menuItems.find(item => item.id === activePage)?.icon && 
                  (() => {
                    const Icon = menuItems.find(item => item.id === activePage)!.icon;
                    return <Icon className="w-16 h-16 text-gray-400 dark:text-gray-500" />;
                  })()
                }
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
                {activePage.replace('-', ' ')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Coming Soon
              </p>
              <p className="text-gray-400 dark:text-gray-500 mt-2">
                This feature is currently under development.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800
          shadow-2xl z-40 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          w-72
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">HR Intel AI</h1>
                  <p className="text-xs text-gray-400">Intelligent System v2.0</p>
                </div>
              </div>
              {isMobile && (
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id as ActivePage);
                    if (isMobile) setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200 group relative
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-l-4 border-blue-500' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'group-hover:text-blue-400'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Gestionnaire RH</p>
                  <p className="text-xs text-gray-400 truncate">{userEmail}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="w-full bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/50 transition-all duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`
        transition-all duration-300 min-h-screen
        ${isSidebarOpen ? 'lg:pl-72' : 'pl-0'}
      `}>
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                {/* Toggle Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
                >
                  {isSidebarOpen ? <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                </button>
                
                {/* Page Title */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                    {menuItems.find(item => item.id === activePage)?.label || 'Dashboard'}
                  </h1>
                  {activePage === 'reports' && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block truncate">
                      Connected and manage your HR analytics reports
                    </p>
                  )}
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                {/* Search Bar */}
                <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-sm px-2 w-32 lg:w-48 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />}
                </button>

                {/* Notifications */}
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Avatar - Mobile */}
                <div className="lg:hidden">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}