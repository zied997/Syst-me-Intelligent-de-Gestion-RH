import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { turnoverPrediction } from '../data/hrData';

export function TurnoverChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prédiction de turnover (IA)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={turnoverPrediction}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="actual" fill="#3b82f6" name="Départs réels" />
            <Bar dataKey="predicted" fill="#f59e0b" name="Prédiction IA" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
