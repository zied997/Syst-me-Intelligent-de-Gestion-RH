import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { departmentStats } from '../data/hrData';

export function DepartmentPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance par département</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departmentStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgPerformance" fill="#3b82f6" name="Performance moyenne" />
            <Bar dataKey="avgWorkload" fill="#f59e0b" name="Charge moyenne" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
