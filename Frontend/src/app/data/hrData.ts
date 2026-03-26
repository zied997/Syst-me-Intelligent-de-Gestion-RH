// Données simulées pour le système de gestion RH

export interface Employee {
  id: string;
  name: string;
  age: number;
  seniority: number; // en années
  department: string;
  absences: number; // jours d'absence
  trainings: number; // formations suivies
  performance: number; // score de 0 à 100
  workload: number; // score de 0 à 100
  turnoverRisk: 'low' | 'medium' | 'high';
  absenteeismRisk: 'low' | 'medium' | 'high';
}

export const employees: Employee[] = [
  { id: '1', name: 'Sophie Martin', age: 32, seniority: 5, department: 'IT', absences: 8, trainings: 4, performance: 85, workload: 75, turnoverRisk: 'low', absenteeismRisk: 'medium' },
  { id: '2', name: 'Pierre Dubois', age: 45, seniority: 12, department: 'RH', absences: 3, trainings: 6, performance: 92, workload: 65, turnoverRisk: 'low', absenteeismRisk: 'low' },
  { id: '3', name: 'Marie Lefebvre', age: 28, seniority: 2, department: 'Marketing', absences: 15, trainings: 2, performance: 68, workload: 90, turnoverRisk: 'high', absenteeismRisk: 'high' },
  { id: '4', name: 'Jean Moreau', age: 38, seniority: 8, department: 'Finance', absences: 5, trainings: 5, performance: 88, workload: 70, turnoverRisk: 'low', absenteeismRisk: 'low' },
  { id: '5', name: 'Claire Bernard', age: 29, seniority: 3, department: 'IT', absences: 12, trainings: 3, performance: 75, workload: 85, turnoverRisk: 'medium', absenteeismRisk: 'high' },
  { id: '6', name: 'Lucas Petit', age: 35, seniority: 6, department: 'Ventes', absences: 7, trainings: 4, performance: 82, workload: 80, turnoverRisk: 'medium', absenteeismRisk: 'medium' },
  { id: '7', name: 'Amélie Roux', age: 42, seniority: 10, department: 'RH', absences: 4, trainings: 7, performance: 90, workload: 60, turnoverRisk: 'low', absenteeismRisk: 'low' },
  { id: '8', name: 'Thomas Garcia', age: 26, seniority: 1, department: 'Marketing', absences: 18, trainings: 1, performance: 62, workload: 95, turnoverRisk: 'high', absenteeismRisk: 'high' },
  { id: '9', name: 'Emma Bonnet', age: 33, seniority: 7, department: 'Finance', absences: 6, trainings: 5, performance: 86, workload: 68, turnoverRisk: 'low', absenteeismRisk: 'low' },
  { id: '10', name: 'Hugo Simon', age: 31, seniority: 4, department: 'IT', absences: 10, trainings: 3, performance: 78, workload: 82, turnoverRisk: 'medium', absenteeismRisk: 'medium' },
  { id: '11', name: 'Léa Laurent', age: 27, seniority: 2, department: 'Ventes', absences: 14, trainings: 2, performance: 70, workload: 88, turnoverRisk: 'high', absenteeismRisk: 'high' },
  { id: '12', name: 'Antoine Michel', age: 40, seniority: 9, department: 'Finance', absences: 5, trainings: 6, performance: 89, workload: 72, turnoverRisk: 'low', absenteeismRisk: 'low' },
  { id: '13', name: 'Camille Fournier', age: 34, seniority: 6, department: 'Marketing', absences: 9, trainings: 4, performance: 80, workload: 77, turnoverRisk: 'medium', absenteeismRisk: 'medium' },
  { id: '14', name: 'Maxime Girard', age: 29, seniority: 3, department: 'IT', absences: 11, trainings: 3, performance: 76, workload: 84, turnoverRisk: 'medium', absenteeismRisk: 'high' },
  { id: '15', name: 'Chloé Mercier', age: 36, seniority: 8, department: 'RH', absences: 4, trainings: 6, performance: 91, workload: 63, turnoverRisk: 'low', absenteeismRisk: 'low' },
];

export const departmentStats = [
  { department: 'IT', employees: 4, avgPerformance: 79, avgWorkload: 81, turnoverRate: 15 },
  { department: 'RH', employees: 3, avgPerformance: 91, avgWorkload: 63, turnoverRate: 5 },
  { department: 'Marketing', employees: 3, avgPerformance: 73, avgWorkload: 87, turnoverRate: 25 },
  { department: 'Finance', employees: 3, avgPerformance: 88, avgWorkload: 70, turnoverRate: 8 },
  { department: 'Ventes', employees: 2, avgPerformance: 76, avgWorkload: 84, turnoverRate: 20 },
];

export const absenteeismTrend = [
  { month: 'Jan', absences: 45, prediction: 48 },
  { month: 'Fév', absences: 52, prediction: 50 },
  { month: 'Mar', absences: 48, prediction: 52 },
  { month: 'Avr', absences: 55, prediction: 54 },
  { month: 'Mai', absences: 60, prediction: 58 },
  { month: 'Jun', absences: 58, prediction: 60 },
];

export const turnoverPrediction = [
  { quarter: 'Q1 2025', actual: 8, predicted: 10 },
  { quarter: 'Q2 2025', actual: 12, predicted: 11 },
  { quarter: 'Q3 2025', actual: 10, predicted: 9 },
  { quarter: 'Q4 2025', actual: 15, predicted: 14 },
  { quarter: 'Q1 2026', actual: null, predicted: 16 },
  { quarter: 'Q2 2026', actual: null, predicted: 18 },
];

export const workloadDistribution = [
  { range: '0-20%', count: 0 },
  { range: '20-40%', count: 0 },
  { range: '40-60%', count: 2 },
  { range: '60-80%', count: 7 },
  { range: '80-100%', count: 6 },
];

export const trainingImpact = [
  { trainings: '0-2', performance: 67, count: 4 },
  { trainings: '3-4', performance: 78, count: 5 },
  { trainings: '5-6', performance: 89, count: 4 },
  { trainings: '7+', performance: 91, count: 2 },
];
