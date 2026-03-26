import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { absenteeismTrend } from '../data/hrData';

export function AbsenteeismChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tendance d'absentéisme (avec prédiction IA)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={absenteeismTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="absences" stroke="#3b82f6" strokeWidth={2} name="Absences réelles" />
            <Line type="monotone" dataKey="prediction" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Prédiction IA" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
