import { Users, TrendingDown, AlertCircle, Briefcase, Brain, LogOut } from 'lucide-react';
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

export function HRDashboard({ userEmail, onLogout }: HRDashboardProps) {
  // Calcul des KPIs
  const totalEmployees = employees.length;
  const avgAbsences = Math.round(employees.reduce((sum, emp) => sum + emp.absences, 0) / employees.length);
  const highTurnoverRisk = employees.filter(emp => emp.turnoverRisk === 'high').length;
  const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length);
  const overloadedEmployees = employees.filter(emp => emp.workload > 85).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Système Intelligent de Gestion RH</h1>
                <p className="text-sm text-gray-500">Business Intelligence & Intelligence Artificielle</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-900 font-medium">Gestionnaire RH</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
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
      </main>
    </div>
  );
}
