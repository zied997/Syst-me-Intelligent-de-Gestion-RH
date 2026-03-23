import { useState } from 'react';
import { 
  Users, 
  TrendingDown, 
  AlertCircle, 
  Briefcase, 
  Brain, 
  LogOut,
  LayoutDashboard,
  UserCircle,
  LineChart,
  FileText,
  Upload,
  Settings,
  Menu,
  X
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Calcul des KPIs
  const totalEmployees = employees.length;
  const avgAbsences = Math.round(employees.reduce((sum, emp) => sum + emp.absences, 0) / employees.length);
  const highTurnoverRisk = employees.filter(emp => emp.turnoverRisk === 'high').length;
  const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length);
  const overloadedEmployees = employees.filter(emp => emp.workload > 85).length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'data-import', label: 'Data Import', icon: Upload },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Sample reports data
  const reports = [
    { name: 'Monthly Turnover Report', date: 'Oct. 2023', format: 'PDF' },
    { name: 'Department Performance Analysis', date: 'Sep. 2023', format: 'Excel' },
    { name: 'Absenteeism Trends - AI', date: 'Q1 2023', format: 'PDF' },
    { name: 'Employee Satisfaction Survey', date: 'Aug. 2023', format: 'CSV' },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <KPICard 
                title="Employés Total" 
                value={totalEmployees} 
                icon={Users}
                iconColor="text-blue-600"
              />
              <KPICard 
                title="Absences Moy./An" 
                value={avgAbsences} 
                change={8}
                trend="up"
                icon={AlertCircle}
                iconColor="text-orange-600"
              />
              <KPICard 
                title="Risque Turnover" 
                value={highTurnoverRisk} 
                change={12}
                trend="up"
                icon={TrendingDown}
                iconColor="text-red-600"
              />
              <KPICard 
                title="Performance Moy." 
                value={`${avgPerformance}%`} 
                change={3}
                trend="down"
                icon={Briefcase}
                iconColor="text-green-600"
              />
              <KPICard 
                title="Surcharge Travail" 
                value={overloadedEmployees} 
                change={5}
                trend="up"
                icon={AlertCircle}
                iconColor="text-purple-600"
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
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Analyse IA en temps réel</h3>
                  <p className="text-sm text-blue-700">
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
              <h2 className="text-2xl font-semibold text-gray-900">Reports Center</h2>
              <p className="text-gray-500 mt-1">Connected and manage your HR analytics reports.</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Generated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Format
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {report.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                          {report.format}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'employees':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Employees Management</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-500">Employee management features coming soon...</p>
            </div>
          </div>
        );
      
      case 'ai-insights':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Insights</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-500">AI-powered analytics and predictions coming soon...</p>
            </div>
          </div>
        );
      
      case 'data-import':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Import</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-500">Data import tools coming soon...</p>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-500">Application settings coming soon...</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white border-r shadow-lg lg:shadow-sm
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">HR Intel AI</h1>
                <p className="text-xs text-gray-500">Intelligent System</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id as ActivePage);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User info & logout */}
          <div className="p-4 border-t">
            <div className="mb-3">
              <p className="text-sm text-gray-900 font-medium">Gestionnaire RH</p>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="px-6 py-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {menuItems.find(item => item.id === activePage)?.label || 'Dashboard'}
                </h1>
                {activePage === 'reports' && (
                  <p className="text-sm text-gray-500 mt-1">
                    Connected and manage your HR analytics reports
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-gray-900 font-medium">Gestionnaire RH</p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}