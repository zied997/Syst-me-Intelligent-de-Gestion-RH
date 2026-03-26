import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { employees } from '../data/hrData';

export function TrainingImpact() {
  const data = employees.map(emp => ({
    name: emp.name,
    trainings: emp.trainings,
    performance: emp.performance,
  }));

  const getColor = (performance: number) => {
    if (performance >= 85) return '#10b981';
    if (performance >= 75) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Impact des formations sur la performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="trainings" name="Formations" unit=" formations" />
            <YAxis dataKey="performance" name="Performance" unit="%" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Employés" data={data}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.performance)} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-gray-600 text-center">
          Corrélation positive entre formations et performance
        </div>
      </CardContent>
    </Card>
  );
}
