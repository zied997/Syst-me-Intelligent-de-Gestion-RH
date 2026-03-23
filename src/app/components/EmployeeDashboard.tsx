import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  UserCircle, 
  LogOut, 
  Clock, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  XCircle,
  Timer,
  TrendingUp
} from 'lucide-react';
import { EmployeeUser, generateAttendanceHistory, checkInEmployee, checkOutEmployee, getTodayAttendance, AttendanceRecord } from '../data/attendanceData';

interface EmployeeDashboardProps {
  employee: EmployeeUser;
  onLogout: () => void;
}

export function EmployeeDashboard({ employee, onLogout }: EmployeeDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(getTodayAttendance(employee.id));
  const [attendanceHistory] = useState(generateAttendanceHistory(employee.id));
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const record = checkInEmployee(employee.id);
    setTodayRecord(record);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCheckOut = () => {
    const record = checkOutEmployee(employee.id);
    if (record) {
      setTodayRecord(record);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Statistiques
  const totalAbsences = attendanceHistory.filter(r => r.status === 'absent').length;
  const totalRetards = attendanceHistory.filter(r => r.status === 'retard').length;
  const totalPresent = attendanceHistory.filter(r => r.status === 'present').length;
  const tauxPresence = ((totalPresent / attendanceHistory.length) * 100).toFixed(1);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">Présent</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">Absent</Badge>;
      case 'retard':
        return <Badge className="bg-orange-100 text-orange-800">Retard</Badge>;
      case 'conge':
        return <Badge className="bg-blue-100 text-blue-800">Congé</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCircle className="w-8 h-8 text-green-600" />
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Portail Employé</h1>
                <p className="text-sm text-gray-500">Gestion de présence et statistiques personnelles</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-900 font-medium">{employee.name}</p>
                <p className="text-xs text-gray-500">{employee.department} - {employee.position}</p>
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
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fade-in">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800">Enregistrement effectué avec succès !</p>
          </div>
        )}

        {/* Clock & Check In/Out Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Time Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center">
                <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p className="text-sm text-gray-500 mb-2">Heure actuelle</p>
                <p className="text-4xl font-semibold text-gray-900">
                  {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Check In/Out Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Enregistrement de présence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Arrivée</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {todayRecord?.checkInTime || '--:--'}
                      </p>
                    </div>
                    <Timer className="w-8 h-8 text-green-600" />
                  </div>
                  <Button 
                    onClick={handleCheckIn} 
                    disabled={!!todayRecord?.checkInTime}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {todayRecord?.checkInTime ? 'Déjà pointé' : 'Pointer l\'arrivée'}
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Départ</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {todayRecord?.checkOutTime || '--:--'}
                      </p>
                    </div>
                    <Timer className="w-8 h-8 text-orange-600" />
                  </div>
                  <Button 
                    onClick={handleCheckOut}
                    disabled={!todayRecord?.checkInTime || !!todayRecord?.checkOutTime}
                    variant="outline"
                    className="w-full"
                  >
                    {todayRecord?.checkOutTime ? 'Déjà pointé' : 'Pointer le départ'}
                  </Button>
                </div>
              </div>

              {todayRecord && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-900">Statut aujourd'hui :</span>
                    </div>
                    {getStatusBadge(todayRecord.status)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Taux de présence</p>
                  <p className="text-3xl font-semibold text-green-600">{tauxPresence}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Jours présent</p>
                  <p className="text-3xl font-semibold text-blue-600">{totalPresent}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Absences</p>
                  <p className="text-3xl font-semibold text-red-600">{totalAbsences}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Retards</p>
                  <p className="text-3xl font-semibold text-orange-600">{totalRetards}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>Historique de présence (30 derniers jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Statut</th>
                    <th className="text-left py-3 px-4">Arrivée</th>
                    <th className="text-left py-3 px-4">Départ</th>
                    <th className="text-left py-3 px-4">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceHistory.slice().reverse().slice(0, 20).map((record) => {
                    const duration = record.checkInTime && record.checkOutTime
                      ? (() => {
                          const [inH, inM] = record.checkInTime.split(':').map(Number);
                          const [outH, outM] = record.checkOutTime.split(':').map(Number);
                          const totalMinutes = (outH * 60 + outM) - (inH * 60 + inM);
                          const hours = Math.floor(totalMinutes / 60);
                          const minutes = totalMinutes % 60;
                          return `${hours}h${minutes.toString().padStart(2, '0')}`;
                        })()
                      : '-';

                    return (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{formatDate(record.date)}</td>
                        <td className="py-3 px-4">{getStatusBadge(record.status)}</td>
                        <td className="py-3 px-4">{record.checkInTime || '-'}</td>
                        <td className="py-3 px-4">{record.checkOutTime || '-'}</td>
                        <td className="py-3 px-4">{duration}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
