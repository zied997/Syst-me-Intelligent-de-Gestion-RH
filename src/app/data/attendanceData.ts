// Données de présence pour les employés

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  status: 'present' | 'absent' | 'retard' | 'conge';
  checkInTime?: string;
  checkOutTime?: string;
}

export interface EmployeeUser {
  id: string;
  email: string;
  password: string;
  name: string;
  department: string;
  position: string;
}

// Utilisateurs employés pour la démo
export const employeeUsers: EmployeeUser[] = [
  { id: '1', email: 'sophie.martin@company.com', password: 'emp123', name: 'Sophie Martin', department: 'IT', position: 'Développeuse' },
  { id: '2', email: 'pierre.dubois@company.com', password: 'emp123', name: 'Pierre Dubois', department: 'RH', position: 'Responsable RH' },
  { id: '3', email: 'marie.lefebvre@company.com', password: 'emp123', name: 'Marie Lefebvre', department: 'Marketing', position: 'Chef de projet' },
];

// Historique de présence (30 derniers jours)
export const generateAttendanceHistory = (employeeId: string): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayOfWeek = date.getDay();
    
    // Pas de weekend
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    
    // Simulation aléatoire
    const random = Math.random();
    let status: 'present' | 'absent' | 'retard' | 'conge';
    let checkIn: string | undefined;
    let checkOut: string | undefined;
    
    if (random < 0.85) {
      status = 'present';
      checkIn = `0${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
      checkOut = `1${7 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    } else if (random < 0.90) {
      status = 'retard';
      checkIn = `0${9 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
      checkOut = `1${7 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    } else if (random < 0.95) {
      status = 'absent';
    } else {
      status = 'conge';
    }
    
    records.push({
      id: `${employeeId}-${dateStr}`,
      employeeId,
      date: dateStr,
      status,
      checkInTime: checkIn,
      checkOutTime: checkOut,
    });
  }
  
  return records;
};

// Stockage local des présences d'aujourd'hui
const todayAttendance: { [key: string]: AttendanceRecord } = {};

export const checkInEmployee = (employeeId: string): AttendanceRecord => {
  const today = new Date().toISOString().split('T')[0];
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  const record: AttendanceRecord = {
    id: `${employeeId}-${today}`,
    employeeId,
    date: today,
    status: now.getHours() > 9 ? 'retard' : 'present',
    checkInTime: timeStr,
  };
  
  todayAttendance[employeeId] = record;
  return record;
};

export const checkOutEmployee = (employeeId: string): AttendanceRecord | null => {
  const record = todayAttendance[employeeId];
  if (!record) return null;
  
  const now = new Date();
  const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  record.checkOutTime = timeStr;
  return record;
};

export const getTodayAttendance = (employeeId: string): AttendanceRecord | null => {
  return todayAttendance[employeeId] || null;
};
