import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { employees } from '../data/hrData';
import { AlertTriangle, TrendingDown, Users } from 'lucide-react';

export function RiskTable() {
  // Employés à risque élevé
  const highRiskEmployees = employees.filter(
    emp => emp.turnoverRisk === 'high' || emp.absenteeismRisk === 'high'
  ).slice(0, 5);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return '';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'high': return 'Élevé';
      case 'medium': return 'Moyen';
      case 'low': return 'Faible';
      default: return risk;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <CardTitle>Employés à risque (Alerte IA)</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2">Nom</th>
                <th className="text-left py-3 px-2">Département</th>
                <th className="text-left py-3 px-2">Risque Turnover</th>
                <th className="text-left py-3 px-2">Risque Absence</th>
                <th className="text-left py-3 px-2">Charge</th>
              </tr>
            </thead>
            <tbody>
              {highRiskEmployees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">{emp.name}</td>
                  <td className="py-3 px-2">{emp.department}</td>
                  <td className="py-3 px-2">
                    <Badge className={getRiskColor(emp.turnoverRisk)}>
                      {getRiskLabel(emp.turnoverRisk)}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <Badge className={getRiskColor(emp.absenteeismRisk)}>
                      {getRiskLabel(emp.absenteeismRisk)}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${emp.workload > 85 ? 'bg-red-500' : emp.workload > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${emp.workload}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{emp.workload}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
